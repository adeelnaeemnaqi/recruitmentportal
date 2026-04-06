import { describe, expect, it } from "vitest";
import { keywordExtractionSchema, explanationSchema } from "./schemas";

describe("AI schema validation", () => {
  it("accepts valid keyword extraction output", () => {
    const parsed = keywordExtractionSchema.parse({
      primaryKeywords: ["a", "b", "c", "d", "e"],
      secondaryKeywords: ["a", "b", "c", "d", "e"],
      titleVariants: ["a", "b", "c"],
      skillsTools: ["a", "b", "c", "d", "e"],
      domainPhrases: ["a", "b", "c"],
      weakPhrasesToAvoid: ["a", "b", "c"]
    });

    expect(parsed.primaryKeywords.length).toBe(5);
  });

  it("rejects malformed explanation output", () => {
    expect(() =>
      explanationSchema.parse({
        headline: "ok",
        about: "ok"
      })
    ).toThrow();
  });
});
