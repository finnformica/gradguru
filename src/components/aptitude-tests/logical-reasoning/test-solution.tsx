import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { ILRQuestion } from "types";
import UnderlineButton from "../common/underline-button";

type TestSolutionProps = {
  currentStep: number;
  questions: ILRQuestion[];
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
          <Typography variant="body1">
            Correct answer: {questions[currentStep].answer}
          </Typography>
          <Typography variant="body1">
            {questions[currentStep].explanation}
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default TestSolution;
