"use client";

import Link from "next/link";
import React from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import QuizIcon from "@mui/icons-material/Quiz";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";

import { CourseType } from "types";

const Title = ({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactElement;
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 1,
      mb: 1,
    }}
  >
    {icon && icon}
    <Typography variant="h5">{children}</Typography>
  </Box>
);

const AccordionCard = ({ title, href }: { title: string; href: string }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      gap: 1,
      p: 2,
      border: (theme) => `1px solid ${theme.palette.grey[300]}`,
      backgroundColor: "grey.50",
      borderRadius: "10px",
      "&:hover": {
        cursor: "pointer",
        borderColor: "primary.main",
        backgroundColor: "#f1f8e9",
        transition: "all 0.2s ease-in-out",
      },
    }}
  >
    <Link href={href}>
      <Typography>{title}</Typography>
    </Link>
  </Box>
);

export const CourseAccordion = ({ ...course }: CourseType) => {
  return (
    <Accordion
      disabled={!course.active}
      elevation={2}
      sx={{ width: { xs: "100%", md: "80%" } }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography variant="h4">{course.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: "flex", gap: 4, flexDirection: "column", m: 2 }}>
          <Box>
            <Title icon={<SmartDisplayIcon />}>Videos</Title>
            <Box sx={{ display: "flex", gap: 1 }}>
              {course.lessons.slice(0, 3).map((lesson, key) => (
                <AccordionCard
                  title={lesson.name}
                  key={key}
                  href={`/dashboard/courses/${course.id}`}
                />
              ))}
            </Box>
          </Box>
          <Box>
            <Title icon={<QuizIcon />}>Tests</Title>
            <Box sx={{ display: "flex", gap: 1 }}>
              {course.tests.map((test, key) => (
                <AccordionCard
                  key={key}
                  title={test.title}
                  href={`/dashboard/tests/${test.id}`}
                />
              ))}
            </Box>
          </Box>
          <Box>
            <Title icon={<FactCheckIcon />}>Drills</Title>
            <Box sx={{ display: "flex", gap: 1 }}>
              {course.drills.map((drill, key) => (
                <AccordionCard key={key} title={drill.title} href={""} />
              ))}
            </Box>
          </Box>
          <Box>
            <Title icon={<FolderCopyIcon />}>Resources</Title>
            <Box sx={{ display: "flex", gap: 1 }}>
              {course.resources.map((resource, key) => (
                <AccordionCard key={key} title={resource.title} href={""} />
              ))}
            </Box>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
