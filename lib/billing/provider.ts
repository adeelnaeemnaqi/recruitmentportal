import { PlanTier } from "@prisma/client";

export type CheckoutPlan = "pro_monthly" | "pro_annual";

export type BillingProvider = {
  createCheckoutUrl(input: {
    userId: string;
    userEmail: string;
    plan: CheckoutPlan;
    successUrl: string;
    cancelUrl: string;
  }): Promise<string>;
};

function mapPlan(plan: CheckoutPlan): PlanTier {
  return plan === "pro_annual" ? PlanTier.PRO_ANNUAL : PlanTier.PRO_MONTHLY;
}

export function getBillingProvider(): BillingProvider {
  const mode = process.env.BILLING_MODE ?? "mock";

  if (mode === "mock") {
    return {
      async createCheckoutUrl({ successUrl }) {
        return successUrl;
      }
    };
  }

  return {
    async createCheckoutUrl({ successUrl }) {
      // TODO: paddle hosted checkout integration.
      // Keep fallback safe for now.
      return successUrl;
    }
  };
}

export function mapCheckoutPlanTier(plan: CheckoutPlan) {
  return mapPlan(plan);
}
