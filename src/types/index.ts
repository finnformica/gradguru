// ---- Videos ----

export type CourseType = {
  active: boolean;
  description: {
    who: string[];
    learn: string[];
    main: string;
  };
  drills: {
    title: string;
    description: string;
    href: string;
  }[];
  id: string;
  image: string;
  lessons: LessonType[];
  name: string;
  price: number;
  resources: ResourceType[];
  sections: string[];
  tag: string;
  tests: TestType[];
  title: string;
};

type ResourceType = {
  title: string;
  link: string;
  id: string;
};

export type LessonType = {
  name: string;
  video: string;
  duration: string;
  section: number;
};

type TestType = {
  id: string;
  title: string;
};

export interface IFirestoreData {
  created?: number;
  id?: string;
}

// ---- Admin - User ----

export type IUserFormInput = IFirestoreData & {
  name: string;
  email: string;
  role: {
    value: number;
    label: string;
  };
  courses: string[];
};

// ---- Resources ----

export type IResource = {
  name: string;
  description: string;
  type: string;
  file: File | null;
} & IFirestoreData;

// ---- Tests ----

export type ITest = {
  testId?: string;
};

export type AptitudeTestType =
  | "numerical-reasoning"
  | "situational-judgement"
  | "logical-reasoning";

export type ITestRecord = IFirestoreData & {
  testId: string;
  score: number;
  date: number;
  questionIds: string[];
  time: number;
};

// -- Numerical Reasoning --

export type NRTestType = "gmat" | "graph" | "table";

export type NRData = {
  columns: any[];
  rows: any[];
  pivot?: boolean;
  labels?: {
    x?: string;
    y?: string;
    title?: string;
  };
};

export type NRAnswer = {
  type: "multiple" | "number" | "string" | "currency";
  type2?: "multiple" | "number" | "string" | "currency";
  unit?: string | null;
  value: string | {};
};

export type ITableScenario = {
  question: string;
  explanation: string;
  answer: NRAnswer;
};

export type ITableQuestion = {
  data: NRData;
  questions: ITableScenario[];
  type: "table";
};

export type IGraphScenario = {
  question: string;
  explanation: string;
  answer: NRAnswer;
};

export type IGraphQuestion = {
  data: NRData;
  questions: IGraphScenario[];
  graph: "line" | "bar" | "pie";
  scenario: string;
  type: "graph";
};

export type IGmatQuestion = {
  explanation: string;
  question: string;
  answer: NRAnswer;
  type: "gmat";
};

export type ITableGraphScenario = ITableScenario | IGraphScenario;
export type ITableGraphQuestion = ITableQuestion | IGraphQuestion;

export type INRQuestion = (IGraphQuestion | ITableQuestion | IGmatQuestion) &
  IFirestoreData &
  ITest;

export type INRTest = IFirestoreData & {
  name: string;
  questions: {
    [key in NRTestType]: string[];
  };
};

export type NRQuestionFlat = {
  question: string;
  scenario: string;
  type: "table" | "graph" | "gmat";
  options: string[];
  shuffled: string[];
  answer: any;
  success: boolean | null;
  id: string;
  explanation: string;
};

// -- Situational Judgement --

export type ISJScenario = IFirestoreData &
  ITest & {
    questions: ISJQuestion[];
    scenario: string;
  };

export type ISJQuestion = {
  type: "rank" | "multiple";
  question: string;
  options: string[];
  explanation: string;
  answer: string;
} & IFirestoreData &
  ITest;

export type ISJTest = IFirestoreData & {
  created: number;
  name: string;
  questions: string[];
};

export type SJQuestionFlat = {
  question: string;
  scenario: string;
  explanation: string;
  type: "multiple" | "rank";
  options: string[];
  shuffled: string[];
  answer: string;
  success: boolean | null;
  id?: string;
};

// -- Logical Reasoning --

export type CellData = {
  type: string;
  value: any;
  color: string;
  rotation: number;
  backgroundColor: string;
  size: number;
};

export type Grid = CellData[][];

export type GridType = "triangle" | "square";

export type GridTemplate = "linear" | "grid";

export type GridCoord = {
  row: number;
  col: number;
};

export type ILRQuestion = {
  answer: number | string;
  explanation: string;
  question: string;
  type: "complete-the-sequence" | "odd-one-out";
  grid: {
    data: Grid[];
    options: Grid[];
    rows: number;
    template: GridTemplate;
    type: GridType;
    questionMark: number | string;
    border: {
      inner: boolean;
      outer: boolean;
    };
  };
} & IFirestoreData &
  ITest;

export type ILRTest = IFirestoreData & {
  name: string;
  questions: string[];
};
