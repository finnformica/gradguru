import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import AddIcon from "@mui/icons-material/Add";
import QuizIcon from "@mui/icons-material/Quiz";
import AbcIcon from "@mui/icons-material/Abc";
import HardwareIcon from "@mui/icons-material/Hardware";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import GroupIcon from "@mui/icons-material/Group";

export const sidebarSections = [
  {
    name: "Courses",
    icon: <GolfCourseIcon />,
    route: "/admin/courses",
    active: true,
    children: [
      {
        name: "All Courses",
        icon: <AllInclusiveIcon />,
        route: "/admin/courses",
        active: true,
      },
      {
        name: "Add Course",
        icon: <AddIcon />,
        route: "/admin/courses",
        active: true,
      },
    ],
  },
  {
    name: "Tests",
    icon: <QuizIcon />,
    route: "/admin/tests",
    active: true,
    children: [
      {
        name: "SJT",
        icon: <AbcIcon />,
        route: "/admin/tests/sjt",
        active: true,
      },
    ],
  },
  {
    name: "Drills",
    icon: <HardwareIcon />,
    route: "/admin/drills",
    active: false,
    children: [],
  },
  {
    name: "Resources",
    icon: <ViewInArIcon />,
    route: "/admin/resources",
    active: false,
    children: [],
  },
  {
    name: "Users",
    icon: <GroupIcon />,
    route: "/admin/users",
    active: false,
    children: [],
  },
];
