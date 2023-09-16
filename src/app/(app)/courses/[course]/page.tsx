"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Box, Typography, Divider } from "@mui/material";

import { useAuth } from "@/context/auth";

import { consultingCourse } from "@/mock/courses";

type BulletType = {
  title: string;
  item: string;
};

const bullets: BulletType[] = [
  {
    title: "What you'll learn",
    item: "learn",
  },
  {
    title: "Are there any course requirements or prerequisites?",
    item: "prerequisites",
  },
  {
    title: "Who this course is for:",
    item: "who",
  },
];

type CoursePageProps = {
  params: { course: string };
};

const CoursePage = ({ params: { course } }: CoursePageProps) => {
  const { user, loading } = useAuth();
  const [videoState, setVideoState] = useState({
    section: 0,
    lesson: 0,
  });
  const router = useRouter();

  const handleVideoIncrement = () => {
    if (
      videoState.lesson ===
      consultingCourse.sections[videoState.lesson].lessons.length
    ) {
      setVideoState({
        section: videoState.section + 1,
        lesson: 0,
      });
    } else {
      setVideoState({
        ...videoState,
        lesson: videoState.lesson + 1,
      });
    }
  };

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
      <video
        controls
        width="100%"
        title={`${
          consultingCourse.sections[videoState.section].lessons[
            videoState.lesson
          ].name
        } - ${consultingCourse.sections[0].name} - ${consultingCourse.name}`}
        style={{
          aspectRatio: "16/9",
          border: "none",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <source src="/welcome-vid.mp4" type="video/mp4" />
      </video>
      <Box px={4} py={8}>
        <Typography variant="h4" fontWeight={500} pb={1}>
          About this course
        </Typography>
        <Typography variant="body1">{consultingCourse.tag}</Typography>
      </Box>
      <Divider />
      <Box px={4} py={4}>
        <Typography variant="h4" fontWeight={500} fontSize={24} pb={2}>
          Description
        </Typography>
        <Typography
          variant="body1"
          component={"pre"}
          maxWidth={"100%"}
          sx={{
            whiteSpace: "pre-wrap",
          }}
        >
          {consultingCourse.description.main}
        </Typography>
      </Box>
      {bullets.map((item: BulletType, key1) => (
        <Box key={key1} px={4} py={2}>
          <Typography variant="h4" fontWeight={500} fontSize={18}>
            {item.title}
          </Typography>
          <ul>
            {(consultingCourse.description as any)[item.item].map(
              (bullet: string, key2: number) => (
                <li key={key2}>
                  <Typography>{bullet}</Typography>
                </li>
              )
            )}
          </ul>
        </Box>
      ))}
    </Container>
  );
};

export default CoursePage;
