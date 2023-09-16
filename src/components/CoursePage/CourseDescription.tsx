import React from "react";
import { Box, Typography, Divider } from "@mui/material";

import { consultingCourse as course } from "@/mock/courses";

type BulletType = {
  title: string;
  item: string;
};

const bullets: BulletType[] = [
  {
    title: "What you'll learn",
    item: "learn",
  },
  {
    title: "Are there any course requirements or prerequisites?",
    item: "prerequisites",
  },
  {
    title: "Who this course is for:",
    item: "who",
  },
];

const CourseDescription = () => {
  return (
    <>
      <Divider />
      <Box px={4} py={8}>
        <Typography variant="h4" fontWeight={500} pb={1}>
          About this course
        </Typography>
        <Typography variant="body1">{course.tag}</Typography>
      </Box>
      <Divider />
      <Box px={4} py={4}>
        <Typography variant="h4" fontWeight={500} fontSize={24} pb={2}>
          Description
        </Typography>
        <Typography
          variant="body1"
          component={"pre"}
          maxWidth={"100%"}
          sx={{
            whiteSpace: "pre-wrap",
          }}
        >
          {course.description.main}
        </Typography>
      </Box>
      {bullets.map((item: BulletType, key1) => (
        <Box key={key1} px={4} py={2}>
          <Typography variant="h4" fontWeight={500} fontSize={18}>
            {item.title}
          </Typography>
          <ul>
            {(course.description as any)[item.item].map(
              (bullet: string, key2: number) => (
                <li key={key2}>
                  <Typography>{bullet}</Typography>
                </li>
              )
            )}
          </ul>
        </Box>
      ))}
    </>
  );
};

export default CourseDescription;
