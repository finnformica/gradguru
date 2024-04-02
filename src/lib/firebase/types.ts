import { CourseType } from "types";

type MailListType = {
  email: string;
  subscribed: boolean;
};

type EmailMessageType = {
  to: string;
  message: {
    subject: string;
    text: string;
    html?: string;
  };
};

export type FirestoreDataType = MailListType | EmailMessageType | CourseType;

export type FirestoreCollectionType = "mail-list" | "mail" | "courses";
