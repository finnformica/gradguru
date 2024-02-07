export const tableQuestion = {
  question: "",
  explanation: "",
  answer: {
    type: "ratio",
    value: "",
  },
};

export const tableForm = {
  data: {
    columns: [],
    rows: [],
  },
  questions: [tableQuestion],
  type: "table" as "table",
};

export const graphQuestion = {
  question: "",
  explanation: "",
  answer: {
    type: "ratio",
    value: "",
  },
};

export const graphForm = {
  data: {
    columns: [],
    rows: [],
  },
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
  answer: {
    type: string;
    value: string | {};
  };
}

export interface ITableForm {
  data: {
    columns: [];
    rows: [];
  };
  questions: ITableQuestion[];
  type: "table";
}

export interface IGraphQuestion {
  question: string;
  explanation: string;
  answer: {
    type: string;
    value: string | {};
  };
}

export interface IGraphForm {
  data: {
    columns: [];
    rows: [];
  };
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
