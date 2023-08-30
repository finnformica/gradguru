"use client";

import { Container } from "@mui/material";

import ContainerTitle from "@/components/Titles/ContainerTitle";
import ColouredContainer from "@/components/Containers/ColouredContainer";

import FeaturesList from "@/components/Global/FeaturesList";
import features from "./features";
import Footer from "./Footer";

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
