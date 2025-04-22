import { fetchPosts } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await fetchPosts();
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}