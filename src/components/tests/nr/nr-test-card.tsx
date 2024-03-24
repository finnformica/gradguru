"use client";

import _ from "lodash";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

import {
  Card,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { BarChart, LineChart, PieChart } from "components/Charts";
import { ConfirmationDialog } from "components/global-components";
import { useStepsForm } from "hooks/useStepsForm";

import { InfoOutlined } from "@mui/icons-material";
import CardActions from "../card-actions";
import CardHeader from "../card-header";
import TestSolution from "./test-solution";

const renderQuestionText = (questions: any[], currentStep: number) => (
  <Stack spacing={2} mb={4}>
    <Stack spacing={2} direction="row" alignItems="center">
      <Typography variant="h5">Question {currentStep + 1}</Typography>
      <Tooltip title="For numerical values, provide answers to 2d.p. if not specified. For ratio values, provide answers in the form x:y.">
        <InfoOutlined
          sx={{ color: "grey.400", fontSize: 20, cursor: "pointer" }}
        />
      </Tooltip>
    </Stack>
    <Typography variant="body1">{questions[currentStep].scenario}</Typography>
    <Typography variant="body1">{questions[currentStep].question}</Typography>
  </Stack>
);

const renderGraph = (question: any) =>
  question.type === "graph" && (
    <Stack maxHeight={500} alignItems="center">
      {question.graph === "pie" && <PieChart data={question.data} />}
      {question.graph === "bar" && <BarChart data={question.data} />}
      {question.graph === "line" && <LineChart data={question.data} />}
    </Stack>
  );

const renderInputFields = (
  question: any,
  currentStep: number,
  index: number,
  control: any
) =>
  question.answer.type === "multiple" ? (
    <Stack spacing={2} direction="row">
      {Object.keys(_.omit(question.answer.value, "type"))
        .sort()
        .map((option, i) => (
          <Controller
            key={`${index}.${option}`}
            name={`${currentStep.toString()}.${option}`}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label={_.startCase(option)}
                onChange={onChange}
                value={value}
                error={!!error}
                helperText={!!error && `${_.startCase(option)} is required`}
                sx={{ maxWidth: 200 }}
              />
            )}
          />
        ))}
    </Stack>
  ) : (
    <Controller
      key={index}
      name={currentStep.toString()}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          label="Answer"
          onChange={onChange}
          value={value}
          error={!!error}
          helperText={!!error && "Answer is required"}
          sx={{ maxWidth: 200 }}
          InputProps={{
            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
          }}
        />
      )}
    />
  );

const renderDataGrid = (question: any) =>
  question.type === "table" && (
    <DataGrid
      rows={question.data.rows.map((row: any, index: number) => ({
        id: index,
        ...row,
      }))}
      columns={question.data.columns.map((column: any) => ({
        ...column,
        width: 200,
        flex: 1,
      }))}
      hideFooter
    />
  );

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
  const { handleSubmit, currentStep, gotoStep, control } = useStepsForm({
    isBackValidate: true,
    initialStep: 0,
  });

  console.log(questions);

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
          {renderQuestionText(questions, currentStep)}

          {questions.map(
            (question, index) =>
              index === currentStep && (
                <React.Fragment key={index}>
                  {renderDataGrid(question)}
                  {renderGraph(question)}
                  {renderInputFields(question, currentStep, index, control)}
                </React.Fragment>
              )
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

export default NRTestCard;
