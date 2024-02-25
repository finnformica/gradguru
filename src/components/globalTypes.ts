export type AlertState = {
  open: boolean;
  severity: "success" | "info" | "warning" | "error" | undefined;
  message: string;
  title: string;
};

export type UserType = {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  uid: string;
  photoURL: string;
};

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
