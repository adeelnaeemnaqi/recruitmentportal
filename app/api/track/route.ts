import { NextResponse } from "next/server";
import { z } from "zod";
import { trackServerEvent, type AnalyticsEvent } from "@/lib/analytics/track";

const trackSchema = z.object({
  event: z.enum([
    "landing_cta_click",
    "audit_started",
    "audit_completed",
    "paywall_shown",
    "checkout_started",
    "subscription_success",
    "export_used",
    "refine_used"
  ]),
  payload: z.record(z.unknown()).optional()
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = trackSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid analytics payload" }, { status: 400 });
  }

  trackServerEvent(parsed.data.event as AnalyticsEvent, parsed.data.payload ?? {});

  return NextResponse.json({ ok: true });
}
