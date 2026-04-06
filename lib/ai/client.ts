import { z } from "zod";

export type ChatMessage = { role: "system" | "user"; content: string };

type ChatCompletionResponse = {
  choices?: Array<{ message?: { content?: string | null } }>;
};

function extractJsonObject(raw: string): string | null {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  return raw.slice(start, end + 1);
}

export async function chatJson<T>(
  messages: ChatMessage[],
  schema: z.ZodType<T>,
  fallback: T,
  retries = 2
): Promise<T> {
  const apiKey = process.env.OPENAI_API_KEY;
  const baseUrl = process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1";
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  if (!apiKey) return fallback;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const res = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          temperature: 0.2,
          messages: [
            ...messages,
            {
              role: "user",
              content: "Return strict JSON only. No markdown."
            }
          ]
        })
      });

      if (!res.ok) continue;

      const data = (await res.json()) as ChatCompletionResponse;
      const raw = data.choices?.[0]?.message?.content;
      if (!raw) continue;

      const jsonCandidate = extractJsonObject(raw);
      if (!jsonCandidate) continue;

      const parsed = JSON.parse(jsonCandidate);
      return schema.parse(parsed);
    } catch {
      // Retry and finally fall back below.
    }
  }

  return fallback;
}
