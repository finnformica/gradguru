import { Container, useTheme, useMediaQuery } from "@mui/material";
import React from "react";

import FullWidthContainer from "../Containers/FullWidthContainer";
import SmallTitle from "../Titles/SmallTitle";
import Image from "next/image";
import BulletPoints from "../Global/BulletPoints";

import points from "./points";

const AssessmentCentre = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <FullWidthContainer sx={{ mt: 12 }}>
      <SmallTitle>Assessment Centre</SmallTitle>
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
          width={!isMobile ? 500 : 350}
          height={!isMobile ? 350 : 200}
          style={{ objectFit: "cover", borderRadius: 4 }}
        />
        <BulletPoints points={points} container={{ gap: 1 }} />
      </Container>
    </FullWidthContainer>
  );
};

export default AssessmentCentre;
