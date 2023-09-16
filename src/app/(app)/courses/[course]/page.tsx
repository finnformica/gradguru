"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { Container, Box, Typography, Divider, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useAuth } from "@/context/auth";

import { consultingCourse as course } from "@/mock/courses";

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
  params: { slug: string };
};

const CoursePage = ({ params: { slug } }: CoursePageProps) => {
  const { user, loading } = useAuth();
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const lesson: number = Number(params.get("lesson")) || 0;
  const section: number = Number(params.get("section")) || 0;

  const handleVideoIncrement = () => {
    if (
      lesson >= course.sections[section].lessons.length - 1 &&
      section >= course.sections.length - 1
    ) {
      return;
    } else if (lesson >= course.sections[section].lessons.length - 1) {
      router.push(`${pathname}?section=${section + 1}&lesson=0`);
    } else {
      router.push(`${pathname}?section=${section}&lesson=${lesson + 1}`);
    }
  };

  const handleVideoDecrement = () => {
    if (lesson <= 0 && section <= 0) {
      return;
    } else if (lesson <= 0) {
      router.push(`${pathname}?section=${section - 1}&lesson=0`);
    } else {
      router.push(`${pathname}?section=${section}&lesson=${lesson - 1}`);
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
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          pt={1}
        >
          <IconButton onClick={handleVideoDecrement}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h4" fontSize={16}>
            <span style={{ fontWeight: 700 }}>
              {course.sections[section].name}:{" "}
            </span>
            {course.sections[section].lessons[lesson].name}
          </Typography>
          <IconButton onClick={handleVideoIncrement}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>
      <Box px={4} py={8}>
        <Typography variant="h4" fontWeight={500} pb={1}>
          About this course
        </Typography>
        <Typography variant="body1">{course.tag}</Typography>
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
          {course.description.main}
        </Typography>
      </Box>
      {bullets.map((item: BulletType, key1) => (
        <Box key={key1} px={4} py={2}>
          <Typography variant="h4" fontWeight={500} fontSize={18}>
            {item.title}
          </Typography>
          <ul>
            {(course.description as any)[item.item].map(
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
