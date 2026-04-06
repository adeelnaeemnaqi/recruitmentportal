import { keywordExtractionSchema } from "@/lib/ai/schemas";
import { keywordExtractionPromptV1 } from "@/lib/ai/prompts/keywordExtraction";
import { chatJson } from "@/lib/ai/client";
import type { KeywordOutput } from "@/types/audit";

export async function extractKeywords(input: {
  targetJobTitle: string;
  targetIndustry: string;
  jobDescriptionText?: string;
}): Promise<KeywordOutput> {
  const fallback: KeywordOutput = {
    primaryKeywords: [input.targetJobTitle, "strategy", "stakeholder management", "execution", "communication"],
    secondaryKeywords: ["cross-functional", "analytics", "roadmap", "delivery", input.targetIndustry],
    titleVariants: [input.targetJobTitle, `Senior ${input.targetJobTitle}`, `${input.targetIndustry} ${input.targetJobTitle}`],
    skillsTools: ["SQL", "Excel", "Power BI", "Notion", "Jira"],
    domainPhrases: ["business impact", "process optimization", "customer outcomes"],
    weakPhrasesToAvoid: ["hardworking", "team player", "results-oriented"]
  };

  return chatJson(
    [
      { role: "system", content: keywordExtractionPromptV1 },
      { role: "user", content: JSON.stringify(input) }
    ],
    keywordExtractionSchema,
    fallback
  );
}
