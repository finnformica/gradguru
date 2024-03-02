"use client";

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { useSJTTests } from "@/api/tests";
import { SJTModal } from "@/components/SJTForm";
import { SJTQuestion } from "@/components/SJTForm/types";
import { LoadingScreen } from "@/components/global-components";

const SJTListItem = ({
  refresh,
  ...question
}: { refresh: () => void } & SJTQuestion) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SJTModal open={open} setOpen={setOpen} refresh={refresh} {...question} />
      <ListItem disablePadding>
        <ListItemButton onClick={() => setOpen(true)}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                width: "60vw",
              }}
            >
              {question.scenario.length === 0
                ? "No scenario provided"
                : question.scenario}
            </Typography>
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

const AllSJT = () => {
  const { questions, loading, refresh } = useSJTTests();

  if (!questions || loading) return <LoadingScreen />;

  return (
    <>
      <Typography variant="h4" pb={2}>
        All SJT questions
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
              <Typography>Scenario</Typography>
              <Typography>Date created</Typography>
            </Box>
          </ListSubheader>
        }
      >
        {questions.map((question, key) => (
          <SJTListItem key={key} refresh={refresh} {...question} />
        ))}
      </List>
    </>
  );
};

export default AllSJT;
