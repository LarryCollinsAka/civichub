import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("incidents")
      .insert([body])
      .select();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: true },
      { status: 500 }
    );
  }
}

export async function GET() {
  const { data } = await supabase
    .from("incidents")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  return NextResponse.json(data);
}