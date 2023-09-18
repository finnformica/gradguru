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
      video: "consulting/Welcome_p4ko5t",
      duration: "02:02",
      section: 0,
    },
    {
      name: "Application Form Requirements",
      video: "consulting/Application_Forms_cdxzdb",
      duration: "01:49",
      section: 1,
    },
    {
      name: "Aptitude Tests - What to Expect",
      video: "consulting/aptitude_overview_ybxuud",
      duration: "00:52",
      section: 2,
    },
    {
      name: "Situational Judgement Tests - What to Expect",
      video: "consulting/SJT_Overview_ume3gj",
      duration: "01:27",
      section: 2,
    },
    {
      name: "Situational Judgement Tests - Common Questions (Part 1)",
      video: "consulting/SJT_Q1_tryt86",
      duration: "02:38",
      section: 2,
    },
    {
      name: "Situational Judgement Tests - Common Questions (Part 2)",
      video: "consulting/SJT_Q2_usmqyx",
      duration: "01:22",
      section: 2,
    },
    {
      name: "Numerical Reasoning & Data Analysis - What to Expect",
      video: "consulting/Numerical_Intro_-_Aptitude_tests_lrqv3p",
      duration: "00:52",
      section: 2,
    },
    {
      name: "Numerical Reasoning & Data Analysis - Practice Questions",
      video: "consulting/Numerical_Reasoning_hfk9fb",
      duration: "02:38",
      section: 2,
    },

    {
      name: "EY, KPMG & Deloitte Aptitude Test Review",
      video: "consulting/aptitude_recap_ghu9fz",
      duration: "01:39",
      section: 2,
    },
    {
      name: "PWC Aptitude Stage Overview",
      video: "consulting/PWC_game_based_overview_sltr6g",
      duration: "00:33",
      section: 3,
    },
    {
      name: "Career Unlocked - Games 1-3",
      video: "consulting/PWC_Games_1-3_bh7btt",
      duration: "01:52",
      section: 3,
    },
    {
      name: "Career Unlocked - Games 4-6",
      video: "consulting/Slides_Games_4-6_nhm9r4",
      duration: "02:26",
      section: 3,
    },
    {
      name: "Career Unlocked - Games 7-8",
      video: "consulting/PWC_games_7-8_tfyvlh",
      duration: "01:42",
      section: 3,
    },
    {
      name: "Career Unlocked - Game 9",
      video: "consulting/Logical_Reasoning_gmrt82",
      duration: "02:50",
      section: 3,
    },
    {
      name: "Numerical Reasoning Test",
      video: "consulting/PWC_Numeric_crvix7",
      duration: "03:41",
      section: 3,
    },
    {
      name: "PWC Aptitude Test Review",
      video: "consulting/PWC_Summary_g04cr9",
      duration: "01:15",
      section: 3,
    },
    {
      name: "Job Simulation Overview",
      video: "consulting/Job_Sim_intro_mglrnl",
      duration: "00:44",
      section: 4,
    },
    {
      name: "Job Simulation Part 1 - HireVue Motivational Questions",
      video: "consulting/HireVue_Motivational_hhzumz",
      duration: "04:45",
      section: 4,
    },
    {
      name: "Job Simulation Part 1 - HireVue Professional Questions",
      video: "consulting/Hirevue_professional_yaxiuh",
      duration: "03:20",
      section: 4,
    },
    {
      name: "Job Simulation Part 1 - HireVue Review",
      video: "consulting/Hirevue_recap_bjtlze",
      duration: "01:21",
      section: 4,
    },
    {
      name: "Job Simulation Part 2 - Email Questions",
      video: "consulting/Email_Questions_hustjo",
      duration: "02:54",
      section: 4,
    },
    {
      name: "Job Simulation Review",
      video: "consulting/Job_Sim_Summary_cpxof4",
      duration: "00:14",
      section: 4,
    },
    {
      name: "Assessment Centre Overview",
      video: "consulting/Assesment_Centre_ucyztw",
      duration: "00:41",
      section: 5,
    },
    {
      name: "Group Exercise",
      video: "consulting/Group_Exercise_droxma",
      duration: "03:49",
      section: 5,
    },
    {
      name: "Individual Exercise",
      video: "consulting/Individual_Exercise_h7lntb",
      duration: "02:00",
      section: 5,
    },
    {
      name: "Individual Interview",
      video: "consulting/Individual_Interview_f3oekm",
      duration: "01:29",
      section: 5,
    },
    {
      name: "Assessment Centre Review",
      video: "consulting/AC_Summary_ttfw1i",
      duration: "00:39",
      section: 5,
    },
    {
      name: "Course Review",
      video: "consulting/Outro_pwhhoo",
      duration: "01:07",
      section: 6,
    },
  ],
};
