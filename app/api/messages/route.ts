import { supabaseServer } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  //console.log(body);
  const { data, error } = await supabaseServer
    .from("messages")
    .insert([body])
    .select();
  if (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
