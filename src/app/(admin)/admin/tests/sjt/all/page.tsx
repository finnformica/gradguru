"use client";

import { useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  Divider,
  Stack,
  Box,
} from "@mui/material";

import { ScenarioState } from "../types";

const AllSJT = () => {
  const [questions, setQuestions] = useState<ScenarioState[]>([]);

  const sortDesc = () => {
    setQuestions(questions.sort((a, b) => b.created - a.created));
  };

  const sortAsc = () => {
    setQuestions(questions.sort((a, b) => a.created - b.created));
  };

  useEffect(() => {
    const fetchSJT = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=sjt-consulting`
      );
      const data = await response.json();

      setQuestions(
        data.documents.sort(
          (a: ScenarioState, b: ScenarioState) => b.created - a.created
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
          <>
            <ListItem key={key} disablePadding>
              <ListItemButton>
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
                    {new Date(question.created).toLocaleDateString()}
                  </Typography>
                </Box>
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </>
  );
};

export default AllSJT;
