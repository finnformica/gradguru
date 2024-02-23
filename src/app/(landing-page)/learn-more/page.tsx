"use client";

import {
  WelcomeVideo,
  AptitudeTests,
  Hirevue,
  AssessmentCentre,
  FAQs,
} from "@/components/LandingPage/LearnMorePage";
import Footer from "@/components/LandingPage/Footer";

const LearnMore = () => {
  return (
    <>
      <WelcomeVideo />
      <AptitudeTests />
      <Hirevue />
      <AssessmentCentre />
      <FAQs />
      <Footer />
    </>
  );
};

export default LearnMore;
