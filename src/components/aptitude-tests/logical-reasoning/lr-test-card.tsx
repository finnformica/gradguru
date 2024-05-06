"use client";

import { useState } from "react";
import { Controller } from "react-hook-form";

import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Stack,
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

const OptionLabel = ({
  value,
  index,
  input,
}: {
  value?: number;
  index: number;
  input?: boolean;
}) =>
  input ? (
    <FormControlLabel
      control={<Checkbox checked={value === index} />}
      label={numericToAlphaMapping[index]}
      labelPlacement="start"
      componentsProps={{ typography: { variant: "h5" } }}
    />
  ) : (
    <Typography variant="h5">{numericToAlphaMapping[index]}</Typography>
  );

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
  } = questions[currentStep].grid;

  const { type: questionType } = questions[currentStep];

  const renderQuestionGrid = (value?: number) => {
    if (template === "grid") {
      return (
        <Stack
          display="grid"
          gridTemplateColumns={`repeat(3, ${squareSizeMapping[numRows]})`}
          gridTemplateRows={`repeat(3, ${squareSizeMapping[numRows]})`}
        >
          {gridData.map((item, index) =>
            gridType === "triangle" ? (
              <TriangleGrid key={index} grid={item} />
            ) : (
              <SquareGrid
                key={index}
                innerGrid={innerGrid}
                showBorders={outerGrid}
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
          <Stack
            key={index}
            direction="column"
            spacing={1}
            alignItems="center"
            sx={value ? { cursor: "pointer" } : {}}
            onClick={
              value ? () => setValue(currentStep.toString(), index) : () => {}
            }
          >
            {gridType === "triangle" ? (
              <TriangleGrid grid={item} />
            ) : (
              <SquareGrid
                innerGrid={innerGrid}
                showBorders={outerGrid}
                grid={item}
              />
            )}

            <OptionLabel
              value={value}
              index={index}
              input={questionType === "odd-one-out"}
            />
          </Stack>
        ))}
      </Stack>
    );
  };

  const renderAnswerGrid = (value: number) => {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    if (questionType === "odd-one-out") return <></>;

    if (template === "grid") {
      return (
        <Stack
          display="grid"
          gridTemplateColumns={`repeat(2, ${squareSizeMapping[numRows]})`}
          gap={2}
        >
          {questions[currentStep].grid.options.map((item, index) => (
            <Stack
              key={index}
              alignItems="center"
              sx={{ cursor: "pointer" }}
              onClick={() => setValue(currentStep.toString(), index)}
            >
              {gridType === "triangle" ? (
                <TriangleGrid grid={item} />
              ) : (
                <SquareGrid
                  innerGrid={innerGrid}
                  showBorders={outerGrid}
                  grid={item}
                />
              )}
              <OptionLabel value={value} index={index} input />
            </Stack>
          ))}
        </Stack>
      );
    }

    return (
      <Stack display="flex" direction="row" spacing={3}>
        {questions[currentStep].grid.options.map((item, index) => (
          <Stack
            key={index}
            direction="column"
            spacing={1}
            alignItems="center"
            sx={{ cursor: "pointer" }}
            onClick={() => setValue(currentStep.toString(), index)}
          >
            {gridType === "triangle" ? (
              <TriangleGrid grid={item} />
            ) : (
              <SquareGrid
                innerGrid={innerGrid}
                showBorders={outerGrid}
                grid={item}
              />
            )}

            <OptionLabel value={value} index={index} input />
          </Stack>
        ))}
      </Stack>
    );
  };

  return (
    <form onSubmit={handleSubmit(handleEndTest)}>
      <Card
        sx={{
          borderRadius: 6,
          height: "100%",
          position: "relative",
          minWidth: "800px",
        }}
      >
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

          <Stack
            direction={template === "grid" ? "row" : "column"}
            spacing={4}
            justifyContent={template === "grid" ? "space-around" : "center"}
          >
            {questionType === "odd-one-out" ? (
              <Controller
                key={currentStep.toString()}
                name={currentStep.toString()}
                control={control}
                rules={{ required: true }}
                render={({ field: { value }, fieldState: { error } }) => (
                  <>
                    {!!error && (
                      <FormHelperText error={!!error} sx={{ pb: 2 }}>
                        Please select an option.
                      </FormHelperText>
                    )}
                    {renderQuestionGrid(value)}
                  </>
                )}
              />
            ) : (
              renderQuestionGrid()
            )}

            {questionType !== "odd-one-out" && (
              <Box>
                <Typography variant="h6" pb={2}>
                  Options
                </Typography>
                <Controller
                  key={currentStep.toString()}
                  name={currentStep.toString()}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value }, fieldState: { error } }) => (
                    <>
                      {!!error && (
                        <FormHelperText error={!!error} sx={{ pb: 2 }}>
                          Please select an option.
                        </FormHelperText>
                      )}
                      {renderAnswerGrid(value)}
                    </>
                  )}
                />
              </Box>
            )}
          </Stack>

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
