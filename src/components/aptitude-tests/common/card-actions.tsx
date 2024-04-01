import { Button, Stack } from "@mui/material";
import UnderlineButton from "./underline-button";

type CardActionsProps = {
  questions: any[];
  currentStep: number;
  gotoStep: (step: number) => void;
  testComplete: boolean;
  onSubmit: () => void;
};

const CardActions = ({
  questions,
  currentStep,
  gotoStep,
  testComplete,
  onSubmit,
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
      {currentStep === questions.length - 1 ? (
        <UnderlineButton
          onClick={onSubmit}
          label="End test"
          disabled={testComplete}
        />
      ) : (
        <Button
          variant="contained"
          onClick={() => gotoStep(currentStep + 1)}
          disabled={currentStep === questions.length - 1}
        >
          Next
        </Button>
      )}
    </Stack>
  );
};

export default CardActions;
