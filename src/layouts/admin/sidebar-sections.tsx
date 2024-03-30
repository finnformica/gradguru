import {
  Abc,
  AddBox,
  AllInclusive,
  Book,
  Dashboard,
  Description,
  Extension,
  GolfCourse,
  Group,
  Hardware,
  LibraryBooks,
  Pin,
  ViewInAr,
} from "@mui/icons-material";

export const sidebarSections = [
  {
    name: "Courses",
    icon: <GolfCourse />,
    active: true,
    children: [
      {
        name: "All Courses",
        icon: <AllInclusive />,
        route: "/admin/courses/all",
        active: true,
      },
      {
        name: "Add Course",
        icon: <AddBox />,
        route: "/admin/courses/add",
        active: true,
      },
    ],
  },
  {
    name: "Blog",
    icon: <Book />,
    active: true,
    children: [
      {
        name: "All Posts",
        icon: <LibraryBooks />,
        route: "/admin/blog/all",
        active: true,
      },
      {
        name: "Add Post",
        icon: <AddBox />,
        route: "/admin/blog/add",
        active: true,
      },
    ],
  },
  {
    name: "Tests",
    icon: <Description />,
    active: true,
    children: [
      {
        name: "SJT",
        icon: <Abc />,
        active: true,
        children: [
          {
            name: "All questions",
            icon: <AllInclusive />,
            route: "/admin/questions/situational-judgement/all",
            active: true,
          },
          {
            name: "Add question",
            icon: <AddBox />,
            route: "/admin/questions/situational-judgement/add",
            active: true,
          },
          {
            name: "All tests",
            icon: <AllInclusive />,
            route: "/admin/tests/situational-judgement/all",
            active: true,
          },
          {
            name: "Add test",
            icon: <AddBox />,
            route: "/admin/tests/situational-judgement/add",
            active: true,
          },
        ],
      },
      {
        name: "NR",
        icon: <Pin />,
        active: true,
        children: [
          {
            name: "All questions",
            icon: <AllInclusive />,
            route: "/admin/questions/numerical-reasoning/all",
            active: true,
          },
          {
            name: "Add question",
            icon: <AddBox />,
            route: "/admin/questions/numerical-reasoning/add",
            active: true,
          },
          {
            name: "All tests",
            icon: <AllInclusive />,
            route: "/admin/tests/numerical-reasoning/all",
            active: true,
          },
          {
            name: "Add test",
            icon: <AddBox />,
            route: "/admin/tests/numerical-reasoning/add",
            active: true,
          },
        ],
      },
      {
        name: "LR",
        icon: <Extension />,
        active: false,
        children: [
          {
            name: "All LR",
            icon: <AllInclusive />,
            route: "/admin/tests/logical-reasoning/all",
            active: true,
          },
          {
            name: "Add LR",
            icon: <AddBox />,
            route: "/admin/tests/logical-reasoning/add",
            active: true,
          },
        ],
      },
    ],
  },
  {
    name: "Drills",
    icon: <Hardware />,
    active: false,
    children: [],
  },
  {
    name: "Resources",
    icon: <ViewInAr />,
    active: false,
    children: [],
  },
  {
    name: "Users",
    icon: <Group />,
    route: "/admin/users",
    active: true,
  },
  // leave this last
  {
    name: "Dashboard",
    icon: <Dashboard />,
    route: "/dashboard",
    active: true,
  },
];
