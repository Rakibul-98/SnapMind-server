// ai.interface.ts
export interface PromptRequest {
  prompt: string;
  userId: string;
  model?: string;
}

export interface CourseOutline {
  title: string;
  description: string;
  learningObjectives: string[];
  modules: CourseModule[];
  assessmentMethods: string[];
  recommendedResources: Resource[];
}

export interface CourseModule {
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  title: string;
  keyConcepts: string[];
  activities: string[];
}

export interface Resource {
  name: string;
  url: string;
}
