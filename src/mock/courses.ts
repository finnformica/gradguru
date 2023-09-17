export type LessonType = {
  name: string;
  video: string;
  duration: string;
  section: number;
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
  sections: string[];
  lessons: LessonType[];
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

With Gradguru's expert guidance and dedication to your success, you'll be better equipped to stand out and seize the opportunity to join the ranks of the Big Four. Let's embark on this transformative journey together.`,
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
    "Welcome",
    "Stage 1 - Application Forms",
    "Stage 2 - Aptitude Tests (EY, KPMG & Deloitte)",
    "Stage 2 - PWC Aptitude Tests",
    "Stage 3 - The Job Simulation",
    "Stage 4 - Assessment Centre",
    "Final Thoughts & Tips",
  ],
  lessons: [
    {
      name: "Introduction",
      video: "",
      duration: "1:00",
      section: 0,
    },
    {
      name: "Application Form Requirements",
      video: "",
      duration: "1:00",
      section: 1,
    },
    {
      name: "Aptitude Tests - What to Expect",
      video: "",
      duration: "1:00",
      section: 2,
    },
    {
      name: "Situational Judgement Tests - What to Expect",
      video: "",
      duration: "1:00",
      section: 2,
    },
    {
      name: "Situational Judgement Tests - Common Questions (Part 1)",
      video: "",
      duration: "1:00",
      section: 2,
    },
    {
      name: "Situational Judgement Tests - Common Questions (Part 2)",
      video: "",
      duration: "1:00",
      section: 2,
    },
    {
      name: "Numerical Reasoning & Data Analysis - What to Expect",
      video: "",
      duration: "1:00",
      section: 2,
    },
    {
      name: "Numerical Reasoning & Data Analysis - Practice Questions",
      video: "",
      duration: "1:00",
      section: 2,
    },

    {
      name: "EY, KPMG & Deloitte Aptitude Test Review",
      video: "",
      duration: "1:00",
      section: 2,
    },
    {
      name: "PWC Aptitude Stage Overview",
      video: "",
      duration: "1:00",
      section: 3,
    },
    {
      name: "Career Unlocked - Games 1-3",
      video: "",
      duration: "1:00",
      section: 3,
    },
    {
      name: "Career Unlocked - Games 4-6",
      video: "",
      duration: "1:00",
      section: 3,
    },
    {
      name: "Career Unlocked - Games 7-8",
      video: "",
      duration: "1:00",
      section: 3,
    },
    {
      name: "Career Unlocked - Game 9",
      video: "",
      duration: "1:00",
      section: 3,
    },
    {
      name: "Numerical Reasoning Test",
      video: "",
      duration: "1:00",
      section: 3,
    },
    {
      name: "PWC Aptitude Test Review",
      video: "",
      duration: "1:00",
      section: 3,
    },
    {
      name: "Job Simulation Overview",
      video: "",
      duration: "1:00",
      section: 4,
    },
    {
      name: "Job Simulation Part 1 - HireVue Motivational Questions",
      video: "",
      duration: "1:00",
      section: 4,
    },
    {
      name: "Job Simulation Part 1 - HireVue Professional Questions",
      video: "",
      duration: "1:00",
      section: 4,
    },
    {
      name: "Job Simulation Part 1 - HireVue Review",
      video: "",
      duration: "1:00",
      section: 4,
    },
    {
      name: "Job Simulation Part 2 - Email Questions",
      video: "",
      duration: "1:00",
      section: 4,
    },
    {
      name: "Job Simulation Review",
      video: "",
      duration: "1:00",
      section: 4,
    },
    {
      name: "Assessment Centre Overview",
      video: "",
      duration: "1:00",
      section: 5,
    },
    {
      name: "Group Exercise",
      video: "",
      duration: "1:00",
      section: 5,
    },
    {
      name: "Individual Exercise",
      video: "",
      duration: "1:00",
      section: 5,
    },
    {
      name: "Individual Interview",
      video: "",
      duration: "1:00",
      section: 5,
    },
    {
      name: "Assessment Centre Review",
      video: "",
      duration: "1:00",
      section: 5,
    },
    {
      name: "Course Review",
      video: "",
      duration: "1:00",
      section: 6,
    },
  ],
};
