"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import LoadingWrapper from "@/components/LoadingWrapper";

import { useAuth } from "@/context/auth";
import { CourseType } from "../globalTypes";

const CourseAccordion = ({ ...course }: CourseType) => {
  console.log(course);
  return (
    <Accordion disabled={!course.active} elevation={2}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography variant="h4">{course.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
          <Link href={`/dashboard/courses/${course.id}`}>
            <Box
              sx={{
                ":hover": {
                  transition: "all 0.2s ease-in-out",
                  color: "grey.600",
                },
              }}
            >
              <Typography variant="h5">Videos</Typography>
            </Box>
          </Link>
          <Box>
            <Typography variant="h5">Tests</Typography>
          </Box>
          <Box>
            <Typography variant="h5">Drills</Typography>
          </Box>
          <Box>
            <Typography variant="h5">Resources</Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
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
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      // retrieve user courses from database
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=users&document=${user.uid}`
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

    if (user) {
      fetchUserData();
    }
  }, [user]);

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
        <LoadingWrapper loading={loading} size={40}>
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
