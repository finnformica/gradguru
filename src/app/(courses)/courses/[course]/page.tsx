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
  const { course, setCourse } = useCourse();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!course) {
      setCourse(consultingCourse);
      return;
    }
  }, []);

  if (!user) {
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
