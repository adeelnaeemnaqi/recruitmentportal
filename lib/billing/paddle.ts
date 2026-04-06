import crypto from "crypto";
import { PlanTier } from "@prisma/client";

export type PaddleEvent = {
  event_type: string;
  data: {
    id?: string;
    status?: string;
    customer_id?: string;
    custom_data?: {
      userId?: string;
      plan?: "pro_monthly" | "pro_annual";
    };
    next_billed_at?: string;
  };
};

export function mapPlanToTier(plan?: "pro_monthly" | "pro_annual") {
  if (plan === "pro_annual") return PlanTier.PRO_ANNUAL;
  return PlanTier.PRO_MONTHLY;
}

export function verifyPaddleSignature(rawBody: string, signature: string, secret: string) {
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
