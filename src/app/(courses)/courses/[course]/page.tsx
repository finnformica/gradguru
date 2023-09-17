"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Container, Box, styled } from "@mui/material";

import {
  VideoControls,
  CourseDescription,
  VideoPlayer,
} from "@/components/CoursePage";
import { useAuth } from "@/context/auth";
import { useCourse } from "@/context/course";

import { consultingCourse } from "@/mock/courses";

import { AppHeader, DrawerHeader } from "@/components/Headers";
import { Sidebar } from "@/components/CoursePage";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

type CoursePageProps = {
  params: { slug: string };
};

const CoursePage = ({ params: { slug } }: CoursePageProps) => {
  // handle auth
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (!user) {
    return null;
  }

  // fetch course data
  const { course, setCourse } = useCourse();

  if (!course) {
    setCourse(consultingCourse);
    return null;
  }

  // handle drawer
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppHeader open={open} handleDrawerOpen={handleDrawerOpen} />
      <Main open={open}>
        <DrawerHeader />
        <Container maxWidth="lg" disableGutters>
          <Box>
            <VideoPlayer />
            <VideoControls />
          </Box>
          <CourseDescription />
        </Container>
      </Main>
      <Sidebar
        open={open}
        handleDrawerClose={handleDrawerClose}
        drawerWidth={drawerWidth}
      />
    </Box>
  );
};

export default CoursePage;
