"use client";

import React from "react";
import { Typography } from "@mui/material";
import { useAuth } from "../../../context/auth";

type CoursePageProps = {
  params: { course: string };
};

const CoursePage = ({ params }: CoursePageProps) => {
  const { protectedPage } = useAuth();
  protectedPage();

  return <div>{params.course}</div>;
};

export default CoursePage;
