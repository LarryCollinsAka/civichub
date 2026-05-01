export async function classifyIncident(
  text: string
) {
  const response = await fetch(
    "https://integrate.api.nvidia.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NVIDIA_NIM_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model:
          "meta/llama-4-maverick-17b-128e-instruct",
        messages: [
          {
            role: "user",
            content: `
Analyze this emergency incident report and return ONLY valid JSON:

{
"type":"",
"priority":"",
"department":"",
"summary":""
}

Incident:
${text}
            `,
          },
        ],
        temperature: 0.2,
        max_tokens: 300,
      }),
    }
  );

  const data = await response.json();

  const raw =
    data.choices?.[0]?.message?.content || "{}";

  try {
    return JSON.parse(raw);
  } catch {
    return {
      type: "Unknown",
      priority: "Medium",
      department: "Dispatch",
      summary: text,
    };
  }
}