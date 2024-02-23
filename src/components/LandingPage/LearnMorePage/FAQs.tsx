"use client";

import React from "react";
import { Box, useTheme, Container } from "@mui/material";

import SmallTitle from "@/components/LandingPage/Titles/SmallTitle";
import CustomAccordion from "@/components/LandingPage/CustomAccordion";
import ColouredContainer from "@/components/LandingPage/Containers/ColouredContainer";
import FullWidthContainer from "@/components/LandingPage/Containers/FullWidthContainer";

const questions = [
  {
    title: "What Courses Can I Get Access To?",
    description:
      "At the moment we are operating solely for big four recruitment, however, we intend to expand to other major grad intake industries such as investment banking, legal and many others. Sign up to the gradguru newsletter to be informed of when these new courses will be available.",
  },
  {
    title: "How Long Do I Have Access to the Course?",
    description:
      "Once you pay for the course, you will receive access to all of the courses resources for 12 months.",
  },
];

const QuestionsAccordion = () => {
  return (
    <Container
      sx={{
        backgroundColor: "transparent",
        position: "absolute",
        bottom: -50,
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <ColouredContainer sx={{ backgroundColor: "#FFF", p: "2.5rem 0 4rem" }}>
        <SmallTitle sx={{ textAlign: "center", pb: 2 }}>
          Frequently Asked Questions
        </SmallTitle>
        <CustomAccordion items={questions} />
      </ColouredContainer>
    </Container>
  );
};

const BackgroundColours = () => {
  const theme = useTheme();

  return (
    <>
      <FullWidthContainer
        sx={{
          height: "25%",
          backgroundColor: theme.palette.secondary.light,
        }}
      ></FullWidthContainer>
      <FullWidthContainer
        sx={{
          height: "75%",
          backgroundColor: theme.palette.secondary.dark,
        }}
      ></FullWidthContainer>
    </>
  );
};

const FAQs = () => {
  return (
    <Box sx={{ position: "relative", height: "300px", mb: 4 }}>
      <QuestionsAccordion />
      <BackgroundColours />
    </Box>
  );
};

export default FAQs;
