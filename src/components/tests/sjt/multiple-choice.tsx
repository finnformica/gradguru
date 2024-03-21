import React from "react";

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";

type MultipleChoiceProps = {
  setAnswer: (newAnswer: string) => void;
  answer: string;
  options: string[];
  error: boolean;
  helperText: string | boolean;
};

const MultipleChoice = ({
  setAnswer,
  answer,
  options,
  error,
  helperText,
}: MultipleChoiceProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAnswer(event.target.value);

  return (
    <FormControl error={error} variant="standard">
      <RadioGroup onChange={handleChange} value={answer}>
        {options.map((option, index) => (
          <Stack
            key={index}
            spacing={2}
            direction="row"
            alignItems="center"
            my={1}
          >
            <Typography variant="body1">{index + 1}.</Typography>
            <FormControlLabel
              key={option}
              value={index + 1}
              control={<Radio />}
              label={option}
            />
          </Stack>
        ))}
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default MultipleChoice;
