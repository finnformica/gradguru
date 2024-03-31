import { IFirestoreData } from "types";

export interface SJTQuestionState {
  type: "rank" | "multiple";
  question: string;
  options: string[];
  explanation: string;
  answer: string;
}

export interface SJTScenarioForm {
  scenario: string;
  questions: SJTQuestionState[];
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

export type SJTQuestion = SJTScenarioForm & IFirestoreData;
