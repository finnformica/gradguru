import React from "react";
import { Container, Box, Typography } from "@mui/material";

import ColouredContainer from "@/components/LandingPage/Containers/ColouredContainer";
import SquareButton from "@/components/LandingPage/Buttons/SquareButton";

import ContainerTitle from "@/components/LandingPage/Titles/ContainerTitle";
import FeaturesList from "@/components/LandingPage/FeaturesList";

const features = [
  {
    title: "Video Courses",
    description:
      "We'll walk you step by step through the application process of the company of your choice, and teach you what  the winning formula entails.",
    src: "icons/feature-icons/video.svg",
  },
  {
    title: "Practice Drills",
    description:
      "Practice drills relevant to your application process so that you're ready for when the application time comes.",
    src: "icons/feature-icons/test.svg",
  },
  {
    title: "Independent Practice Material",
    description:
      "Practice materials for you to use in your own time and to give you a competitive advantage.",
    src: "icons/feature-icons/head.svg",
  },
];

const Footer = () => {
  return (
    <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-around",
          pt: 6,
          pb: 2,
          gap: 4,
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", md: "60%" },
            textAlign: { xs: "center", md: "left" },
            mx: "auto",
          }}
        >
          <Typography variant="h5" fontWeight={500}>
            Explore the Courses
          </Typography>
          <Typography variant="body2" fontWeight={300}>
            Learn more about the different courses, course curriculum and our
            practice drills before you enroll.
          </Typography>
        </Box>
        <SquareButton href="/courses">Explore courses</SquareButton>
      </Box>
  );
};

const Features = () => {
  return (
    <Container maxWidth="xl">
      <ColouredContainer sx={{ mb: 8 }}>
        <ContainerTitle title="What We Do" maxWidth="350px">
          All the online resources you need for success in your job
          applications.
        </ContainerTitle>
        <FeaturesList features={features} />
        <Footer />
      </ColouredContainer>
    </Container>
  );
};
export default Features;
