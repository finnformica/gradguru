export interface SJTQuestionState {
  type: "rank" | "multiple";
  question: string;
  options: string[];
  explanation: string;
  answer: string;
}

export interface SJTScenarioState {
  scenario: string;
  questions: SJTQuestionState[];
  created?: number;
  id?: string;
}

export const initialQuestion = {
  type: "multiple" as "rank" | "multiple",
  question: "",
  options: ["", "", "", "", ""],
  explanation: "",
  answer: "1",
};

export const initialForm = {
  scenario: "",
  questions: [initialQuestion],
};
