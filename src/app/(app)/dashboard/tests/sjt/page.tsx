"use client";

import { useState } from "react";

import {
  Box,
  Button,
  Card,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";

import { PageBreadcrumbs } from "components/global-components";

const UnderlineButton = ({
  label,
  onClick,
  sx,
}: {
  label: string;
  onClick?: () => void;
  sx?: SxProps;
}) => (
  <Box>
    <Button
      disableFocusRipple
      disableRipple
      onClick={onClick}
      sx={{
        textDecoration: "underline",
        backgroundColor: "transparent",
        "&:hover": { backgroundColor: "transparent" },
        p: 0,
        ...sx,
      }}
    >
      {label}
    </Button>
  </Box>
);

const SituationJudgementTest = () => {
  const [answer, setAnswer] = useState("");
  const questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const active = 1;

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAnswer((event.target as HTMLInputElement).value);

  return (
    <>
      <Stack
        pb={4}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <PageBreadcrumbs
          header="Situational Judgement"
          links={[
            { label: "Tests", href: "/dashboard/tests" },
            { label: "Situational Judgement" },
          ]}
        />
        <Box>
          <Button variant="contained" color="primary">
            Action
          </Button>
        </Box>
      </Stack>
      <Card sx={{ borderRadius: 6, height: "100%", position: "relative" }}>
        <UnderlineButton
          label="End test"
          sx={{ position: "absolute", top: 14, left: 14 }}
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={4}
          p={2}
          borderBottom={(theme) => `1px dashed ${theme.palette.divider}`}
        >
          {questions.map((question, index) => (
            <Typography
              key={index}
              variant="subtitle2"
              sx={{
                textDecoration: active !== index ? "none" : "underline",
                fontWeight: active !== index ? 300 : 500,
                color: active !== index ? "text.secondary" : "text.primary",
              }}
            >
              {question}
            </Typography>
          ))}
        </Stack>
        <Stack p={6} spacing={4}>
          <Stack spacing={2} mb={4}>
            <Typography variant="h5">Question {questions[active]}</Typography>
            <Typography variant="body1">
              Your firm is working with a major client who requests certain
              financial practices that may be ethically questionable. As the
              Account Manager, you must balance the client's demands with the
              firm's commitment to ethical business practices. Amidst the
              pressure to maintain the client relationship, you face challenges
              such as potential legal implications, risks to the firm's
              reputation, and the ethical considerations of the requested
              practices.
            </Typography>
            <Typography variant="body1">
              How would you respond to the client's request while considering
              the ethical implications?
            </Typography>
          </Stack>

          <RadioGroup onChange={handleRadioChange} value={answer}>
            <FormControlLabel value="1" control={<Radio />} label="Option 1" />
            <FormControlLabel value="2" control={<Radio />} label="Option 2" />
            <FormControlLabel value="3" control={<Radio />} label="Option 3" />
            <FormControlLabel value="4" control={<Radio />} label="Option 4" />
          </RadioGroup>
          <UnderlineButton label="Show the solution" />
          <Stack
            direction="row"
            justifyContent="flex-start"
            spacing={2}
            alignItems="center"
          >
            <Button variant="outlined">Back</Button>
            <Button variant="contained" color="primary">
              Next
            </Button>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

export default SituationJudgementTest;
