"use client";

import { useEffect, useState } from "react";
import { Button, Card, IconButton, Stack, Typography } from "@mui/material";
import MultipleChoice from "./multiple-choice";
import RankOrder from "./rank-order";
import UnderlineButton from "./underline-button";

type SJTTestCardProps = {
  questions: any[];
};

const SJTTestCard = ({ questions }: SJTTestCardProps) => {
  const [options, setOptions] = useState([""]);
  const [answer, setAnswer] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!questions) return;

    setOptions(questions[active].options);

    console.log("setting options");
  }, [questions, active]);

  return (
    <Card sx={{ borderRadius: 6, height: "100%", position: "relative" }}>
      <UnderlineButton
        label="End test"
        sx={{ position: "absolute", top: 12, left: 14 }}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        p={0.5}
        borderBottom={(theme) => `1px dashed ${theme.palette.divider}`}
      >
        {questions.map((_, index) => (
          <IconButton
            key={index}
            onClick={() => setActive(index)}
            sx={{ width: 40, height: 40 }}
          >
            <Typography
              key={index}
              component="div"
              variant="subtitle2"
              sx={{
                textDecoration: active !== index ? "none" : "underline",
                fontWeight: active !== index ? 300 : 500,
                color: active !== index ? "text.secondary" : "text.primary",
              }}
            >
              {index + 1}
            </Typography>
          </IconButton>
        ))}
      </Stack>
      <Stack p={6} spacing={4}>
        <Stack spacing={2} mb={4}>
          <Typography variant="h5">Question {active + 1}</Typography>
          <Typography variant="body1">{questions[active].scenario}</Typography>
          <Typography variant="body1">{questions[active].question}</Typography>
        </Stack>
        {questions[active].type === "multiple" ? (
          <MultipleChoice
            setAnswer={setAnswer}
            answer={answer}
            options={options}
          />
        ) : (
          <RankOrder options={options} setOptions={setOptions} />
        )}
        <UnderlineButton label="Show the solution" />
        <Stack
          direction="row"
          justifyContent="flex-start"
          spacing={2}
          alignItems="center"
        >
          <Button
            variant="outlined"
            onClick={() => setActive(active - 1)}
            disabled={active === 0}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setActive(active + 1)}
            disabled={active === questions.length - 1}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default SJTTestCard;
