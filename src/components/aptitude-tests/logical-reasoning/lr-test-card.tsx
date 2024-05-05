"use client";

import { useState } from "react";

import _ from "lodash";

import {
  Autocomplete,
  Box,
  Card,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { ConfirmationDialog } from "components/global";
import { useStepsForm } from "hooks/useStepsForm";
import { ILRQuestion } from "types";

import CardActions from "../common/card-actions";
import CardHeader from "../common/card-header";
import { numericToAlphaMapping, squareSizeMapping } from "./constants";
import SquareGrid from "./square-grid";
import TestSolution from "./test-solution";
import TriangleGrid from "./triangle-grid";
import { Controller } from "react-hook-form";

type LRTestCardProps = {
  questions: ILRQuestion[];
  handleEndTest: (data: any) => void;
  testComplete: boolean;
  testLoading: boolean;
};

const LRTestCard = ({
  questions,
  handleEndTest,
  testComplete,
  testLoading,
}: LRTestCardProps) => {
  const [endTestDialogOpen, setEndTestDialogOpen] = useState(false);
  const { handleSubmit, currentStep, gotoStep, control, setValue } =
    useStepsForm({ isBackValidate: false, initialStep: 0 });

  const {
    template,
    type: gridType,
    rows: numRows,
    data: gridData,
    border: { inner: innerGrid, outer: outerGrid },
    questionMark,
  } = questions[currentStep].grid;

  const { type: questionType } = questions[currentStep];
  const answerOptions = _.range(
    questions[currentStep].grid.options.length ||
      questions[currentStep].grid.data.length
  ).map((i) => numericToAlphaMapping[i]);

  const renderQuestionGrid = () => {
    if (template === "grid") {
      return (
        <Stack
          display="grid"
          gridTemplateColumns={`repeat(3, ${squareSizeMapping[numRows]})`}
        >
          {gridData.map((item, index) =>
            gridType === "triangle" ? (
              <TriangleGrid key={index} grid={item} />
            ) : (
              <SquareGrid
                key={index}
                innerGrid={innerGrid}
                showBorders={outerGrid}
                numRows={numRows}
                grid={item}
              />
            )
          )}
        </Stack>
      );
    }

    return (
      <Stack display="flex" direction="row" spacing={3}>
        {gridData.map((item, index) => (
          <Stack key={index} direction="column" spacing={1} alignItems="center">
            {gridType === "triangle" ? (
              <TriangleGrid grid={item} />
            ) : (
              <SquareGrid
                innerGrid={innerGrid}
                showBorders={outerGrid}
                numRows={numRows}
                grid={item}
              />
            )}

            <Typography variant="h5">{numericToAlphaMapping[index]}</Typography>
          </Stack>
        ))}
      </Stack>
    );
  };

  const renderAnswerGrid = () => {
    if (questionType === "odd-one-out") return null;

    if (template === "grid") {
      return (
        <Stack
          display="grid"
          gridTemplateColumns={`repeat(2, ${squareSizeMapping[numRows]})`}
          gap={2}
        >
          {questions[currentStep].grid.options.map((item, index) => (
            <Stack key={index} alignItems="center">
              {gridType === "triangle" ? (
                <TriangleGrid grid={item} />
              ) : (
                <SquareGrid
                  innerGrid={innerGrid}
                  showBorders={outerGrid}
                  numRows={numRows}
                  grid={item}
                />
              )}
              <Typography variant="h5">
                {numericToAlphaMapping[index]}
              </Typography>
            </Stack>
          ))}
        </Stack>
      );
    }

    return (
      <Stack display="flex" direction="row" spacing={3}>
        {questions[currentStep].grid.options.map((item, index) => (
          <Stack key={index} direction="column" spacing={1} alignItems="center">
            {gridType === "triangle" ? (
              <TriangleGrid grid={item} />
            ) : (
              <SquareGrid
                innerGrid={innerGrid}
                showBorders={outerGrid}
                numRows={numRows}
                grid={item}
              />
            )}

            <Typography variant="h5">{numericToAlphaMapping[index]}</Typography>
          </Stack>
        ))}
      </Stack>
    );
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
              {questions[currentStep].question}
            </Typography>
          </Stack>

          <Stack direction={template === "grid" ? "row" : "column"} spacing={4}>
            {renderQuestionGrid()}
            <Box>
              <Typography variant="h6" pb={2}>
                Options
              </Typography>
              {renderAnswerGrid()}
            </Box>
          </Stack>

          <Box>
            <Typography variant="h6" pb={2}>
              Answer
            </Typography>
            <Controller
              key={currentStep.toString()}
              name={currentStep.toString()}
              control={control}
              rules={{ required: true }}
              render={({ field: { value }, fieldState: { error } }: any) => (
                <Autocomplete
                  onChange={(e, data) => setValue(currentStep.toString(), data)}
                  value={value}
                  options={answerOptions}
                  sx={{ width: "150px" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Answer"
                      error={!!error}
                      helperText={!!error && "Answer is required."}
                    />
                  )}
                />
              )}
            />
          </Box>

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

export default LRTestCard;