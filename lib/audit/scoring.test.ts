import { describe, expect, it } from "vitest";
import { deterministicScore } from "./scoring";
import type { KeywordOutput, OnboardingInput } from "../../types/audit";

const keywords: KeywordOutput = {
  primaryKeywords: ["Product Manager", "roadmap", "stakeholder management", "analytics", "experimentation"],
  secondaryKeywords: ["SaaS", "execution", "strategy", "cross-functional", "delivery"],
  titleVariants: ["Product Manager", "Senior Product Manager", "Growth Product Manager"],
  skillsTools: ["SQL", "Amplitude", "Mixpanel", "Jira", "Notion"],
  domainPhrases: ["activation", "retention", "customer outcomes"],
  weakPhrasesToAvoid: ["hardworking", "team player", "passionate"]
};

const input: OnboardingInput = {
  currentProfileText:
    "Product Manager leading roadmap, analytics, and cross-functional execution. Improved activation and retention in B2B SaaS.",
  targetJobTitle: "Product Manager",
  targetIndustry: "SaaS",
  experienceLevel: "MID" as OnboardingInput["experienceLevel"],
  profileType: "JOB_SEEKER" as OnboardingInput["profileType"],
  jobDescriptionText: "Looking for a Product Manager with experimentation, analytics, and stakeholder management skills."
};

describe("deterministicScore", () => {
  it("returns bounded category scores and total out of 100", () => {
    const result = deterministicScore(input, keywords);

    expect(result.headline).toBeGreaterThanOrEqual(0);
    expect(result.headline).toBeLessThanOrEqual(20);
    expect(result.about).toBeGreaterThanOrEqual(0);
    expect(result.about).toBeLessThanOrEqual(20);
    expect(result.experience).toBeGreaterThanOrEqual(0);
    expect(result.experience).toBeLessThanOrEqual(20);
    expect(result.skillsCoverage).toBeGreaterThanOrEqual(0);
    expect(result.skillsCoverage).toBeLessThanOrEqual(20);
    expect(result.positioningConsistency).toBeGreaterThanOrEqual(0);
    expect(result.positioningConsistency).toBeLessThanOrEqual(20);
    expect(result.total).toBeGreaterThanOrEqual(0);
    expect(result.total).toBeLessThanOrEqual(100);
  });

  it("returns a 0-100 jobMatch when JD is provided", () => {
    const result = deterministicScore(input, keywords);
    expect(result.jobMatch).toBeDefined();
    expect(result.jobMatch!).toBeGreaterThanOrEqual(0);
    expect(result.jobMatch!).toBeLessThanOrEqual(100);
  });
});
