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
import { useEffect, useState } from "react";

import { LoadingWrapper } from "@/components/Global";
import { capitalise } from "@/utils";

import { NRQuestion } from "@/components/NRForm/types";
import NRModal from "@/components/NRForm/NRModal";

const NRListItem = ({ ...question }: NRQuestion) => {
  const [open, setOpen] = useState(false);

  console.log("question", question);

  return (
    <>
      <NRModal open={open} setOpen={setOpen} {...question} />
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
              <Typography>{capitalise(question.type)}</Typography>
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
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchNR = async () => {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=nr-consulting`
      );
      const data = await response.json();

      setQuestions(data.documents);
      setLoading(false);
    };
    fetchNR();
  }, []);

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
        <LoadingWrapper loading={loading}>
          {questions.map((question: NRQuestion, key) => (
            <NRListItem key={key} {...question} />
          ))}
        </LoadingWrapper>
      </List>
    </>
  );
};

export default AllNR;
