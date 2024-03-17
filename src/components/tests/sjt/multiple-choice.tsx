import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

type MultipleChoiceProps = {
  setAnswer: (newAnswer: string) => void;
  answer: string;
  options: string[];
};

const MultipleChoice = ({
  setAnswer,
  answer,
  options,
}: MultipleChoiceProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAnswer(event.target.value);

  return (
    <RadioGroup onChange={handleChange} value={answer}>
      {options.map((option, index) => (
        <Stack
          key={option}
          spacing={2}
          direction="row"
          alignItems="center"
          my={1}
        >
          <Typography variant="body1">{index + 1}.</Typography>
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
        </Stack>
      ))}
    </RadioGroup>
  );
};

export default MultipleChoice;
