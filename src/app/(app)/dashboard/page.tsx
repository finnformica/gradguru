"use client";

import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { CourseType } from "@/components/globalTypes";
import { useSession } from "next-auth/react";
import { CourseAccordion } from "@/components/Dashboard/CourseAccordion";
import { LoadingScreen, LoadingWrapper } from "@/components/global";

const Dashboard = () => {
  const [userCourses, setUserCourses] = useState<string[]>([]);
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  const user = session?.user;

  useEffect(() => {
    const fetchUserData = async () => {
      // retrieve user courses from database
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=users&document=${user!.id}`
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

    if (status === "authenticated" && user) {
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

    if (userCourses?.length) {
      fetchCourseData();
    }
  }, [userCourses]);

  if (!userCourses || loading) return <LoadingScreen />;

  return (
    <Container sx={{ pt: 4 }}>
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
        {!userCourses?.length ? (
          <Typography pt={4}>You have no purchased courses</Typography>
        ) : (
          courses.map((course, key) => (
            <CourseAccordion key={key} {...course} />
          ))
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
