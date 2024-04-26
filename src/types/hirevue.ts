import { IFirestoreData } from "types";

export type IHirevueQuestion = {
  question: string;
  explanation: string;
  modelAnswer: string;
  type: string;
} & IFirestoreData;
