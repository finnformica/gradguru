"use client";

import {
  Box,
  List,
  ListItemButton,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";

import {
  FilePresent,
  Home,
  Mail,
  Quiz,
  VideoLibrary,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const NavMini = ({ width }: { width: number }) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return null;

  const home = {
    name: "Home",
    href: "/",
    icon: (sx: SxProps) => <Home sx={sx} />,
  };

  const { courses: userCourses } = session.user;
  const courses = userCourses
    ? userCourses.map((course) => ({
        name: course,
        href: `/courses/${course}`,
        icon: (sx: SxProps) => <Mail sx={sx} />,
      }))
    : [];
  const videos =
    courses.length > 0
      ? [
          {
            name: "Consulting videos",
            href: "/video/consulting",
            icon: (sx: SxProps) => <VideoLibrary sx={sx} />,
          },
        ]
      : [];
  const tests =
    courses.length > 0
      ? [
          {
            name: "Situational Judgement",
            href: "/tests/sjt",
            icon: (sx: SxProps) => <Quiz sx={sx} />,
          },
          {
            name: "Numerical Reasoning",
            href: "/tests/nr",
            icon: (sx: SxProps) => <Quiz sx={sx} />,
          },
          {
            name: "Logical Reasoning",
            href: "/tests/lr",
            icon: (sx: SxProps) => <Quiz sx={sx} />,
          },
        ]
      : [];
  const resources =
    courses.length > 0
      ? [
          {
            name: "resource1",
            href: "/resources",
            icon: (sx: SxProps) => <FilePresent sx={sx} />,
          },
          {
            name: "resource2",
            href: "/resources",
            icon: (sx: SxProps) => <FilePresent sx={sx} />,
          },
        ]
      : [];

  return (
    <Box
      position="fixed"
      component="nav"
      sx={{
        height: "100vh",
        width: `${width}px`,
        zIndex: 1100,
        pt: 1.5,
        px: 0.5,
        borderRight: (theme) => `1px dashed ${theme.palette.divider}`,
      }}
    >
      <Image
        src="/logos/small-logo.png"
        alt="Gradguru logo"
        width={55}
        height={55}
        priority
        style={{ margin: "0 auto 2rem", display: "block", cursor: "pointer" }}
        onClick={() => router.push("/dashboard")}
      />
      <List disablePadding>
        <NavListItem item={home} key="home" />
        {courses.length > 0 &&
          courses &&
          [courses, videos, tests, resources].map((section: any) =>
            section.map((item: any) => (
              <NavListItem item={item} key={item.name} />
            ))
          )}
      </List>
    </Box>
  );
};

const NavListItem = ({
  item,
}: {
  item: {
    name: string;
    href: string;
    icon: (sx: SxProps) => React.ReactElement;
  };
}) => {
  const router = useRouter();

  const { name, href, icon } = item;

  return (
    <ListItemButton
      key={name}
      disableGutters
      onClick={() => router.push(`/dashboard/${href}`)}
    >
      <Stack
        spacing={1}
        justifyContent="center"
        alignItems="center"
        mx="auto"
        maxWidth="100%"
      >
        {icon({ color: "grey.400" })}
        <Typography
          variant="body2"
          fontSize={12}
          color="text.secondary"
          textTransform="capitalize"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
          width="100%"
        >
          {name}
        </Typography>
      </Stack>
    </ListItemButton>
  );
};

export default NavMini;