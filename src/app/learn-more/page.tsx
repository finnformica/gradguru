"use client";

import AptitudeTests from "@/components/AptitudeTests";
import AssessmentCentre from "@/components/AssessmentCentre";
import FAQs from "@/components/FAQs";
import Hirevue from "@/components/Hirevue";
import WelcomeVideo from "@/components/WelcomeVideo";

const LearnMore = () => {
  return (
    <>
      <WelcomeVideo />
      <AptitudeTests />
      <Hirevue />
      <AssessmentCentre />
      <FAQs />
    </>
  );
};

export default LearnMore;
