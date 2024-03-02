"use client";

import { notFound } from "next/navigation";

import { Box, Container } from "@mui/material";

import { useCourse } from "@/api/courses";
import {
  CourseDescription,
  VideoControls,
  VideoPlayer,
} from "@/components/CourseVideoPage";
import { LoadingScreen } from "@/components/global-components";
import { useCourse as useCourseContext } from "@/context/course";

type CoursePageProps = {
  params: { slug: string };
};

const CoursePage = ({ params }: CoursePageProps) => {
  const { setCourse } = useCourseContext();
  const { slug } = params;

  const { course, loading, error } = useCourse(slug);

  if (!course || loading) return <LoadingScreen />;

  if (error) {
    notFound();
  }

  setCourse(course);

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
