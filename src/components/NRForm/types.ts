import { IFirestoreData } from "components/globalTypes";

export type DataType = {
  columns: any[];
  rows: any[];
  pivot?: boolean;
  labels?: {
    x?: string;
    y?: string;
    title?: string;
  };
};

export type AnswerType = {
  type: "multiple" | "number" | "string" | "currency";
  type2?: "multiple" | "number" | "string" | "currency";
  unit?: string | null;
  value: string | {};
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

export interface IGmatForm {
  explanation: string;
  question: string;
  answer: AnswerType;
  type: "gmat";
}

export type INRForm = ITableForm | IGraphForm | IGmatForm;

export type NRQuestion = INRForm & IFirestoreData;

export const initialData = {
  columns: [],
  rows: [],
} as DataType;

export const initialAnswer = {
  type: "string",
  value: "",
} as AnswerType;

export const tableQuestion = {
  question: "",
  explanation: "",
  answer: initialAnswer,
} as ITableQuestion;

export const tableForm = {
  data: initialData,
  questions: [tableQuestion],
  type: "table" as "table",
} as ITableForm;

export const graphQuestion = {
  question: "",
  explanation: "",
  answer: initialAnswer,
} as IGraphQuestion;

export const graphForm = {
  data: initialData,
  questions: [graphQuestion],
  graph: "line" as "line" | "bar" | "pie",
  scenario: "",
  type: "graph" as "graph",
} as IGraphForm;

export const gmatForm = {
  type: "gmat" as "gmat",
  question: "",
  answer: {
    type: "string",
    value: "",
  } as AnswerType,
  explanation: "",
} as IGmatForm;

export const answerOptions = ["Multiple", "Number", "String", "Currency"];
