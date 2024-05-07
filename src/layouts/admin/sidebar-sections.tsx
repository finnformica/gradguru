import { Icon } from "@iconify/react";

export const sidebarSections = [
  {
    name: "Courses",
    icon: <Icon icon="mdi:golf" width="32" height="32" />,
    active: true,
    children: [
      {
        name: "All Courses",
        icon: <Icon icon="ep:files" width="24" height="24" />,
        route: "/admin/courses/all",
        active: true,
      },
      {
        name: "Add Course",
        icon: (
          <Icon icon="fluent:add-square-24-regular" width="24" height="24" />
        ),
        route: "/admin/courses/add",
        active: true,
      },
    ],
  },
  {
    name: "Blog",
    icon: <Icon icon="ri:article-fill" width="32" height="32" />,
    active: true,
    children: [
      {
        name: "All Posts",
        icon: <Icon icon="ep:files" width="24" height="24" />,
        route: "/admin/blog/all",
        active: true,
      },
      {
        name: "Add Post",
        icon: (
          <Icon icon="fluent:add-square-24-regular" width="24" height="24" />
        ),
        route: "/admin/blog/add",
        active: true,
      },
    ],
  },
  {
    name: "Tests",
    icon: (
      <Icon icon="healthicons:i-exam-multiple-choice" width="32" height="32" />
    ),
    active: true,
    children: [
      {
        name: "SJT",
        icon: <Icon icon="mdi:head-thinking-outline" width="24" height="24" />,
        active: true,
        children: [
          {
            name: "All questions",
            icon: <Icon icon="ep:files" width="24" height="24" />,
            route: "/admin/questions/situational-judgement/all",
            active: true,
          },
          {
            name: "Add question",
            icon: (
              <Icon
                icon="fluent:add-square-24-regular"
                width="24"
                height="24"
              />
            ),
            route: "/admin/questions/situational-judgement/add",
            active: true,
          },
          {
            name: "All tests",
            icon: <Icon icon="ep:files" width="24" height="24" />,
            route: "/admin/tests/situational-judgement/all",
            active: true,
          },
          {
            name: "Add test",
            icon: (
              <Icon
                icon="fluent:add-square-24-regular"
                width="24"
                height="24"
              />
            ),
            route: "/admin/tests/situational-judgement/add",
            active: true,
          },
        ],
      },
      {
        name: "NR",
        icon: (
          <Icon
            icon="fluent-emoji-high-contrast:input-numbers"
            width="24"
            height="24"
          />
        ),
        active: true,
        children: [
          {
            name: "All questions",
            icon: <Icon icon="ep:files" width="24" height="24" />,
            route: "/admin/questions/numerical-reasoning/all",
            active: true,
          },
          {
            name: "Add question",
            icon: (
              <Icon
                icon="fluent:add-square-24-regular"
                width="24"
                height="24"
              />
            ),
            route: "/admin/questions/numerical-reasoning/add",
            active: true,
          },
          {
            name: "All tests",
            icon: <Icon icon="ep:files" width="24" height="24" />,
            route: "/admin/tests/numerical-reasoning/all",
            active: true,
          },
          {
            name: "Add test",
            icon: (
              <Icon
                icon="fluent:add-square-24-regular"
                width="24"
                height="24"
              />
            ),
            route: "/admin/tests/numerical-reasoning/add",
            active: true,
          },
        ],
      },
      {
        name: "LR",
        icon: <Icon icon="streamline:module-puzzle-3" width="24" height="24" />,
        active: false,
        children: [
          {
            name: "All LR",
            icon: <Icon icon="ep:files" width="24" height="24" />,
            route: "/admin/tests/logical-reasoning/all",
            active: true,
          },
          {
            name: "Add LR",
            icon: (
              <Icon
                icon="fluent:add-square-24-regular"
                width="24"
                height="24"
              />
            ),
            route: "/admin/tests/logical-reasoning/add",
            active: true,
          },
        ],
      },
    ],
  },
  {
    name: "Drills",
    icon: (
      <Icon icon="material-symbols:tools-power-drill" width="32" height="32" />
    ),
    active: false,
    children: [],
  },
  {
    name: "Resources",
    icon: <Icon icon="icon-park-solid:folder-one" width="32" height="32" />,
    active: false,
    children: [],
  },
  {
    name: "Users",
    icon: <Icon icon="ph:users-four-fill" width="32" height="32" />,
    route: "/admin/users",
    active: true,
  },
  // leave this last
  {
    name: "Dashboard",
    icon: <Icon icon="streamline:dashboard-3-solid" width="32" height="32" />,
    route: "/dashboard",
    active: true,
  },
];
