"use client";

import Footer from "components/LandingPage/Footer";
import {
  AptitudeTests,
  AssessmentCentre,
  FAQs,
  Hirevue,
  WelcomeVideo,
} from "components/LandingPage/LearnMorePage";
import { Box } from "@mui/material";

const LearnMore = () => {
  return (
    <Box minWidth={"100vw"} pt={{ xs: 0, md: 4 }}>
      <WelcomeVideo />
      <AptitudeTests />
      <Hirevue />
      <AssessmentCentre />
      <FAQs />
      <Footer />
    </Box>
  );
};

export default LearnMore;
