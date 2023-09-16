"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";

import { useAuth } from "@/context/auth";

import { consultingCourse } from "@/mock/courses";

type CoursePageProps = {
  params: { course: string };
};

const CoursePage = ({ params: { course } }: CoursePageProps) => {
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
    <Box
      sx={{
        // backgroundColor: (theme) => theme.palette.grey[100],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <video
        controls
        width="100%"
        title={`${consultingCourse.sections[0].lessons[0].name} - ${consultingCourse.sections[0].name} - ${consultingCourse.name}`}
        style={{
          aspectRatio: "16/9",
          border: "none",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <source src="/welcome-vid.mp4" type="video/mp4" />
      </video>
    </Box>
  );
};

export default CoursePage;
