"use client";

import React from "react";
import { Typography } from "@mui/material";
import { useAuth } from "../../../context/auth";

type CoursePageProps = {
  params: { course: string };
};

const CoursePage = ({ params }: CoursePageProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Typography>Please login to view this page</Typography>;
  }

  return <div>{params.course}</div>;
};

export default CoursePage;
