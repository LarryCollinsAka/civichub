import { NextResponse } from "next/server";
import { sendWhatsApp } from "@/lib/whatsapp";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await sendWhatsApp(
      body.to,
      body.message
    );

    return NextResponse.json({
      success: true,
      sid: result.sid,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}