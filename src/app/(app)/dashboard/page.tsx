"use client";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";

import { Box, Container, Typography } from "@mui/material";

import { useCourses } from "api/courses";
import { CourseAccordion } from "components/Dashboard/CourseAccordion";
import { LoadingScreen, PageBreadcrumbs } from "components/global-components";
import { CourseType } from "components/globalTypes";

const Dashboard = () => {
  const { data: session } = useSession();

  const { courses, loading, error } = useCourses();

  if (error) return notFound();

  if (!session?.user || loading || !courses) return <LoadingScreen />;

  const userCourses = courses.filter((course: CourseType) =>
    session.user.courses.includes(course.id)
  );

  return (
    <Container maxWidth="xl">
      <PageBreadcrumbs
        header="Courses"
        links={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Courses" },
        ]}
      />

      {!userCourses.length ? (
        <Typography pt={4}>No courses available</Typography>
      ) : (
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
          {userCourses.map((course, key) => (
            <CourseAccordion key={key} {...course} />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
