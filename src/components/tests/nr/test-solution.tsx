import { useState } from "react";

import { Stack, Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";

import { ClientWrapper } from "components/global-components";

import UnderlineButton from "../underline-button";

type TestSolutionProps = {
  currentStep: number;
  questions: any[];
};

const TestSolution = ({ currentStep, questions }: TestSolutionProps) => {
  const [showSolution, setShowSolution] = useState(questions.map(() => false));

  return (
    <>
      <UnderlineButton
        label="Show the solution"
        onClick={() =>
          setShowSolution([
            ...showSolution.slice(0, currentStep),
            !showSolution[currentStep],
            ...showSolution.slice(currentStep + 1, showSolution.length),
          ])
        }
      />
      {showSolution[currentStep] && (
        <Stack spacing={2} mt={2}>
          {questions[currentStep].type !== "gmat" ? (
            <>
              <Typography variant="body1">
                Correct answer: {questions[currentStep].answer.value}
              </Typography>
              <Typography variant="body1">
                {questions[currentStep].explanation}
              </Typography>
            </>
          ) : (
            <ClientWrapper>
              <MathJax hideUntilTypeset={"first"}>
                {questions[currentStep].explanation}
              </MathJax>
            </ClientWrapper>
          )}
        </Stack>
      )}
    </>
  );
};

export default TestSolution;
