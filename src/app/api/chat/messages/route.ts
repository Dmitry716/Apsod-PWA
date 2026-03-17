import { NextResponse } from 'next/server';
import { getChatMessages } from '@/app/lib/chat';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get('conversationId');
  const viewer = searchParams.get('viewer'); // 'visitor' | 'admin' — кто смотрит (для статусов и отметки «прочитано»)
  if (!conversationId) {
    return NextResponse.json({ error: 'Укажите conversationId' }, { status: 400 });
  }
  const viewerRole =
    viewer === 'admin' ? ('admin' as const) : viewer === 'visitor' ? ('visitor' as const) : undefined;
  const messages = await getChatMessages(conversationId, { viewerRole });
  return NextResponse.json({ messages });
}
