"use client";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";

import { Box, Container, Typography } from "@mui/material";

import { useCourses } from "@/api/courses";
import { CourseAccordion } from "@/components/Dashboard/CourseAccordion";
import { LoadingScreen } from "@/components/global-components";
import { CourseType } from "@/components/globalTypes";

const Dashboard = () => {
  const { data: session } = useSession();

  const { courses, loading, error } = useCourses();

  if (error) return notFound();

  if (!session?.user.courses || loading) return <LoadingScreen />;

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
        {!courses?.length ? (
          <Typography pt={4}>You have no purchased courses</Typography>
        ) : (
          courses
            .filter((course: CourseType) =>
              session?.user.courses.includes(course.id)
            )
            .map((course, key) => <CourseAccordion key={key} {...course} />)
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
