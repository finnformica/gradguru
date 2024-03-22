import {
  Abc,
  Add,
  AllInclusive,
  Dashboard,
  Extension,
  GolfCourse,
  Group,
  Hardware,
  Pin,
  Quiz,
  ViewInAr,
  BookmarkAdd,
  Book,
  CollectionsBookmark,
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
        icon: <Add />,
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
        name: "All Post",
        icon: <CollectionsBookmark />,
        route: "/admin/blog/all",
        active: true,
      },
      {
        name: "Add Post",
        icon: <BookmarkAdd />,
        route: "/admin/blog/add",
        active: true,
      },
    ],
  },
  {
    name: "Tests",
    icon: <Quiz />,
    active: true,
    children: [
      {
        name: "SJT",
        icon: <Abc />,
        active: true,
        children: [
          {
            name: "All SJT",
            icon: <AllInclusive />,
            route: "/admin/tests/sjt/all",
            active: true,
          },
          {
            name: "Add SJT",
            icon: <Add />,
            route: "/admin/tests/sjt/add",
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
            name: "All NR",
            icon: <AllInclusive />,
            route: "/admin/tests/numerical-reasoning/all",
            active: true,
          },
          {
            name: "Add NR",
            icon: <Add />,
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
            icon: <Add />,
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
