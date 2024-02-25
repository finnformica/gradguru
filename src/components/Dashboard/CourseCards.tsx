"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import QuizIcon from "@mui/icons-material/Quiz";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";

import LoadingWrapper from "@/components/Global/LoadingWrapper";
import { CourseType } from "../globalTypes";
import { useSession } from "next-auth/react";

const Title = ({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactElement;
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 1,
      mb: 1,
    }}
  >
    {icon && icon}
    <Typography variant="h5">{children}</Typography>
  </Box>
);

const AccordionCard = ({ title, href }: { title: string; href: string }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      gap: 1,
      p: 2,
      border: (theme) => `1px solid ${theme.palette.grey[300]}`,
      backgroundColor: "grey.50",
      borderRadius: "10px",
      "&:hover": {
        cursor: "pointer",
        borderColor: "primary.main",
        backgroundColor: "#f1f8e9",
        transition: "all 0.2s ease-in-out",
      },
    }}
  >
    <Link href={href}>
      <Typography>{title}</Typography>
    </Link>
  </Box>
);

const CourseAccordion = ({ ...course }: CourseType) => {
  return (
    <Accordion
      disabled={!course.active}
      elevation={2}
      sx={{ width: { xs: "100%", md: "80%" } }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography variant="h4">{course.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: "flex", gap: 4, flexDirection: "column", m: 2 }}>
          <Box>
            <Title icon={<SmartDisplayIcon />}>Videos</Title>
            <Box sx={{ display: "flex", gap: 1 }}>
              {course.lessons.slice(0, 3).map((lesson, key) => (
                <AccordionCard
                  title={lesson.name}
                  key={key}
                  href={`/dashboard/courses/${course.id}`}
                />
              ))}
            </Box>
          </Box>
          <Box>
            <Title icon={<QuizIcon />}>Tests</Title>
            <Box sx={{ display: "flex", gap: 1 }}>
              {course.tests.map((test, key) => (
                <AccordionCard
                  key={key}
                  title={test.title}
                  href={`/dashboard/tests/${test.id}`}
                />
              ))}
            </Box>
          </Box>
          <Box>
            <Title icon={<FactCheckIcon />}>Drills</Title>
            <Box sx={{ display: "flex", gap: 1 }}>
              {course.drills.map((drill, key) => (
                <AccordionCard key={key} title={drill.title} href={""} />
              ))}
            </Box>
          </Box>
          <Box>
            <Title icon={<FolderCopyIcon />}>Resources</Title>
            <Box sx={{ display: "flex", gap: 1 }}>
              {course.resources.map((resource, key) => (
                <AccordionCard key={key} title={resource.title} href={""} />
              ))}
            </Box>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

const CourseCards = () => {
  const [userCourses, setUserCourses] = useState<string[]>([]);
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  const user = session?.user;

  useEffect(() => {
    const fetchUserData = async () => {
      // retrieve user courses from database
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=users&document=${user.id}`
      )
        .then((res) => res.json())
        .then((res) => res.data);

      // if course is not found
      if (!data) {
        console.log("Course not found");
      } else {
        setUserCourses(data.courses);
      }
      setLoading(false);
    };

    if (status === "authenticated") {
      fetchUserData();
    }
  }, [status, user]);

  useEffect(() => {
    const fetchCourseData = async () => {
      // retrieve all courses from database
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=courses`
      ).then((res) => res.json());

      // filter courses based on user subscription
      const filteredCourses = data.documents.filter((course: CourseType) =>
        userCourses.includes(course.id)
      );

      setCourses(filteredCourses);
    };

    if (userCourses.length > 0) {
      fetchCourseData();
    }
  }, [userCourses]);

  return (
    <>
      <Typography variant="h2" fontWeight={500}>
        Your Courses
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          my: 4,
        }}
      >
        <LoadingWrapper loading={loading}>
          {userCourses.length === 0 ? (
            <Typography>You have no purchased courses</Typography>
          ) : (
            courses.map((course, key) => (
              <CourseAccordion key={key} {...course} />
            ))
          )}
        </LoadingWrapper>
      </Box>
    </>
  );
};

export default CourseCards;
