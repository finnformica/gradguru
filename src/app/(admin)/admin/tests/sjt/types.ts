export type QuestionState = {
  type: "rank" | "multiple";
  question: string;
  options: string[];
  explanation: string;
  answer: string;
};

export type FormState = {
  scenario: string;
  questions: QuestionState[];
};
