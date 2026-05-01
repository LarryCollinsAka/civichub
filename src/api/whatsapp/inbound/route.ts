import { NextResponse } from "next/server";
import { sendWhatsApp } from "@/lib/whatsapp";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const body = formData.get("Body")?.toString() || "";
    const from = formData.get("From")?.toString() || "";

    console.log("Incoming WhatsApp:", { from, body });

    // Save to database
    await supabase.from("incidents").insert([
      {
        type: "Unknown",
        description: body,
        source: "whatsapp",
        priority: "Pending",
        department: "Pending",
        reporter: from.replace("whatsapp:", ""),
      },
    ]);

    // Auto reply
    await sendWhatsApp(
      from.replace("whatsapp:", ""),
      `✅ Civihub received your report:\n"${body}"\n\nResponders will review shortly.`
    );

    return new NextResponse("OK", {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return new NextResponse("Error", {
      status: 500,
    });
  }
}