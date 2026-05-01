import { sendWhatsApp } from "@/lib/whatsapp";
import { responders } from "@/lib/responders";

export async function dispatchIncident(
  incident: {
    type: string;
    priority: string;
    department: string;
    summary: string;
  }
) {
  const target =
    responders[
      incident.department as keyof typeof responders
    ] || responders.Dispatch;

  const message = `🚨 CIVIHUB ALERT

Type: ${incident.type}
Priority: ${incident.priority}

${incident.summary}

Respond immediately.`;

  return sendWhatsApp(target, message);
}