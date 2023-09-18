"use client";

import { useEffect } from "react";
import { useRouter, notFound } from "next/navigation";

import { Container, Box } from "@mui/material";

import {
  VideoControls,
  CourseDescription,
  VideoPlayer,
} from "@/components/CoursePage";
import { useAuth } from "@/context/auth";
import { useCourse } from "@/context/course";

type CoursePageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const courses = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=courses`
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
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);

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
        console.log("Course not found");
        notFound();
      }

      // if course is found, set course in context
      setCourse(data);
    };

    fetchData().catch((err) => {
      console.log(err);
    });
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
