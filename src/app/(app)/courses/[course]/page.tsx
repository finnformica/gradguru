"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Container, Box } from "@mui/material";

import { VideoControls, CourseDescription } from "@/components/CoursePage";
import { useAuth } from "@/context/auth";

import { consultingCourse as course } from "@/mock/courses";

type CoursePageProps = {
  params: { slug: string };
};

const CoursePage = ({ params: { slug } }: CoursePageProps) => {
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

  return (
    <Container maxWidth="lg" disableGutters>
      <Box>
        <video
          controls
          width="100%"
          title={`${course.sections[0].lessons[0].name} - ${course.sections[0].name} - ${course.name}`}
          style={{
            aspectRatio: "16/9",
            border: "none",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <source src="/welcome-vid.mp4" type="video/mp4" />
        </video>
        <VideoControls />
      </Box>
      <CourseDescription />
    </Container>
  );
};

export default CoursePage;
