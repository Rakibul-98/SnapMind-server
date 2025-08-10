// ai.service.ts
import { CourseOutline } from "./ai.interface";
import { GroqService } from "./groq.service";

export const AiService = {
  generateCourseOutline: async (prompt: string): Promise<CourseOutline> => {
    try {
      const rawJson = await GroqService.generateCourseOutline(prompt);

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

  generateTopicContent: async (prompt: string): Promise<string> => {
    try {
      const response = await GroqService.generateTopicContent(prompt);
      return response;
    } catch (error) {
      console.error("AI topic content generation error:", error);
      throw new Error("Failed to generate topic content");
    }
  },

  generateQuizFromContent: async (
    content: string
  ): Promise<
    {
      question: string;
      options: string[];
      answer: string;
    }[]
  > => {
    try {
      const rawJson = await GroqService.generateQuizFromContent(content);

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
