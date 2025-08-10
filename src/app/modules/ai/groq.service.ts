// groq.service.ts
import Groq from "groq-sdk";
import { config } from "../../config";

const groq = new Groq({
  apiKey: config.groqAPIKEY!,
});

export const GroqService = {
  generateCourseOutline: async (topic: string): Promise<string> => {
    try {
      const prompt = GroqService.buildCoursePrompt(topic);

      const response = await groq.chat.completions.create({
        model: config.groqAiModel,
        messages: [
          {
            role: "system",
            content:
              "You are a helpful course outline generator. Respond only with valid JSON.",
          },
          { role: "user", content: prompt },
        ],
      });

      const rawResponse = response.choices[0].message.content!.trim();

      if (!rawResponse) {
        throw new Error("Empty response from Groq AI");
      }

      const outlineJson = GroqService.extractJson(rawResponse);

      return outlineJson;
    } catch (error) {
      console.error("Groq generation error:", error);
      throw new Error("Failed to generate content with Groq");
    }
  },

  buildCoursePrompt: (topic: string): string => {
    return `
Generate a comprehensive **course outline** about "${topic}" in **JSON format** matching this schema:

{
  "title": "Creative course title",
  "description": "3-5 sentence course overview",
  "modules": [
    {
      "title": "Module 1 title",
      "lessons": [
        {
          "title": "Lesson 1.1 title",
          "keyConcepts": ["Concept A", "Concept B"]
        }
      ]
    }
  ]
}

Ensure JSON is properly formatted without extraneous text or markdown.
`;
  },

  extractJson: (response: string): string => {
    try {
      const match = response.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
      if (!match) throw new Error("No JSON found in AI response");
      return match[0];
    } catch (error) {
      console.error("JSON extraction failed:", response);
      throw new Error("Failed to extract JSON from AI response");
    }
  },

  generateQuizFromContent: async (content: string): Promise<string> => {
    try {
      const prompt = GroqService.buildQuizPrompt(content);

      const response = await groq.chat.completions.create({
        model: config.groqAiModel,
        messages: [
          {
            role: "system",
            content:
              "You are a quiz generator. Respond ONLY with valid JSON array of 5 quiz questions.",
          },
          { role: "user", content: prompt },
        ],
      });

      const rawResponse = response.choices[0].message.content!.trim();

      if (!rawResponse) {
        throw new Error("Empty response from Groq AI");
      }

      const quizJson = GroqService.extractJson(rawResponse);

      return quizJson;
    } catch (error) {
      console.error("Groq quiz generation error:", error);
      throw new Error("Failed to generate quiz content with Groq");
    }
  },

  buildQuizPrompt: (content: string): string => {
    return `
Based on the content below, generate a **JSON array** of exactly 5 quiz questions. Each question should follow this schema:

{
  "question": "Question text",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "answer": "Correct Option"
}

Respond ONLY with valid JSON. Do NOT include any markdown, explanation, or text.

Content:
"""
${content}
"""
`;
  },
  generateTopicContent: async (prompt: string): Promise<string> => {
    try {
      const response = await groq.chat.completions.create({
        model: config.groqAiModel,
        messages: [
          {
            role: "system",
            content: "You are a helpful topic content generator.",
          },
          { role: "user", content: prompt },
        ],
      });

      return response.choices[0].message.content!;
    } catch (error) {
      console.error("Groq topic content generation error:", error);
      throw new Error("Failed to generate topic content");
    }
  },
};
