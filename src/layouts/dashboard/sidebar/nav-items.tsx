import {
  AdminPanelSettings,
  FilePresent,
  Home,
  Mail,
  Quiz,
  VideoLibrary,
} from "@mui/icons-material";
import { List, SxProps } from "@mui/material";
import { useSession } from "next-auth/react";
import { NavListItem } from "./nav-list-item";
import NavSkeleton from "./nav-skeleton";

export const NavItems = () => {
  const { data: session } = useSession();

  if (!session) return <NavSkeleton count={6} />; // TODO: return skeleton

  const home = {
    name: "Home",
    href: "/",
    icon: (sx: SxProps) => <Home sx={sx} />,
  };

  const admin = {
    name: "Admin",
    href: "/admin",
    icon: (sx: SxProps) => <AdminPanelSettings sx={sx} />,
  };

  const { courses: userCourses } = session.user;
  const courses = userCourses
    ? userCourses.map((course) => ({
        name: course,
        href: `/courses/${course}`,
        icon: (sx: SxProps) => <Mail sx={sx} />,
      }))
    : [];
  const links =
    courses.length > 0
      ? [
          {
            name: "Videos",
            href: "/video/consulting",
            icon: (sx: SxProps) => <VideoLibrary sx={sx} />,
          },
          {
            name: "Tests",
            href: "/tests",
            icon: (sx: SxProps) => <Quiz sx={sx} />,
          },
          {
            name: "Resources",
            href: "/resources",
            icon: (sx: SxProps) => <FilePresent sx={sx} />,
          },
        ]
      : [];

  return (
    <List disablePadding>
      <NavListItem item={home} key="home" />
      {courses.length > 0 &&
        courses &&
        [...courses, ...links].map((item: any) => (
          <NavListItem item={item} key={item.name} />
        ))}
      {session.user.role > 1 && <NavListItem key="admin" item={admin} />}
    </List>
  );
};
