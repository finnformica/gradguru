import { IFirestoreData } from "types";

export type IBlog = {
  title: string;
  summary: string;
  tag: string | null;
  heroPhoto: File | string | null;
  content: string;
  readTime: number; // in minutes
  author: string | null;
  slug: string;
} & IFirestoreData;
