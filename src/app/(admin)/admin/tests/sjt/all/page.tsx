"use client";

import { useEffect, useState } from "react";
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

const SJTListItem = ({
  fetchSJT,
  ...question
}: { fetchSJT: () => void } & SJTQuestion) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SJTModal
        open={open}
        setOpen={setOpen}
        fetchSJT={fetchSJT}
        {...question}
      />
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
  const [questions, setQuestions] = useState<SJTQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  const fetchSJT = async () => {
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=sjt-consulting`
    );
    const data = await response.json();

    setQuestions(
      data.documents.sort((a: SJTQuestion, b: SJTQuestion) =>
        a.created && b.created ? b.created - a.created : 0
      )
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchSJT();
  }, []);

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
            <SJTListItem key={key} fetchSJT={fetchSJT} {...question} />
          ))}
        </List>
      </LoadingWrapper>
    </>
  );
};

export default AllSJT;
