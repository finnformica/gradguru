"use client";

import { notFound } from "next/navigation";
import { useEffect } from "react";

import { Box, Container } from "@mui/material";

import {
  CourseDescription,
  VideoControls,
  VideoPlayer,
} from "@/components/CourseVideoPage";
import { useCourse } from "@/context/course";

type CoursePageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const courses = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/firebase/document/ids?collection=courses`
  ).then((res) => res.json());

  return courses.map((course: string) => ({
    params: {
      slug: course,
    },
  }));
}

const CoursePage = ({ params }: CoursePageProps) => {
  const { slug } = params;
  const { setCourse } = useCourse();

  useEffect(() => {
    const fetchData = async () => {
      // retrieve course from database
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=courses&document=${slug}`
      )
        .then((res) => res.json())
        .then((res) => res.data);

      // if course is not found, redirect to 404
      if (!data) {
        notFound();
      }

      // if course is found, set course in context
      setCourse(data);
    };

    fetchData().catch((err) => {
      console.log(err);
    });
  }, [setCourse, slug]);

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
