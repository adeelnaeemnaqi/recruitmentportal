import { extractKeywords } from "@/lib/keyword-engine/extract";
import { deterministicScore } from "@/lib/audit/scoring";
import type { OnboardingInput } from "@/types/audit";

export async function runAudit(input: OnboardingInput) {
  const keywords = await extractKeywords({
    targetJobTitle: input.targetJobTitle,
    targetIndustry: input.targetIndustry,
    jobDescriptionText: input.jobDescriptionText
  });

  const scores = deterministicScore(input, keywords);

  const explanations = {
    headline: "Your headline partially signals target role relevance, but can communicate specialization more clearly.",
    about: "The About section has baseline clarity. It can improve by adding credible outcomes and tighter role language.",
    experience: "Experience has useful context but should lead with impact and role-matched action verbs.",
    skillsCoverage: `Keyword coverage currently includes ${Math.round((scores.skillsCoverage / 20) * 100)}% of high-signal terms.`,
    positioningConsistency: "Your narrative is directionally aligned but needs stronger consistency across headline, about, and experience.",
    overall: "Better keywords. Cleaner positioning. Less fluff."
  };

  const rewrite = {
    headlines: [
      `${input.targetJobTitle} | Driving measurable business impact`,
      `${input.targetIndustry} ${input.targetJobTitle} focused on outcomes`,
      `${input.targetJobTitle} | Strategy + execution`,
      `${input.targetJobTitle} helping teams ship high-impact work`,
      `${input.targetJobTitle} turning ambiguity into delivery`
    ],
    aboutOptions: [
      "Corporate tone: I help organizations...",
      "Confident tone: I build and scale...",
      "Approachable tone: I enjoy solving..."
    ],
    experienceGuidance: "Lead each bullet with action + context + measurable impact where available.",
    skills: keywords.primaryKeywords.slice(0, 8),
    bannerText: "Open to roles in high-impact teams",
    featuredSuggestions: ["Case study post", "Proof-of-work portfolio", "Industry insight article"]
  };

  const positioning = {
    currentPositioning: "Execution-capable generalist",
    targetPositioning: `${input.targetIndustry} ${input.targetJobTitle} specialist`,
    gapSummary: "Increase role-specific vocabulary and evidence of ownership.",
    narrativeDirection: "Shift from execution-heavy to strategy + outcomes narrative."
  };

  return { keywords, scores, explanations, rewrite, positioning };
}
