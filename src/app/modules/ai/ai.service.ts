// ai.service.ts
import { OllamaService } from "./ollama.service";
import { CourseOutline } from "./ai.interface";

export const AiService = {
  generateCourseOutline: async (
    prompt: string,
    model = "mistral"
  ): Promise<CourseOutline> => {
    try {
      const rawJson = await OllamaService.generateCourseOutline(prompt, model);

      // Parse and validate AI response JSON to typed CourseOutline
      const outline: CourseOutline = JSON.parse(rawJson);

      // Basic validation on structure (could be expanded with zod)
      if (
        !outline.title ||
        !outline.description ||
        !Array.isArray(outline.modules)
      ) {
        throw new Error("Invalid course outline structure from AI");
      }

      return outline;
    } catch (error) {
      console.error("AI generation error:", error);
      throw new Error("Failed to generate course outline");
    }
  },

  generateTopicContent: async (
    prompt: string,
    model = "mistral"
  ): Promise<string> => {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
      }),
    });

    const data = await response.json();
    return data.response;
  },
};
