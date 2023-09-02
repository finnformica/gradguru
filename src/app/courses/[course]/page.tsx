"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";
import { useAuth } from "../../../context/auth";

type CoursePageProps = {
  params: { course: string };
};

const CoursePage = ({ params }: CoursePageProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading]);

  if (!user) {
    return null;
  }

  return <div>{params.course}</div>;
};

export default CoursePage;
