type MailListType = {
  email: string;
  subscribed: boolean;
};

type EmailMessageType = {
  to: string;
  message: {
    subject: string;
    text?: string;
    html: string;
  };
};

type FirestoreDataType = MailListType | EmailMessageType;

type FirestoreCollectionType = "mail-list" | "mail";
