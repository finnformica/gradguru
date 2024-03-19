import { Stack, Typography, IconButton, LinearProgress } from "@mui/material";
import UnderlineButton from "./underline-button";

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
  // console.log("questions", questions);
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
            question.success === null
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
      </Stack>
      {loading && <LinearProgress />}
    </>
  );
};

export default CardHeader;
