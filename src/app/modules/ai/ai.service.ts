// ai.service.ts
import { OllamaService } from "./ollama.service";
import { CourseOutline } from "./ai.interface";

export const AiService = {
  generateCourseOutline: async (
    prompt: string,
    model = "mistral"
  ): Promise<CourseOutline> => {
    try {
      const rawJson = await OllamaService.generateCourseOutline(
        prompt,
        "mistral"
      );

      let outline: CourseOutline;
      try {
        outline = JSON.parse(rawJson);
      } catch (parseErr) {
        console.error("JSON parse error:", rawJson);
        throw new Error("Invalid JSON format returned from AI");
      }

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

  generateQuizFromContent: async (
    content: string,
    model = "mistral"
  ): Promise<
    {
      question: string;
      options: string[];
      answer: string;
    }[]
  > => {
    try {
      const rawJson = await OllamaService.generateQuizFromContent(
        content,
        model
      );

      let quiz;
      try {
        quiz = JSON.parse(rawJson);
      } catch (parseErr) {
        console.error("Quiz JSON parse error:", rawJson);
        throw new Error("Invalid JSON format returned from AI for quiz");
      }

      if (!Array.isArray(quiz)) {
        throw new Error("Invalid quiz structure from AI");
      }

      return quiz;
    } catch (error) {
      console.error("AI quiz generation error:", error);
      throw new Error("Failed to generate quiz");
    }
  },
};
