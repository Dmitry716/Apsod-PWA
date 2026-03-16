import { NextResponse } from 'next/server';
import { getChatMessages } from '@/app/lib/chat';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get('conversationId');
  if (!conversationId) {
    return NextResponse.json({ error: 'Укажите conversationId' }, { status: 400 });
  }
  const messages = await getChatMessages(conversationId);
  return NextResponse.json({ messages });
}
