import { Box, Stack, Typography } from "@mui/material";
import UnderlineButton from "../common/underline-button";
import { useState } from "react";
import { SJQuestionFlat } from "types";

type TestSolutionProps = {
  currentStep: number;
  questions: SJQuestionFlat[];
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
          {questions[currentStep].type === "multiple" ? (
            <Typography variant="body1">
              Correct answer: {questions[currentStep].answer}
            </Typography>
          ) : (
            <Box>
              <Typography variant="body1">Correct order:</Typography>
              <Stack spacing={1} p={2}>
                {questions[currentStep].options.map(
                  (option: string, index: number) => (
                    <Typography key={option} variant="body1">
                      {index + 1}. {option}
                    </Typography>
                  )
                )}
              </Stack>
            </Box>
          )}
          <Typography variant="body1">
            {questions[currentStep].explanation}
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default TestSolution;
