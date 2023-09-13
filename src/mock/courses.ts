type Lesson = {
  name: string;
  video: string;
};

type Course = {
  name: string;
  description: string;
  price: number;
  image: string;
  sections: {
    name: string;
    lessons: Lesson[];
  }[];
};

export const consultingCourse: Course = {
  name: "The Complete Guide to Securing a Big 4 Offer",
  description:
    "Teaching students and graduates how to pass the application process at PWC, KPMG, EY and Deloitte.",
  price: 100,
  image: "/imgs/courses/consulting/consulting-thumbnail.png",
  sections: [
    {
      name: "Welcome",
      lessons: [
        {
          name: "Introduction",
          video: "",
        },
      ],
    },
    {
      name: "Stage 1 - Application Forms",
      lessons: [
        {
          name: "Application Form Requirements",
          video: "",
        },
      ],
    },
    {
      name: "Stage 2 - Aptitude Tests (EY, KPMG & Deloitte)",
      lessons: [
        {
          name: "Aptitudde Tests - What to Expect",
          video: "",
        },
        {
          name: "Situational Judgement Tests - What to Expect",
          video: "",
        },
        {
          name: "Situational Judgement Tests - Common Questions (Part 1)",
          video: "",
        },
        {
          name: "Situational Judgement Tests - Common Questions (Part 2)",
          video: "",
        },
        {
          name: "Numerical Reasoning & Data Analysis - What to Expect",
          video: "",
        },
        {
          name: "Numerical Reasoning & Data Analysis - Practice Questions",
          video: "",
        },

        {
          name: "EY, KPMG & Deloitte Aptitude Test Review",
          video: "",
        },
      ],
    },
    {
      name: "Stage 2 - PWC Aptitude Tests",
      lessons: [
        {
          name: "PWC Aptitude Stage Overview",
          video: "",
        },
        {
          name: "Career Unlocked - Games 1-3",
          video: "",
        },
        {
          name: "Career Unlocked - Games 4-6",
          video: "",
        },
        {
          name: "Career Unlocked - Games 7-8",
          video: "",
        },
        {
          name: "Career Unlocked - Game 9",
          video: "",
        },
        {
          name: "Numerical Reasoning Test",
          video: "",
        },
        {
          name: "PWC Aptitude Test Review",
          video: "",
        },
      ],
    },
    {
      name: "Stage 3 - The Job Simulation",
      lessons: [
        {
          name: "Job Simulation Overview",
          video: "",
        },
        {
          name: "Job Simulation Part 1 - HireVue Motivational Questions",
          video: "",
        },
        {
          name: "Job Simulation Part 1 - HireVue Professional Questions",
          video: "",
        },
        {
          name: "Job Simulation Part 1 - HireVue Review",
          video: "",
        },
        {
          name: "Job Simulation Part 2 - Email Questions",
          video: "",
        },
        {
          name: "Job Simulation Review",
          video: "",
        },
      ],
    },
    {
      name: "Stage 4 - Assessment Centre",
      lessons: [
        {
          name: "Assessment Centre Overview",
          video: "",
        },
        {
          name: "Group Exercise",
          video: "",
        },
        {
          name: "Individual Exercise",
          video: "",
        },
        {
          name: "Individual Interview",
          video: "",
        },
        {
          name: "Assessment Centre Review",
          video: "",
        },
      ],
    },
    {
      name: "Final Thoughts & Tips",
      lessons: [
        {
          name: "Course Review",
          video: "",
        },
      ],
    },
  ],
};
