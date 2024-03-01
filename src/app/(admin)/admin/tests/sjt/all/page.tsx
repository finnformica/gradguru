"use client";

import { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  Divider,
  Box,
} from "@mui/material";

import { SJTModal } from "@/components/SJTForm";
import { SJTQuestion } from "@/components/SJTForm/types";
import { LoadingWrapper } from "@/components/Global";
import { useSJTTests } from "@/api/tests";

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

  if (!questions) return null; // TODO: loading page

  return (
    <>
      <Typography variant="h4" pb={2}>
        All SJT questions
      </Typography>
      <LoadingWrapper loading={loading}>
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
      </LoadingWrapper>
    </>
  );
};

export default AllSJT;
