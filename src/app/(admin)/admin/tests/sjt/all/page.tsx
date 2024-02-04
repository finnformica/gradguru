"use client";

import { useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  Divider,
  Box,
} from "@mui/material";

import SJTModal from "./SJTModal";
import { SJTScenarioState } from "../types";

const SJTListItem = ({ ...question }: SJTScenarioState) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SJTModal open={open} setOpen={setOpen} {...question} />
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
  const [questions, setQuestions] = useState<SJTScenarioState[]>([]);

  const sortDesc = () => {
    setQuestions(
      questions.sort((a, b) =>
        b.created && a.created ? b.created - a.created : 0
      )
    );
  };

  const sortAsc = () => {
    setQuestions(
      questions.sort((a, b) =>
        a.created && b.created ? a.created - b.created : 0
      )
    );
  };

  useEffect(() => {
    const fetchSJT = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=sjt-consulting`
      );
      const data = await response.json();

      setQuestions(
        data.documents.sort((a: SJTScenarioState, b: SJTScenarioState) =>
          a.created && b.created ? b.created - a.created : 0
        )
      );
    };
    fetchSJT();
  }, []);

  return (
    <>
      <Typography variant="h4" pb={2}>
        All SJT questions
      </Typography>
      <List>
        {questions.map((question, key) => (
          <SJTListItem key={key} {...question} />
        ))}
      </List>
    </>
  );
};

export default AllSJT;
