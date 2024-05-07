"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import { Typography } from "@mui/material";

import { WelcomePanel } from "components/global";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <WelcomePanel name={session?.user?.name || "Gradguru user"}>
      {session?.user?.courses?.length || 0 > 0 ? (
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
    </WelcomePanel>
  );
};

export default Dashboard;
