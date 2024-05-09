import { useSession } from "next-auth/react";

import { NavListItem } from "./nav-list-item";
import NavSkeleton from "./nav-skeleton";

export const NavItems = () => {
  const { data: session } = useSession();

  if (!session) return <NavSkeleton count={6} />;

  const home = {
    name: "Home",
    href: "/",
    icon: "ion:home",
  };

  const admin = {
    name: "Admin",
    href: "/admin",
    icon: "ri:admin-fill",
  };

  const { courses: userCourses } = session.user;
  const courses = userCourses
    ? userCourses.map((course) => ({
        name: course,
        href: `/courses/${course}`,
        icon: "mdi:briefcase",
      }))
    : [];
  const links =
    courses.length > 0
      ? [
          {
            name: "Videos",
            href: "/video/consulting",
            icon: "material-symbols:video-library-rounded",
          },
          {
            name: "Tests",
            href: "/tests",
            icon: "healthicons:i-exam-multiple-choice",
          },
          {
            name: "Resources",
            href: "/resources",
            icon: "icon-park-solid:folder-one",
          },
        ]
      : [];

  return (
    <>
      <NavListItem item={home} key="home" />
      {courses.length > 0 &&
        courses &&
        [...courses, ...links].map((item: any) => (
          <NavListItem item={item} key={item.name} />
        ))}
      {session.user.role > 1 && <NavListItem key="admin" item={admin} />}
    </>
  );
};
