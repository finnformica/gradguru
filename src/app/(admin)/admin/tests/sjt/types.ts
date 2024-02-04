export type QuestionState = {
  type: "rank" | "multiple";
  question: string;
  options: string[];
  explanation: string;
  answer: string;
};

export type ScenarioState = {
  scenario: string;
  questions: QuestionState[];
  created: number;
};
