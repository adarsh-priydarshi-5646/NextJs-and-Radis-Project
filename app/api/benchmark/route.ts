import { benchmarkPerformance } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await benchmarkPerformance();
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error running benchmark:', error);
    return NextResponse.json({ error: 'Failed to run benchmark' }, { status: 500 });
  }
}