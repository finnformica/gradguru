"use client";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { LoadingScreen } from "@/components/global-components";

import NRModal from "@/components/NRForm/NRModal";
import { NRQuestion } from "@/components/NRForm/types";

import { useNRTests } from "@/api/tests";
import _ from "lodash";

const NRListItem = ({
  refresh,
  ...question
}: { refresh: () => void } & NRQuestion) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <NRModal open={open} setOpen={setOpen} refresh={refresh} {...question} />
      <ListItem disablePadding>
        <ListItemButton onClick={() => setOpen(true)}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" spacing={2}>
              <Typography>{_.startCase(question.type)}</Typography>
              <Typography
                sx={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  width: "60vw",
                }}
              >
                {question.type === "table" && question.questions[0].question}
                {question.type === "gmat" && question.question}
                {question.type === "graph" && question.scenario}
              </Typography>
            </Stack>
            <Typography>
              {new Date(
                question.created ? question.created : Date.now()
              ).toLocaleDateString()}
            </Typography>
          </Box>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
};

const AllNR = () => {
  const { questions, loading, refresh } = useNRTests();

  if (!questions || loading) return <LoadingScreen />;

  return (
    <>
      <Typography variant="h4" pb={2}>
        All NR questions
      </Typography>

      <List
        subheader={
          <ListSubheader>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" spacing={2}>
                <Typography>Type</Typography>
                <Typography>Scenario</Typography>
              </Stack>
              <Typography>Date created</Typography>
            </Box>
          </ListSubheader>
        }
      >
        {questions.map((question: NRQuestion, key) => (
          <NRListItem key={key} refresh={refresh} {...question} />
        ))}
      </List>
    </>
  );
};

export default AllNR;
