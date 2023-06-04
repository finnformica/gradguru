import React from "react";
import { Box } from "@mui/material";
import BackgroundColours from "./BackgroundColours";
import QuestionsAccordion from "./QuestionsAccordion";

const FAQs = () => {
  const height = "300px";
  return (
    <Box sx={{ position: "relative", height }}>
      <QuestionsAccordion />

      <BackgroundColours />
    </Box>
  );
};

export default FAQs;
