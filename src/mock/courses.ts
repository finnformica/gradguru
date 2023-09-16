export type LessonType = {
  name: string;
  video: string;
};

export type SectionType = {
  name: string;
  lessons: LessonType[];
};

export type CourseType = {
  name: string;
  description: {
    main: string;
    learn: string[];
    prerequisites: string[];
    who: string[];
  };
  tag: string;
  price: number;
  image: string;
  sections: SectionType[];
};

export const consultingCourse: CourseType = {
  name: "The Complete Guide to Securing a Big 4 Offer",
  tag: "Teaching students and graduates how to pass the application process at PWC, KPMG, EY and Deloitte.",
  description: {
    main: `The Complete Guide to Securing a Big 4 Offer has been carefully crafted to support you as you embark on the challenging path of securing a graduate job at one of the illustrious Big Four accounting firms, encompassing apprenticeships, spring weeks, summer internships, and full-time positions. Throughout this course, we will break down the application process for each of these firms and their specific roles, making sure to cater to all potential applicants.

These stages include comprehensive breakdowns of the:

- Job Application Form
- Aptitude Tests (Numerical Reasoning & Situational Judgement tests + PWC's Game-Based assessment)
- The Job Simulation (including HireVue)
- Assessment Centre

Our content includes engaging lectures, practice questions, and handy cheat sheets, all tailored to empower you to feel fully prepared and confident in your quest to secure an offer from your desired firm and role.

Moreover, we provide you with a clear roadmap of further drills and practice that must be completed to successfully navigate each stage of the application process at these prestigious firms.

With Gradguru's expert guidance and dedication to your success, you'll be better equipped to stand out and seize the opportunity to join the ranks of the Big Four. Let's embark on this transformative journey together`,
    learn: [
      "Understand what skills Big Four firms are looking for from new recruits",
      "Understand the process of receiving an offer from a Big Four firm",
      "Learn how to successfully complete each stage of the Big Four application processes",
      "Learn how to independently practice the skills needed to successfully complete the application process",
    ],
    prerequisites: ["No prior skills needed, just a desire to learn!"],
    who: ["School Leavers and University Students", "Job Seekers"],
  },
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
          name: "Aptitude Tests - What to Expect",
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
