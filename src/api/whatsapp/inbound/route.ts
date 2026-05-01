import { NextResponse } from "next/server";
import { sendWhatsApp } from "@/lib/whatsapp";
import { supabase } from "@/lib/supabase";
import { classifyIncident } from "@/lib/ai";
import { dispatchIncident } from "@/lib/dispatch";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const body = formData.get("Body")?.toString() || "";
    const from = formData.get("From")?.toString() || "";

    const ai = await classifyIncident(body);

    await supabase.from("incidents").insert([
      {
        type: ai.type,
        description: ai.summary,
        source: "whatsapp",
        priority: ai.priority,
        department: ai.department,
        reporter: from.replace("whatsapp:", ""),
      },
    ]);

    await dispatchIncident(ai);

    await sendWhatsApp(
      from.replace("whatsapp:", ""),
      `✅ Civihub received your report.

Type: ${ai.type}
Priority: ${ai.priority}
Assigned: ${ai.department}

Response team notified.`,
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
