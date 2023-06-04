import { Container } from "@mui/material";
import React from "react";

import FullWidthContainer from "../Containers/FullWidthContainer";
import SmallTitle from "../Titles/SmallTitle";
import Image from "next/image";
import BulletPoints from "../Global/BulletPoints";

import points from "./points";

const AssessmentCentre = () => {
  return (
    <FullWidthContainer>
      <SmallTitle>Assessment centre</SmallTitle>
      <Container
        maxWidth="lg"
        sx={{
          py: 6,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-around",
          gap: 4,
        }}
      >
        <Image
          src="/imgs/learn-more/assessment-centre.jpeg"
          alt="Assessment centre image"
          width={500}
          height={350}
          style={{ objectFit: "cover", borderRadius: 4 }}
        />
        <BulletPoints points={points} container={{ gap: 1 }} />
      </Container>
    </FullWidthContainer>
  );
};

export default AssessmentCentre;
