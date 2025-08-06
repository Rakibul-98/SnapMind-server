// ollama.service.ts
import axios from "axios";

const OLLAMA_API_URL = "http://localhost:11434/api/generate";

export const OllamaService = {
  generateCourseOutline: async (
    prompt: string,
    model: string = "mistral"
  ): Promise<string> => {
    try {
      // Compose prompt with clearer instruction for structured JSON output
      const fullPrompt = OllamaService.buildCoursePrompt(prompt);

      const response = await axios.post(OLLAMA_API_URL, {
        model,
        prompt: fullPrompt,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 1200,
        },
      });

      const rawResponse = response.data.response;

      // Parse JSON structure from AI output
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
  "learningObjectives": ["Objective 1", "Objective 2", "..."],
  "modules": [
    {
      "title": "Module 1 title",
      "lessons": [
        {
          "title": "Lesson 1.1 title",
          "keyConcepts": ["Concept A", "Concept B"],
          "activities": ["Activity 1", "Activity 2"]
        }
      ]
    }
  ],
  "assessmentMethods": ["Method 1", "Method 2"],
  "recommendedResources": [
    {"name": "Resource 1", "url": "https://..."},
    {"name": "Resource 2", "url": "https://..."}
  ]
}

Ensure JSON is properly formatted without extraneous text or markdown.
`;
  },

  extractJson: (response: string): string => {
    // Attempt to extract JSON object from AI response reliably
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in AI response");
    return jsonMatch[0];
  },
};
