import { NextResponse } from "next/server";
import { matches } from "@/lib/data/matches";

export async function GET() {
  return NextResponse.json(matches);
}

