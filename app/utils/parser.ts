export const parseSections = (text: string) => {
  if (!text) {
    return {
      explanation: "",
      approach: "",
      code: "",
      complexity: "",
    };
  }

  const sections = {
    explanation: "",
    approach: "",
    code: "",
    complexity: "",
  };

  const split = text.split(/(?=Approach:|Code:|Complexity:)/i);

  split.forEach((part) => {
    const lower = part.toLowerCase();

    if (lower.startsWith("approach")) {
      sections.approach = part.replace(/approach:?/i, "").trim();
    } else if (lower.startsWith("code")) {
      sections.code = part.replace(/code:?/i, "").trim();
    } else if (lower.startsWith("complexity")) {
      sections.complexity = part.replace(/complexity:?/i, "").trim();
    } else {
      sections.explanation = part.trim();
    }
  });

  return sections;
};