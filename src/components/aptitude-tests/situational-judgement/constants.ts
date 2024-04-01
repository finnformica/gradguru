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
