export const initialData = {
  columns: [],
  rows: [],
};

export const initialAnswer = {
  type: "ratio",
  value: "",
};

export type DataType = {
  columns: any[];
  rows: any[];
  pivot?: boolean;
  labels?: {
    x?: string;
    y?: string;
  };
};

export type AnswerType = {
  type: string;
  value: string | {};
};

export const tableQuestion = {
  question: "",
  explanation: "",
  answer: initialAnswer,
};

export const tableForm = {
  data: initialData,
  questions: [tableQuestion],
  type: "table" as "table",
};

export const graphQuestion = {
  question: "",
  explanation: "",
  answer: initialAnswer,
};

export const graphForm = {
  data: initialData,
  questions: [graphQuestion],
  graph: "bar" as "line" | "bar" | "pie",
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
  answer: AnswerType;
}

export interface ITableForm {
  data: DataType;
  questions: ITableQuestion[];
  type: "table";
}

export interface IGraphQuestion {
  question: string;
  explanation: string;
  answer: AnswerType;
}

export interface IGraphForm {
  data: DataType;
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
