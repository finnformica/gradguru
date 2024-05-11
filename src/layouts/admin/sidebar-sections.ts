export const sidebarSections = [
  {
    name: "Courses",
    icon: "mdi:golf",
    active: true,
    children: [
      {
        name: "All Courses",
        icon: "ep:files",
        route: "/admin/courses/all",
        active: true,
      },
      {
        name: "Add Course",
        icon: "fluent:add-square-24-regular",
        route: "/admin/courses/add",
        active: true,
      },
    ],
  },
  {
    name: "Blog",
    icon: "ri:article-fill",
    active: true,
    children: [
      {
        name: "All Posts",
        icon: "ep:files",
        route: "/admin/blog/all",
        active: true,
      },
      {
        name: "Add Post",
        icon: "fluent:add-square-24-regular",
        route: "/admin/blog/add",
        active: true,
      },
    ],
  },
  {
    name: "Tests",
    icon: "healthicons:i-exam-multiple-choice",
    active: true,
    children: [
      {
        name: "SJT",
        icon: "mdi:head-thinking-outline",
        active: true,
        children: [
          {
            name: "All questions",
            icon: "ep:files",
            route: "/admin/questions/situational-judgement/all",
            active: true,
          },
          {
            name: "Add question",
            icon: "fluent:add-square-24-regular",
            route: "/admin/questions/situational-judgement/add",
            active: true,
          },
          {
            name: "All tests",
            icon: "ep:files",
            route: "/admin/tests/situational-judgement/all",
            active: true,
          },
          {
            name: "Add test",
            icon: "fluent:add-square-24-regular",
            route: "/admin/tests/situational-judgement/add",
            active: true,
          },
        ],
      },
      {
        name: "NR",
        icon: "fluent-emoji-high-contrast:input-numbers",
        active: true,
        children: [
          {
            name: "All questions",
            icon: "ep:files",
            route: "/admin/questions/numerical-reasoning/all",
            active: true,
          },
          {
            name: "Add question",
            icon: "fluent:add-square-24-regular",
            route: "/admin/questions/numerical-reasoning/add",
            active: true,
          },
          {
            name: "All tests",
            icon: "ep:files",
            route: "/admin/tests/numerical-reasoning/all",
            active: true,
          },
          {
            name: "Add test",
            icon: "fluent:add-square-24-regular",
            route: "/admin/tests/numerical-reasoning/add",
            active: true,
          },
        ],
      },
      {
        name: "LR",
        icon: "streamline:module-puzzle-3",
        active: true,
        children: [
          {
            name: "All questions",
            icon: "ep:files",
            route: "/admin/tests/logical-reasoning/all",
            active: true,
          },
          {
            name: "Add question",
            icon: "fluent:add-square-24-regular",
            route: "/admin/tests/logical-reasoning/add",
            active: true,
          },
          {
            name: "All tests",
            icon: "ep:files",
            route: "/admin/tests/logical-reasoning/all",
            active: true,
          },
          {
            name: "Add test",
            icon: "fluent:add-square-24-regular",
            route: "/admin/tests/logical-reasoning/add",
            active: true,
          },
        ],
      },
    ],
  },
  {
    name: "Drills",
    icon: "material-symbols:tools-power-drill",
    active: true,
    children: [
      {
        name: "Hirevue",
        icon: "material-symbols-light:computer-outline",
        active: true,
        children: [
          {
            name: "All questions",
            icon: "ep:files",
            route: "/admin/drills/hirevue/all",
            active: true,
          },
          {
            name: "Add question",
            icon: "fluent:add-square-24-regular",
            route: "/admin/drills/hirevue/add",
            active: true,
          },
        ],
      },
    ],
  },
  {
    name: "Resources",
    icon: "icon-park-solid:folder-one",
    active: true,
    children: [
      {
        name: "All resources",
        icon: "ep:files",
        route: "/admin/resources/all",
        active: true,
      },
      {
        name: "Add resources",
        icon: "fluent:add-square-24-regular",
        route: "/admin/resources/add",
        active: true,
      },
    ],
  },
  {
    name: "Users",
    icon: "ph:users-four-fill",
    route: "/admin/users",
    active: true,
  },
  // leave this last
  {
    name: "Dashboard",
    icon: "streamline:dashboard-3-solid",
    route: "/dashboard",
    active: true,
  },
];
