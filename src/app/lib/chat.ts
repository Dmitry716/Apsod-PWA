import { hasRedis, redisChat } from './redis';
import * as fs from 'fs';
import * as path from 'path';
import crypto from 'crypto';

const CHAT_CONVERSATIONS = 'chat:conversations';
const CHAT_CONV_PREFIX = 'chat:conv:';
const CHAT_MSG_SUFFIX = ':messages';

function getChatFilePath(): string {
  if (process.env.CHAT_DATA_PATH) return process.env.CHAT_DATA_PATH;
  // На Vercel/serverless cwd только для чтения — пишем в /tmp
  if (process.env.VERCEL === '1' || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join('/tmp', 'chat-data.json');
  }
  return path.join(process.cwd(), 'chat-data.json');
}

function canUseFileChatStorage(): boolean {
  if (process.env.NODE_ENV !== 'production') return true;
  if (process.env.CHAT_ALLOW_FILE_STORAGE === 'true') return true;
  if (process.env.VERCEL === '1') return true;
  // Self-hosted production (не serverless) — можно писать в chat-data.json
  if (!process.env.AWS_LAMBDA_FUNCTION_NAME) return true;
  return false;
}
const ADMIN_LAST_SEEN_KEY = 'chat:admin:lastSeen';
const ADMIN_PROFILE_KEY = 'chat:admin:profile';
const TYPING_TTL_MS = 8000;

function convReadAtKey(conversationId: string, role: 'admin' | 'visitor'): string {
  return `chat:conv:${conversationId}:${role}ReadAt`;
}
function typingKey(conversationId: string): string {
  return `chat:typing:${conversationId}`;
}
function hiddenKey(conversationId: string, role: 'admin' | 'visitor'): string {
  return `chat:conv:${conversationId}:hidden:${role}`;
}

const DEFAULT_PROFILE = { name: 'Поддержка APSOD', photoUrl: '' };

type FileChatData = {
  conversations: string[];
  messages: Record<string, string[]>;
  adminLastSeen?: number;
  adminProfile?: { name: string; photoUrl: string };
  conversationReadAt?: Record<string, { adminReadAt?: number; visitorReadAt?: number }>;
  typing?: Record<string, { who: 'visitor' | 'admin'; at: number }>;
  /** Сообщения, скрытые «удалить у себя»: по convId и роли */
  conversationHidden?: Record<string, { visitor?: string[]; admin?: string[] }>;
};

// --- Шифрование сообщений чата ---

const CHAT_ENC_PREFIX = 'enc:1:';

function getChatEncryptionKey(): Buffer | null {
  const raw =
    process.env.CHAT_ENCRYPTION_KEY ||
    process.env.DASHBOARD_SESSION_SECRET ||
    process.env.NOTIFICATION_SECRET ||
    process.env.DASHBOARD_PASSWORD;
  if (!raw) return null;
  // Нормализуем в 32 байта для AES-256
  const buf = crypto.createHash('sha256').update(String(raw)).digest();
  return buf;
}

function encryptChatPayload(plain: string): string {
  const key = getChatEncryptionKey();
  if (!key) return plain;
  try {
    const iv = crypto.randomBytes(12); // для AES-GCM
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const enc = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return (
      CHAT_ENC_PREFIX +
      iv.toString('base64') +
      ':' +
      enc.toString('base64') +
      ':' +
      tag.toString('base64')
    );
  } catch {
    return plain;
  }
}

function decryptChatPayload(stored: string): string {
  if (!stored.startsWith(CHAT_ENC_PREFIX)) return stored;
  const key = getChatEncryptionKey();
  if (!key) return stored;
  try {
    const payload = stored.slice(CHAT_ENC_PREFIX.length);
    const [ivB64, encB64, tagB64] = payload.split(':');
    if (!ivB64 || !encB64 || !tagB64) return stored;
    const iv = Buffer.from(ivB64, 'base64');
    const enc = Buffer.from(encB64, 'base64');
    const tag = Buffer.from(tagB64, 'base64');
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    const dec = Buffer.concat([decipher.update(enc), decipher.final()]);
    return dec.toString('utf8');
  } catch {
    return stored;
  }
}

