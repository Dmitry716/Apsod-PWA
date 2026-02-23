// src/app/api/blog/posts/route.ts
import { NextResponse } from 'next/server';
import { blogPosts } from '@/app/blog/data/posts';

export async function GET() {
  const posts = blogPosts.map(p => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    date: p.date
  }));
  
  return NextResponse.json(posts);
}