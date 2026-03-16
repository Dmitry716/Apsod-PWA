import { NextResponse } from 'next/server';
import { getAdminLastSeen } from '@/app/lib/chat';

const ONLINE_THRESHOLD_MS = 5 * 60 * 1000; // 5 минут

export async function GET() {
  try {
    const lastSeen = await getAdminLastSeen();
    const now = Date.now();
    const online = lastSeen !== null && now - lastSeen < ONLINE_THRESHOLD_MS;
    return NextResponse.json({ online, lastSeen });
  } catch (e) {
    console.error('Chat status error:', e);
    return NextResponse.json({ online: false, lastSeen: null });
  }
}
