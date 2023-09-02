"use client";

import React from "react";
import { Typography } from "@mui/material";
import { useAuth } from "../../../context/auth";

type CoursePageProps = {
  params: { course: string };
};

const CoursePage = ({ params }: CoursePageProps) => {
  const { user, protectedPage } = useAuth();
  protectedPage();

  if (!user) {
    return null;
  }

  return <div>{params.course}</div>;
};

export default CoursePage;
