import React from "react";

import { Container } from "@mui/material";

import ColouredContainer from "../Containers/ColouredContainer";
import SmallTitle from "../Titles/SmallTitle";
import AccordionItem from "../Global/AccordionItem";

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
        <Container maxWidth="sm" sx={{ pt: 2 }}>
          {questions.map((item, key) => (
            <AccordionItem key={key} {...item} />
          ))}
        </Container>
      </ColouredContainer>
    </Container>
  );
};

export default QuestionsAccordion;
