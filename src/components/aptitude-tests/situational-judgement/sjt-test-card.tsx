"use client";

import { useState } from "react";
import { Controller } from "react-hook-form";

import { Card, Stack, Typography } from "@mui/material";

import { ConfirmationDialog } from "components/global-components";
import { useStepsForm } from "hooks/useStepsForm";

import CardActions from "../common/card-actions";
import CardHeader from "../common/card-header";
import MultipleChoice from "./multiple-choice";
import RankOrder from "./rank-order";
import TestSolution from "./test-solution";
import { SJQuestionFlat } from "types";

type SJTTestCardProps = {
  questions: SJQuestionFlat[];
  handleEndTest: (data: any) => void;
  testComplete: boolean;
  testLoading: boolean;
};

const SJTTestCard = ({
  questions,
  handleEndTest,
  testComplete,
  testLoading,
}: SJTTestCardProps) => {
  const [endTestDialogOpen, setEndTestDialogOpen] = useState(false);
  const { handleSubmit, currentStep, gotoStep, control, setValue } =
    useStepsForm({ isBackValidate: false, initialStep: 0 });

  const handleRankOrderChange = (newOptions: string[]) => {
    setValue(currentStep.toString(), newOptions);
  };

  return (
    <form onSubmit={handleSubmit(handleEndTest)}>
      <Card sx={{ borderRadius: 6, height: "100%", position: "relative" }}>
        <CardHeader
          questions={questions}
          gotoStep={gotoStep}
          currentStep={currentStep}
          testComplete={testComplete}
          loading={testLoading}
          onSubmit={() => setEndTestDialogOpen(true)}
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
                  render={({ field: { value } }) => (
                    <RankOrder
                      setOptions={handleRankOrderChange}
                      options={value || questions[currentStep].shuffled}
                    />
                  )}
                />
              ))
          )}
          {testComplete && (
            <TestSolution currentStep={currentStep} questions={questions} />
          )}
          <CardActions
            testComplete={testComplete}
            questions={questions}
            currentStep={currentStep}
            gotoStep={gotoStep}
            onSubmit={() => setEndTestDialogOpen(true)}
          />
        </Stack>
      </Card>
      <ConfirmationDialog
        title="Are you sure you want to complete the test?"
        open={endTestDialogOpen}
        onClose={() => setEndTestDialogOpen(false)}
        onSubmit={() => {
          handleSubmit(handleEndTest)();
          setEndTestDialogOpen(false);
        }}
      />
    </form>
  );
};

export default SJTTestCard;
