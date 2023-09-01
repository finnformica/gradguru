import React from "react";

type CoursePageProps = {
  params: { course: string };
};

const CoursePage = ({ params }: CoursePageProps) => {
  return <div>{params.course}</div>;
};

export default CoursePage;
