import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import AddIcon from "@mui/icons-material/Add";
import QuizIcon from "@mui/icons-material/Quiz";
import AbcIcon from "@mui/icons-material/Abc";
import HardwareIcon from "@mui/icons-material/Hardware";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import GroupIcon from "@mui/icons-material/Group";
import PinIcon from "@mui/icons-material/Pin";
import ExtensionIcon from "@mui/icons-material/Extension";

export const sidebarSections = [
  {
    name: "Courses",
    icon: <GolfCourseIcon />,
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
    active: true,
    children: [
      {
        name: "SJT",
        icon: <AbcIcon />,
        active: true,
        children: [
          {
            name: "All SJT",
            icon: <AllInclusiveIcon />,
            route: "/admin/tests/sjt/all",
            active: true,
          },
          {
            name: "Add SJT",
            icon: <AddIcon />,
            route: "/admin/tests/sjt/add",
            active: true,
          },
        ],
      },
      {
        name: "NR",
        icon: <PinIcon />,
        active: true,
        children: [
          {
            name: "All NR",
            icon: <AllInclusiveIcon />,
            route: "/admin/tests/numerical-reasoning/all",
            active: true,
          },
          {
            name: "Add NR",
            icon: <AddIcon />,
            route: "/admin/tests/numerical-reasoning/add",
            active: true,
          },
        ],
      },
      {
        name: "LR",
        icon: <ExtensionIcon />,
        active: false,
        children: [
          {
            name: "All LR",
            icon: <AllInclusiveIcon />,
            route: "/admin/tests/logical-reasoning/all",
            active: true,
          },
          {
            name: "Add LR",
            icon: <AddIcon />,
            route: "/admin/tests/logical-reasoning/add",
            active: true,
          },
        ],
      },
    ],
  },
  {
    name: "Drills",
    icon: <HardwareIcon />,
    active: false,
    children: [],
  },
  {
    name: "Resources",
    icon: <ViewInArIcon />,
    active: false,
    children: [],
  },
  {
    name: "Users",
    icon: <GroupIcon />,
    active: false,
    children: [],
  },
];
