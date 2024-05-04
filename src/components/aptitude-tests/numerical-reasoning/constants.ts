import {
  IGmatQuestion,
  IGraphQuestion,
  IGraphScenario,
  ITableQuestion,
  ITableScenario,
  NRAnswer,
  NRData,
} from "types";

export const initialData = {
  columns: [],
  rows: [],
} as NRData;

export const initialAnswer = {
  type: "string",
  value: "",
} as NRAnswer;

export const tableQuestion = {
  question: "",
  explanation: "",
  answer: initialAnswer,
} as ITableScenario;

export const tableForm = {
  data: initialData,
  questions: [tableQuestion],
  type: "table" as "table",
} as ITableQuestion;

export const graphQuestion = {
  question: "",
  explanation: "",
  answer: initialAnswer,
} as IGraphScenario;

export const graphForm = {
  data: initialData,
  questions: [graphQuestion],
  graph: "line" as "line" | "bar" | "pie",
  scenario: "",
  type: "graph" as "graph",
} as IGraphQuestion;

export const gmatForm = {
  type: "gmat" as "gmat",
  question: "",
  answer: {
    type: "string",
    value: "",
  } as NRAnswer,
  explanation: "",
} as IGmatQuestion;

export const answerOptions = ["Multiple", "Number", "String", "Currency"];
