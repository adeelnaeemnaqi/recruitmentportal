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

function getPaddlePriceId(plan: CheckoutPlan) {
  if (plan === "pro_annual") return process.env.PADDLE_PRICE_ID_ANNUAL;
  return process.env.PADDLE_PRICE_ID_MONTHLY;
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
    async createCheckoutUrl({ userId, userEmail, plan, successUrl }) {
      const apiKey = process.env.PADDLE_API_KEY;
      const priceId = getPaddlePriceId(plan);

      if (!apiKey || !priceId) {
        throw new Error("Missing Paddle API configuration");
      }

      const response = await fetch("https://api.paddle.com/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          items: [{ price_id: priceId, quantity: 1 }],
          customer: {
            email: userEmail
          },
          custom_data: {
            userId,
            plan
          },
          checkout: {
            url: successUrl
          }
        })
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Paddle checkout creation failed: ${body}`);
      }

      const data = (await response.json()) as {
        data?: {
          checkout?: {
            url?: string;
          };
        };
      };

      return data.data?.checkout?.url ?? successUrl;
    }
  };
}

export function mapCheckoutPlanTier(plan: CheckoutPlan) {
  return mapPlan(plan);
}
