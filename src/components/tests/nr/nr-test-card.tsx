"use client";

import { useState } from "react";
import { Controller } from "react-hook-form";

import { Card, Stack, Typography } from "@mui/material";

import { ConfirmationDialog } from "components/global-components";
import { useStepsForm } from "hooks/useStepsForm";

import CardActions from "../card-actions";
import CardHeader from "../card-header";

type NRTestCardProps = {
  questions: any[];
  handleEndTest: (data: any) => void;
  testComplete: boolean;
  testLoading: boolean;
};

const NRTestCard = ({
  questions,
  handleEndTest,
  testComplete,
  testLoading,
}: NRTestCardProps) => {
  const [endTestDialogOpen, setEndTestDialogOpen] = useState(false);
  const { handleSubmit, currentStep, gotoStep, control, setValue } =
    useStepsForm({
      isBackValidate: false,
      initialStep: 0,
    });

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

export default NRTestCard;
