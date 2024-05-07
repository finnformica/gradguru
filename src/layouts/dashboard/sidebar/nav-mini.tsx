"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Box,
  List,
  ListItemButton,
  Stack,
  SxProps,
  Tooltip,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { Icon } from "@iconify/react";
import AuthButton from "../header/auth-button";

const NavMini = ({ width }: { width: number }) => {
  const { data: session } = useSession();
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
    <Box
      position="fixed"
      component="nav"
      textAlign={"center"}
      sx={{
        height: "100vh",
        width: `${width}px`,
        zIndex: (theme) => theme.zIndex.appBar + 1,
        pt: 1.5,
        px: 0.5,
        borderRight: (theme) => `1px dashed ${theme.palette.divider}`,
        backdropFilter: "blur(10px)",
      }}
    >
      <Stack
        direction={"column"}
        justifyContent={"space-between"}
        sx={{ height: "100%" }}
      >
        <Stack>
          <Image
            src="/logos/small-logo.png"
            alt="Gradguru logo"
            width={55}
            height={55}
            priority
            style={{
              margin: "0 auto 2rem",
              display: "block",
              cursor: "pointer",
            }}
            onClick={() => router.push("/dashboard")}
          />
          <List disablePadding>
            <NavListItem item={home} key="home" />
            {courses.length > 0 &&
              courses &&
              [...courses, ...links].map((item: any) => (
                <NavListItem item={item} key={item.name} />
              ))}
            {session.user.role > 1 && <NavListItem key="admin" item={admin} />}
          </List>
        </Stack>
        <AuthButton />
      </Stack>
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

  const path = href !== "/admin" ? `/dashboard/${href}` : href;

  return (
    <Tooltip title={_.startCase(name)} placement="right">
      <ListItemButton
        key={name}
        disableGutters
        onClick={() => router.push(path)}
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
    </Tooltip>
  );
};

export default NavMini;
