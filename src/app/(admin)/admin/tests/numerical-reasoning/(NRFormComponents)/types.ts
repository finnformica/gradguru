export const tableQuestion = {
  question: "",
  explanation: "",
  answer: "",
};

export const tableForm = {
  data: {},
  questions: [tableQuestion],
  type: "table" as "table",
};

export const graphQuestion = {
  question: "",
  explanation: "",
  answer: "",
};

export const graphForm = {
  data: {},
  questions: [graphQuestion],
  graph: "" as "line" | "bar" | "pie",
  scenario: "",
  type: "graph" as "graph",
};

export const gmatQuestion = {
  question: "",
  explanation: "",
  answer: "",
};

export const gmatForm = {
  scenario: "",
  questions: [gmatQuestion],
  type: "gmat" as "gmat",
};

export interface ITableQuestion {
  question: string;
  explanation: string;
  answer: string;
}

export interface ITableForm {
  data: {};
  questions: ITableQuestion[];
  type: "table";
}

export interface IGraphQuestion {
  question: string;
  explanation: string;
  answer: string;
}

export interface IGraphForm {
  data: {};
  questions: IGraphQuestion[];
  graph: "line" | "bar" | "pie";
  scenario: string;
  type: "graph";
}

export interface IGmatQuestion {
  question: string;
  explanation: string;
  answer: string;
}

export interface IGmatForm {
  scenario: string;
  questions: IGmatQuestion[];
  type: "gmat";
}

export type INRForm = ITableForm | IGraphForm | IGmatForm;