function readFileChat(): FileChatData {
  if (!canUseFileChatStorage()) {
    return { conversations: [], messages: {} };
  }
  const chatFile = getChatFilePath();
  try {
    if (fs.existsSync(chatFile)) {
      const raw = fs.readFileSync(chatFile, 'utf-8');
      return JSON.parse(raw) as FileChatData;
    }
  } catch {
    // ignore
  }
  return { conversations: [], messages: {} };
}

function writeFileChat(data: FileChatData): boolean {
  if (!canUseFileChatStorage()) return false;
  const chatFile = getChatFilePath();
  try {
    const dir = path.dirname(chatFile);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(chatFile, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error('Chat file write failed:', e);
    return false;
  }
}

/** Можно ли принимать сообщения (Redis или файловый fallback). */
export function isChatStorageAvailable(): boolean {
  if (hasRedis()) return true;
  return canUseFileChatStorage();
}

async function persistMessageToRedis(conversationId: string, msg: ChatMessage): Promise<boolean> {
  if (!hasRedis()) return false;
  try {
    const key = messagesKey(conversationId);
    const payload = encryptChatPayload(JSON.stringify(msg));
    const pushed = await redisChat.rpush(key, payload);
    if (!pushed) return false;
    await redisChat.lrem(CHAT_CONVERSATIONS, 0, conversationId);
    await redisChat.lpush(CHAT_CONVERSATIONS, conversationId);
    return true;
  } catch (e) {
    console.error('Redis chat persist failed:', e);
    return false;
  }
}

export type ChatAuthor = 'visitor' | 'admin';

export interface ChatAttachment {
  name: string;
  mimeType: string;
  data: string;
}

/** Статус своего сообщения: как в WhatsApp — одна галочка отправлено, две доставлено, две синие прочитано */
export type ChatMessageStatus = 'sent' | 'delivered' | 'read';

export interface ChatMessage {
  id: string;
  author: ChatAuthor;
  text: string;
  createdAt: string;
  visitorName?: string;
  attachments?: ChatAttachment[];
  /** Статус для сообщений отправителя (отправлено / доставлено / прочитано) */
  status?: ChatMessageStatus;
}

export interface ChatConversationMeta {
  id: string;
  lastMessageAt: number;
  lastMessagePreview?: string;
  lastVisitorName?: string;
}

function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

function messagesKey(conversationId: string): string {
  return `${CHAT_CONV_PREFIX}${conversationId}${CHAT_MSG_SUFFIX}`;
}

export async function deleteChatConversation(conversationId: string): Promise<void> {
  if (hasRedis()) {
    await redisChat.lrem(CHAT_CONVERSATIONS, 0, conversationId);
    return;
  }
  const data = readFileChat();
  delete data.messages[conversationId];
  data.conversations = data.conversations.filter((id) => id !== conversationId);
  writeFileChat(data);
}

/** Список ID сообщений, скрытых «удалить у себя» для данной роли в диалоге. */
export async function getConversationHidden(conversationId: string, role: 'admin' | 'visitor'): Promise<string[]> {
  if (hasRedis()) {
    const raw = await redisChat.get(hiddenKey(conversationId, role));
    if (!raw) return [];
    try {
      const arr = JSON.parse(raw) as unknown;
      return Array.isArray(arr) ? arr.filter((id): id is string => typeof id === 'string') : [];
    } catch {
      return [];
    }
  }
  const data = readFileChat();
  const r = data.conversationHidden?.[conversationId];
  const list = role === 'admin' ? r?.admin : r?.visitor;
  return Array.isArray(list) ? list : [];
}

/** Скрыть сообщение «удалить у себя» для данной роли (не удаляет из хранилища). */
export async function addMessageHiddenFor(conversationId: string, messageId: string, role: 'admin' | 'visitor'): Promise<void> {
  const current = await getConversationHidden(conversationId, role);
  if (current.includes(messageId)) return;
  const next = [...current, messageId];
  if (hasRedis()) {
    await redisChat.set(hiddenKey(conversationId, role), JSON.stringify(next));
    return;
  }
  const data = readFileChat();
  if (!data.conversationHidden) data.conversationHidden = {};
  if (!data.conversationHidden[conversationId]) data.conversationHidden[conversationId] = {};
  if (role === 'admin') data.conversationHidden[conversationId].admin = next;
  else data.conversationHidden[conversationId].visitor = next;
  writeFileChat(data);
}

/** Удалить одно сообщение из диалога для всех (без следа). Только админ. */
export async function deleteChatMessage(conversationId: string, messageId: string): Promise<boolean> {
  if (hasRedis()) {
    const key = messagesKey(conversationId);
    const raw = await redisChat.lrange(key, 0, -1);
    for (const stored of raw) {
      try {
        const plain = decryptChatPayload(stored);
        const msg = JSON.parse(plain) as ChatMessage;
        if (msg.id === messageId) {
          await redisChat.lrem(key, 1, stored);
          return true;
        }
      } catch {
        // skip invalid
      }
    }
    return false;
  }
  const data = readFileChat();
  const list = data.messages[conversationId] ?? [];
  let found = false;
  const next = list.filter((stored) => {
    try {
      const plain = decryptChatPayload(stored);
      const msg = JSON.parse(plain) as ChatMessage;
      if (msg.id === messageId) {
        found = true;
        return false;
      }
    } catch {
      // keep
    }
    return true;
  });
  if (found) {
    data.messages[conversationId] = next;
    writeFileChat(data);
    return true;
  }
  return false;
}

export async function addChatMessage(
  conversationId: string,
  author: ChatAuthor,
  text: string,
  visitorName?: string,
  attachments?: ChatAttachment[]
): Promise<ChatMessage | null> {
  const msg: ChatMessage = {
    id: genId(),
    author,
    text: text.trim().slice(0, 2000),
    createdAt: new Date().toISOString(),
  };
  if (author === 'visitor' && visitorName) msg.visitorName = visitorName.trim().slice(0, 200);
  if (attachments && attachments.length > 0) msg.attachments = attachments.slice(0, 5);

  if (await persistMessageToRedis(conversationId, msg)) {
    return msg;
  }

  const data = readFileChat();
  const list = data.messages[conversationId] ?? [];
  list.push(encryptChatPayload(JSON.stringify(msg)));
  data.messages[conversationId] = list;
  data.conversations = data.conversations.filter((id) => id !== conversationId);
  data.conversations.unshift(conversationId);
  if (!writeFileChat(data)) {
    return null;
  }
  return msg;
}

export async function getConversationRead(conversationId: string): Promise<{ adminReadAt: number | null; visitorReadAt: number | null }> {
  if (hasRedis()) {
    const [a, v] = await Promise.all([
      redisChat.get(convReadAtKey(conversationId, 'admin')),
      redisChat.get(convReadAtKey(conversationId, 'visitor')),
    ]);
    return {
      adminReadAt: a ? parseInt(a, 10) : null,
      visitorReadAt: v ? parseInt(v, 10) : null,
    };
  }
  const data = readFileChat();
  const r = data.conversationReadAt?.[conversationId];
  return {
    adminReadAt: r?.adminReadAt ?? null,
    visitorReadAt: r?.visitorReadAt ?? null,
  };
}

export async function setConversationRead(conversationId: string, role: 'admin' | 'visitor'): Promise<void> {
  const now = Date.now();
  if (hasRedis()) {
    await redisChat.set(convReadAtKey(conversationId, role), String(now));
    return;
  }
  const data = readFileChat();
  if (!data.conversationReadAt) data.conversationReadAt = {};
  if (!data.conversationReadAt[conversationId]) data.conversationReadAt[conversationId] = {};
  if (role === 'admin') data.conversationReadAt[conversationId].adminReadAt = now;
  else data.conversationReadAt[conversationId].visitorReadAt = now;
  writeFileChat(data);
}

export async function setTyping(conversationId: string, who: 'visitor' | 'admin'): Promise<void> {
  const payload = JSON.stringify({ who, at: Date.now() });
  if (hasRedis()) {
    await redisChat.set(typingKey(conversationId), payload);
    return;
  }
  const data = readFileChat();
  if (!data.typing) data.typing = {};
  data.typing[conversationId] = { who, at: Date.now() };
  writeFileChat(data);
}

export async function getTyping(conversationId: string): Promise<'visitor' | 'admin' | null> {
  const now = Date.now();
  if (hasRedis()) {
    const raw = await redisChat.get(typingKey(conversationId));
    if (!raw) return null;
    try {
      const { who, at } = JSON.parse(raw) as { who: string; at: number };
      if (now - at > TYPING_TTL_MS) return null;
      return who === 'admin' ? 'admin' : who === 'visitor' ? 'visitor' : null;
    } catch {
      return null;
    }
  }
  const data = readFileChat();
  const t = data.typing?.[conversationId];
  if (!t || now - t.at > TYPING_TTL_MS) return null;
  return t.who;
}

export async function getChatMessages(
  conversationId: string,
  options?: { viewerRole?: 'admin' | 'visitor' }
): Promise<ChatMessage[]> {
  let list: ChatMessage[];
  if (hasRedis()) {
    const key = messagesKey(conversationId);
    const raw = await redisChat.lrange(key, 0, -1);
    list = raw
      .map((s) => {
        try {
          const plain = decryptChatPayload(s);
          return JSON.parse(plain) as ChatMessage;
        } catch {
          return null;
        }
      })
      .filter(Boolean) as ChatMessage[];
  } else {
    const data = readFileChat();
    const raw = data.messages[conversationId] ?? [];
    list = raw
      .map((s) => {
        try {
          const plain = decryptChatPayload(s);
          return JSON.parse(plain) as ChatMessage;
        } catch {
          return null;
        }
      })
      .filter(Boolean) as ChatMessage[];
  }

  const viewer = options?.viewerRole;
  if (viewer) {
    await setConversationRead(conversationId, viewer);
  }
  const hiddenIds = viewer ? await getConversationHidden(conversationId, viewer) : [];
  const filtered = hiddenIds.length > 0 ? list.filter((m) => !hiddenIds.includes(m.id)) : list;

  const read = await getConversationRead(conversationId);
  const adminReadAt = read.adminReadAt ?? 0;
  const visitorReadAt = read.visitorReadAt ?? 0;

  return filtered.map((m) => {
    const msg = { ...m };
    const t = new Date(m.createdAt).getTime();
    if (m.author === 'visitor') {
      if (adminReadAt >= t) msg.status = 'read';
      else msg.status = 'sent';
    } else {
      if (visitorReadAt >= t) msg.status = 'read';
      else msg.status = 'sent';
    }
    return msg;
  });
}

export async function getChatConversations(limit = 50): Promise<ChatConversationMeta[]> {
  if (hasRedis()) {
    const ids = await redisChat.lrange(CHAT_CONVERSATIONS, 0, limit - 1);
    const result: ChatConversationMeta[] = [];
    for (const id of ids) {
      const key = messagesKey(id);
      const raw = await redisChat.lrange(key, -1, -1);
      const lastMsg = raw[0]
        ? (() => {
            try {
              const plain = decryptChatPayload(raw[0]);
              return JSON.parse(plain) as ChatMessage;
            } catch {
              return null;
            }
          })()
        : null;
      result.push({
        id,
        lastMessageAt: lastMsg ? new Date(lastMsg.createdAt).getTime() : 0,
        lastMessagePreview: lastMsg ? lastMsg.text.slice(0, 60) + (lastMsg.text.length > 60 ? '…' : '') : undefined,
        lastVisitorName: lastMsg && lastMsg.author === 'visitor' ? lastMsg.visitorName : undefined,
      });
    }
    return result;
  }
  const data = readFileChat();
  const result: ChatConversationMeta[] = [];
  for (let i = 0; i < Math.min(data.conversations.length, limit); i++) {
    const id = data.conversations[i];
    const list = data.messages[id] ?? [];
    const lastRaw = list[list.length - 1];
    const lastMsg = lastRaw
      ? (() => {
          try {
            const plain = decryptChatPayload(lastRaw);
            return JSON.parse(plain) as ChatMessage;
          } catch {
            return null;
          }
        })()
      : null;
    result.push({
      id,
      lastMessageAt: lastMsg ? new Date(lastMsg.createdAt).getTime() : 0,
      lastMessagePreview: lastMsg ? lastMsg.text.slice(0, 60) + (lastMsg.text.length > 60 ? '…' : '') : undefined,
      lastVisitorName: lastMsg && lastMsg.author === 'visitor' ? lastMsg.visitorName : undefined,
    });
  }
  return result;
}

export function createConversationId(): string {
  return 'c-' + genId();
}

// --- Статус «в сети» и профиль поддержки ---

export async function getAdminLastSeen(): Promise<number | null> {
  if (hasRedis()) {
    const raw = await redisChat.get(ADMIN_LAST_SEEN_KEY);
    if (raw === null) return null;
    const n = parseInt(raw, 10);
    return Number.isFinite(n) ? n : null;
  }
  const data = readFileChat();
  return data.adminLastSeen ?? null;
}

export async function setAdminLastSeen(): Promise<void> {
  const now = Date.now();
  if (hasRedis()) {
    await redisChat.set(ADMIN_LAST_SEEN_KEY, String(now));
    return;
  }
  const data = readFileChat();
  data.adminLastSeen = now;
  writeFileChat(data);
}

export async function getAdminProfile(): Promise<{ name: string; photoUrl: string }> {
  if (hasRedis()) {
    const raw = await redisChat.get(ADMIN_PROFILE_KEY);
    if (!raw) return { ...DEFAULT_PROFILE };
    try {
      const p = JSON.parse(raw) as { name?: string; photoUrl?: string };
      return {
        name: typeof p.name === 'string' && p.name.trim() ? p.name.trim().slice(0, 200) : DEFAULT_PROFILE.name,
        photoUrl: typeof p.photoUrl === 'string' ? p.photoUrl.trim().slice(0, 2000) : DEFAULT_PROFILE.photoUrl,
      };
    } catch {
      return { ...DEFAULT_PROFILE };
    }
  }
  const data = readFileChat();
  const p = data.adminProfile;
  if (!p || typeof p.name !== 'string') return { ...DEFAULT_PROFILE };
  return {
    name: p.name.trim().slice(0, 200) || DEFAULT_PROFILE.name,
    photoUrl: typeof p.photoUrl === 'string' ? p.photoUrl.trim().slice(0, 2000) : '',
  };
}

export async function setAdminProfile(updates: { name?: string; photoUrl?: string }): Promise<{ name: string; photoUrl: string }> {
  const current = await getAdminProfile();
  const next = {
    name: updates.name !== undefined ? String(updates.name).trim().slice(0, 200) || current.name : current.name,
    photoUrl: updates.photoUrl !== undefined ? String(updates.photoUrl).trim().slice(0, 2000) : current.photoUrl,
  };
  if (hasRedis()) {
    await redisChat.set(ADMIN_PROFILE_KEY, JSON.stringify(next));
    return next;
  }
  const data = readFileChat();
  data.adminProfile = next;
  writeFileChat(data);
  return next;
}
