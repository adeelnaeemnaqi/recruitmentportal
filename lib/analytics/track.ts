export type AnalyticsEvent =
  | "landing_cta_click"
  | "audit_started"
  | "audit_completed"
  | "paywall_shown"
  | "checkout_started"
  | "subscription_success"
  | "export_used"
  | "refine_used";

export function trackServerEvent(event: AnalyticsEvent, payload: Record<string, unknown> = {}) {
  // Replace with PostHog/Segment/etc in next phase.
  // Keep payload minimal to avoid logging private profile text.
  const safePayload = {
    ...payload,
    timestamp: new Date().toISOString()
  };

  console.info(`[analytics] ${event}`, safePayload);
}
