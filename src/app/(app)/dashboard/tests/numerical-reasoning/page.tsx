"use client";

import _ from "lodash";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { createTestRecord, getNRTests } from "api/tests";

import { LoadingScreen } from "components/global-components";
import NRTestCard from "components/tests/nr/nr-test-card";
import TopPanel from "components/tests/nr/top-panel";

type NRQuestion = {
  question: string;
  scenario: string;
  type: "table" | "graph" | "gmat";
  options: string[];
  shuffled: string[];
  answer: any;
  success: boolean | null;
  id: string;
};

const NumericalReasoningTest = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();
  const timeStarted = Date.now();

  const [questions, setQuestions] = useState<NRQuestion[]>();
  const [testComplete, setTestComplete] = useState(false);
  const [testLoading, setTestLoading] = useState(false);

  const fetchTableOrGraph = async (type: string) => {
    const tableQuestions = await getNRTests(type);
    const sample = _.sample(tableQuestions) as any;
    const questions = sample.questions.map((q: any) => ({
      ...q,
      ..._.omit(sample, ["questions", "created"]),
      success: null,
    }));

    return questions;
  };

  const fetchGmat = async () => {
    const gmatQuestions = await getNRTests("gmat");
    const samples = _.sampleSize(gmatQuestions, 2) as any;
    const questions = samples.map((q: any) => ({
      ..._.omit(q, "created"),
      success: null,
    }));

    return questions;
  };

  useEffect(() => {
    const createTest = async () => {
      const table = await fetchTableOrGraph("table");
      const graph = await fetchTableOrGraph("graph");
      const gmat = await fetchGmat();

      Promise.all([table, graph, gmat]).then((values) =>
        setQuestions(values.flat())
      );
    };

    createTest();
  }, []);

  if (!questions || questions.length === 0) return <LoadingScreen />;

  const markTest = (data: any) => {
    const marked = questions.map((question, index) => {
      if (question.type === "gmat") {
        return {
          ...question,
          success: question.answer === data[index],
        };
      }

      if (question.answer.type === "multiple") {
        const correctAnswer = _.omit(question.answer.value, "type");
        return {
          ...question,
          success: _.isEqual(correctAnswer, data[index]),
        };
      }

      if (question.answer.type === "other") {
        return {
          ...question,
          success:
            question.answer.value.toLowerCase() === data[index].toLowerCase(),
        };
      }

      return {
        ...question,
        // answer could be string or number
        success: question.answer.value == data[index],
      };
    });

    // calculate test metrics
    const correct = marked.filter((q) => q.success).length;
    const score = {
      percent: correct / marked.length,
      correct: correct,
      total: marked.length,
    };
    const date = Date.now();
    const timeTaken = date - timeStarted;
    const type = { label: "Numerical Reasoning", name: "nr" };
    const questionIds = Array.from(new Set(marked.map((q) => q.id)));

    // store results
    createTestRecord(
      { score, date, type, questionIds, time: timeTaken },
      session!.user.id
    )
      .then(() => enqueueSnackbar("Test result saved"))
      .catch((err) =>
        enqueueSnackbar(`Test result not saved - ${err.statusText}`, {
          variant: "error",
        })
      )
      .finally(() => {
        setQuestions(marked);
        setTestComplete(true);
        setTestLoading(false);
      });
  };

  const handleEndTest = (data: any) => {
    if (Object.keys(data).length !== questions.length) {
      enqueueSnackbar("Not all questions answered", { variant: "error" });
      return;
    }

    // simulate marking of test
    setTestLoading(true);
    setTimeout(() => markTest(data), 1800);
  };

  return (
    <>
      <TopPanel />
      <NRTestCard
        questions={questions}
        handleEndTest={handleEndTest}
        testComplete={testComplete}
        testLoading={testLoading}
      />
    </>
  );
};

export default NumericalReasoningTest;
