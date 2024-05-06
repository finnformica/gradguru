import { IconButton, LinearProgress, Stack, Typography } from "@mui/material";
import { useStopwatch } from "react-timer-hook";
import UnderlineButton from "./underline-button";
import { useEffect } from "react";

type CardHeaderProps = {
  questions: any[];
  gotoStep: (step: number) => void;
  testComplete: boolean;
  currentStep: number;
  loading: boolean;
  onSubmit: () => void;
};

const CardHeader = ({
  questions,
  gotoStep,
  currentStep,
  testComplete,
  loading,
  onSubmit,
}: CardHeaderProps) => {
  const { seconds, minutes, hours, pause } = useStopwatch({ autoStart: true });

  useEffect(() => {
    if (testComplete) return pause();
  }, [testComplete, pause]);

  return (
    <>
      <UnderlineButton
        onClick={onSubmit}
        label="End test"
        sx={{ position: "absolute", top: 10, left: 14 }}
        disabled={testComplete}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        py={0.5}
        borderBottom={(theme) => `1px dashed ${theme.palette.divider}`}
      >
        {questions.map((question, index) => {
          const color =
            question.success === null || question.success === undefined
              ? currentStep !== index
                ? "text.secondary"
                : "text.primary"
              : question.success
                ? "success.light"
                : "error.light";
          return (
            <IconButton
              key={index}
              onClick={() => gotoStep(index)}
              sx={{ width: 35, height: 35 }}
            >
              <Typography
                key={index}
                component="div"
                variant="subtitle2"
                sx={{
                  textDecoration: currentStep !== index ? "none" : "underline",
                  fontWeight: currentStep !== index ? 300 : 500,
                  color,
                }}
              >
                {index + 1}
              </Typography>
            </IconButton>
          );
        })}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ position: "absolute", top: 12, left: "calc(100% - 72px)" }}
        >
          {hours.toString().padStart(2, "0")}:
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </Typography>
      </Stack>
      {loading && <LinearProgress />}
    </>
  );
};

export default CardHeader;
