import { PlanTier } from "@prisma/client";
import { APP_CONFIG } from "@/lib/config";

export function getAuditLimit(planTier: PlanTier) {
  switch (planTier) {
    case PlanTier.PRO_MONTHLY:
    case PlanTier.PRO_ANNUAL:
      return 999;
    case PlanTier.FREE:
    default:
      return APP_CONFIG.monthlyAuditLimitFree;
  }
}

export function canExport(planTier: PlanTier) {
  return planTier !== PlanTier.FREE;
}
