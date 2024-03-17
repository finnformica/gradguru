import { Button, Stack } from "@mui/material";

type CardActionsProps = {
  questions: any[];
  currentStep: number;
  gotoStep: (step: number) => void;
};

const CardActions = ({
  questions,
  currentStep,
  gotoStep,
}: CardActionsProps) => {
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      spacing={2}
      alignItems="center"
    >
      <Button
        variant="outlined"
        onClick={() => gotoStep(currentStep - 1)}
        disabled={currentStep === 0}
      >
        Back
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => gotoStep(currentStep + 1)}
        disabled={currentStep === questions.length - 1}
      >
        Next
      </Button>
    </Stack>
  );
};

export default CardActions;
