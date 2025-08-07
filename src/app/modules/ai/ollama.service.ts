// ollama.service.ts
import axios from "axios";

const OLLAMA_API_URL = "http://localhost:11434/api/generate";

export const OllamaService = {
  generateCourseOutline: async (
    prompt: string,
    model: string = "mistral"
  ): Promise<string> => {
    try {
      const fullPrompt = OllamaService.buildCoursePrompt(prompt);

      const response = await axios.post(OLLAMA_API_URL, {
        model,
        prompt: fullPrompt,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 1500,
        },
      });

      const rawResponse = response.data?.response?.trim();

      if (!rawResponse) {
        throw new Error("Empty response from Ollama AI");
      }

      const outlineJson = OllamaService.extractJson(rawResponse);

      return outlineJson;
    } catch (error) {
      console.error("Ollama generation error:", error);
      throw new Error("Failed to generate content with Ollama");
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
          "keyConcepts": ["Concept A", "Concept B"],
        }
      ]
    }
  ],
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

  generateQuizFromContent: async (
    content: string,
    model: string = "mistral"
  ): Promise<string> => {
    try {
      const fullPrompt = OllamaService.buildQuizPrompt(content);

      const response = await axios.post(OLLAMA_API_URL, {
        model,
        prompt: fullPrompt,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 1000,
        },
      });

      const rawResponse = response.data?.response?.trim();

      if (!rawResponse) {
        throw new Error("Empty response from Ollama AI");
      }

      const quizJson = OllamaService.extractJson(rawResponse);

      return quizJson;
    } catch (error) {
      console.error("Ollama quiz generation error:", error);
      throw new Error("Failed to generate quiz content with Ollama");
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
};
