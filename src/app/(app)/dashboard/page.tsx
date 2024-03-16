"use client";
import { useSession } from "next-auth/react";

import { Box, Stack, Typography } from "@mui/material";

import { LoadingScreen } from "components/global-components";
import Image from "next/image";
import Link from "next/link";

const WelcomePanel = ({ name, courses }: { name: string; courses: any[] }) => (
  <Box
    sx={{
      backgroundColor: (theme) => theme.palette.primary.light,
      width: { xs: "100%", lg: "60%" },
      borderRadius: 10,
    }}
  >
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent={{ xs: "center", md: "space-between" }}
      alignItems={{ xs: "center", md: "normal" }}
    >
      <Stack spacing={2} pt={8} pl={{ xs: 0, md: 6 }}>
        <Typography variant="h5" fontWeight={300} gutterBottom>
          Welcome back, {name} 👋
        </Typography>

        {courses.length > 0 ? (
          <Typography variant="body2" fontWeight={200} gutterBottom>
            Your courses are available via the side navigation
          </Typography>
        ) : (
          <Typography
            variant="body2"
            fontWeight={200}
            gutterBottom
            maxWidth="400px"
          >
            You have no courses available, please visit the{" "}
            <Link
              href="/courses"
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              course page
            </Link>{" "}
            to enrol in a course.
          </Typography>
        )}
      </Stack>
      <Image
        src="/imgs/3d/dashboard.svg"
        alt="dashboard"
        width={300}
        height={300}
      />
    </Stack>
  </Box>
);

const Dashboard = () => {
  const { data: session } = useSession();

  if (!session?.user) return <LoadingScreen />;

  const { courses, name } = session.user;

  return <WelcomePanel name={name || ""} courses={courses} />;
};

export default Dashboard;
