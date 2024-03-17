import { Stack, Typography, IconButton } from "@mui/material";
import UnderlineButton from "./underline-button";

type CardHeaderProps = {
  questions: any[];
  gotoStep: (step: number) => void;
  currentStep: number;
};

const CardHeader = ({ questions, gotoStep, currentStep }: CardHeaderProps) => {
  return (
    <>
      <UnderlineButton
        type="submit"
        label="End test"
        sx={{ position: "absolute", top: 10, left: 14 }}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        py={0.5}
        borderBottom={(theme) => `1px dashed ${theme.palette.divider}`}
      >
        {questions.map((_, index) => (
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
                color:
                  currentStep !== index ? "text.secondary" : "text.primary",
              }}
            >
              {index + 1}
            </Typography>
          </IconButton>
        ))}
      </Stack>
    </>
  );
};

export default CardHeader;
