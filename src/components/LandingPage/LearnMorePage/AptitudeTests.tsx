"use client";

import { Container } from "@mui/material";

import SmallTitle from "@/components/LandingPage/Titles/SmallTitle";
import ContainerTitle from "@/components/LandingPage/Titles/ContainerTitle";
import ColouredContainer from "@/components/LandingPage/Containers/ColouredContainer";
import FeaturesList from "@/components/LandingPage/FeaturesList";
import CustomAccordion from "@/components/LandingPage/CustomAccordion";

const accordionItems = [
  {
    title: "30+ Practice Tests",
    description:
      "Over 30 SJT, Logical reasoning and mathematical tests in preparation for the aptitude stage of the application process.",
  },
  {
    title: "20+ Practice Videos",
    description:
      "20+ videos of aptitude test explanation and practice question walkthrough videos.",
  },
  {
    title: "PWC Game-Based Assessment",
    description:
      "A 10 part document and video resource analysing how to complete the first stage of the PWC application process.",
  },
];

const features = [
  {
    title: "Situational Judgement",
    description:
      "Prepare for SJT tests so that you know how to act in different work based scenarios.",
    src: "icons/feature-icons/conversation.svg",
  },
  {
    title: "Mathematical Reasoning",
    description:
      "Analyse data and compute mathematical questions quickly and accurately in order to advance you to the next stage of the application process.",
    src: "icons/feature-icons/calculator.svg",
  },
  {
    title: "Verbal & Non-Verbal Reasoning",
    description:
      "Effectively recognise visual and verbal patterns and information to get the edge in your application.",
    src: "icons/feature-icons/paper.svg",
  },
];

const Footer = () => {
  return (
    <>
      <SmallTitle sx={{ textAlign: "center", pt: 4 }}>
        What's Included?
      </SmallTitle>
      <CustomAccordion items={accordionItems} />
    </>
  );
};

const AptitudeTests = () => {
  return (
    <Container maxWidth="xl">
      <ColouredContainer sx={{ mb: 8 }}>
        <ContainerTitle title="Aptitude Tests" maxWidth="450px">
          Discover what influences application screening decisions. Understand
          the role of networking. And supercharge your odds of earning an
          interview, whether you're a student, MBA candidate, or experienced
          professional.
        </ContainerTitle>
        <FeaturesList features={features} />
        <Footer />
      </ColouredContainer>
    </Container>
  );
};

export default AptitudeTests;