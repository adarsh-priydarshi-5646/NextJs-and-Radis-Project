import { fetchUsers } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await fetchUsers();
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}