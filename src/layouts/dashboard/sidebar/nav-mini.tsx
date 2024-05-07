"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Drawer, List } from "@mui/material";

import { NavItems } from "./nav-items";

const NavMini = () => {
  const router = useRouter();

  if (!session) return null; // TODO: return skeleton

  const home = {
    name: "Home",
    href: "/",
    icon: (sx: SxProps) => (
      <Icon icon="ion:home" width="32" height="32" color="#BDBDBD" />
    ),
  };

  const admin = {
    name: "Admin",
    href: "/admin",
    icon: (sx: SxProps) => (
      <Icon icon="ri:admin-fill" width="32" height="32" color="#BDBDBD" />
    ),
  };

  const { courses: userCourses } = session.user;
  const courses = userCourses
    ? userCourses.map((course) => ({
        name: course,
        href: `/courses/${course}`,
        icon: (sx: SxProps) => (
          <Icon icon="mdi:briefcase" width="32" height="32" color="#BDBDBD" />
        ),
      }))
    : [];
  const links =
    courses.length > 0
      ? [
          {
            name: "Videos",
            href: "/video/consulting",
            icon: (sx: SxProps) => (
              <Icon
                icon="material-symbols:video-library-rounded"
                width="32"
                height="32"
                color="#BDBDBD"
              />
            ),
          },
          {
            name: "Tests",
            href: "/tests",
            icon: (sx: SxProps) => (
              <Icon
                icon="healthicons:i-exam-multiple-choice"
                width="32"
                height="32"
                color="#BDBDBD"
              />
            ),
          },
          {
            name: "Resources",
            href: "/resources",
            icon: (sx: SxProps) => (
              <Icon
                icon="icon-park-solid:folder-one"
                width="32"
                height="32"
                color="#BDBDBD"
              />
            ),
          },
        ]
      : [];

  return (
    <Drawer variant="permanent">
      <Image
        src="/logos/small-logo.png"
        alt="Gradguru logo"
        width={55}
        height={55}
        priority
        style={{ margin: "2 auto 2rem", display: "block", cursor: "pointer" }}
        onClick={() => router.push("/dashboard")}
      />
      <List>
        <NavItems />
      </List>
    </Drawer>
  );
};

export default NavMini;
