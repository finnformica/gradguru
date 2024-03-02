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

// ADMIN

// user panel

export type IUserFormInput = {
  name: string;
  email: string;
  role: {
    value: number;
    label: string;
  };
  courses: string[];
};
