import React from "react";

import { Container } from "@mui/material";

import ColouredContainer from "../Containers/ColouredContainer";
import SmallTitle from "../Titles/SmallTitle";
import CustomAccordion from "../Global/CustomAccordion";

import questions from "./questions";

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
          Frequently asked questions
        </SmallTitle>
        <CustomAccordion items={questions} />
      </ColouredContainer>
    </Container>
  );
};

export default QuestionsAccordion;
