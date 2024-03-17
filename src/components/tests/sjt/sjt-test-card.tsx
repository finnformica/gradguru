"use client";

import { Controller } from "react-hook-form";
import { Card, Stack, Typography } from "@mui/material";

import { useStepsForm } from "hooks/useStepsForm";

import CardActions from "./card-actions";
import CardHeader from "./card-header";
import MultipleChoice from "./multiple-choice";
import RankOrder from "./rank-order";
import TestSolution from "./test-solution";

type SJTTestCardProps = {
  questions: any[];
  handleEndTest: (data: any) => void;
};

const SJTTestCard = ({ questions, handleEndTest }: SJTTestCardProps) => {
  const { handleSubmit, currentStep, gotoStep, control, setValue } =
    useStepsForm({
      isBackValidate: false,
      initialStep: 0,
    });

  const handleRankOrderChange = (newOptions: string[]) =>
    setValue(currentStep.toString(), newOptions);

  return (
    <form onSubmit={handleSubmit(handleEndTest)}>
      <Card sx={{ borderRadius: 6, height: "100%", position: "relative" }}>
        <CardHeader
          questions={questions}
          gotoStep={gotoStep}
          currentStep={currentStep}
        />
        <Stack p={6} spacing={4}>
          <Stack spacing={2} mb={4}>
            <Typography variant="h5">Question {currentStep + 1}</Typography>
            <Typography variant="body1">
              {questions[currentStep].scenario}
            </Typography>
            <Typography variant="body1">
              {questions[currentStep].question}
            </Typography>
          </Stack>
          {questions.map(
            (question, index) =>
              index === currentStep &&
              (question.type === "multiple" ? (
                <Controller
                  key={index}
                  name={currentStep.toString()}
                  control={control}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <MultipleChoice
                      setAnswer={onChange}
                      answer={value}
                      options={questions[currentStep].options}
                      error={!!error}
                      helperText={!!error && "Answer is required"}
                    />
                  )}
                />
              ) : (
                <Controller
                  key={index}
                  name={currentStep.toString()}
                  control={control}
                  render={() => (
                    <RankOrder
                      setOptions={handleRankOrderChange}
                      options={questions[currentStep].options}
                    />
                  )}
                />
              ))
          )}
          <TestSolution currentStep={currentStep} questions={questions} />
          <CardActions
            questions={questions}
            currentStep={currentStep}
            gotoStep={gotoStep}
          />
        </Stack>
      </Card>
    </form>
  );
};

export default SJTTestCard;
