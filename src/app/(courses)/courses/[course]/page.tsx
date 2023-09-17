"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Container, Box } from "@mui/material";

import {
  VideoControls,
  CourseDescription,
  VideoPlayer,
} from "@/components/CoursePage";
import { useAuth } from "@/context/auth";
import { useCourse } from "@/context/course";

import { consultingCourse } from "@/mock/courses";

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

  return (
    <Container maxWidth="lg" disableGutters>
      <Box>
        <VideoPlayer />
        <VideoControls />
      </Box>
      <CourseDescription />
    </Container>
  );
};

export default CoursePage;
