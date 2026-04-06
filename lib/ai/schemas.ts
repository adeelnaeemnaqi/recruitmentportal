import { z } from "zod";

export const keywordExtractionSchema = z.object({
  primaryKeywords: z.array(z.string()).min(5),
  secondaryKeywords: z.array(z.string()).min(5),
  titleVariants: z.array(z.string()).min(3),
  skillsTools: z.array(z.string()).min(5),
  domainPhrases: z.array(z.string()).min(3),
  weakPhrasesToAvoid: z.array(z.string()).min(3)
});

export const explanationSchema = z.object({
  headline: z.string(),
  about: z.string(),
  experience: z.string(),
  skillsCoverage: z.string(),
  positioningConsistency: z.string(),
  overall: z.string()
});
