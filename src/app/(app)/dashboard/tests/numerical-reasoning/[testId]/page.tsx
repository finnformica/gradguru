"use client";

import _ from "lodash";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";

import { createTestRecord, getQuestionsById, getTestById } from "api/tests";

import { LoadingScreen } from "components/global-components";
import NRTestCard from "components/tests/nr/nr-test-card";
import TopPanel from "components/tests/nr/top-panel";
import { useBeforeUnload } from "hooks/useBeforeUnload";
import { notFound } from "next/navigation";

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

type NumericalReasoningTestProps = {
  params: {
    testId: string;
  };
};

const NumericalReasoningTest = ({
  params: { testId },
}: NumericalReasoningTestProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();

  const [questions, setQuestions] = useState<NRQuestion[]>();
  const [testComplete, setTestComplete] = useState(false);
  const [testLoading, setTestLoading] = useState(false);

  const { seconds, minutes, hours, pause } = useStopwatch({ autoStart: true });

  useEffect(() => {
    if (testComplete) return pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testComplete]);

  const formatTableOrGraph = (data: any) => {
    const questions = data.questions.map((q: any) => ({
      ...q,
      ..._.omit(data, ["questions", "created", "testId"]),
      success: null,
    }));

    return questions;
  };

  const formatGmat = (data: any) => {
    const question = {
      ..._.omit(data, "created", "testId"),
      success: null,
    };

    return question;
  };

  const mapAndSetQuestions = (data: any[]) => {
    const questions = data.map((q) => {
      if (q.type === "table" || q.type === "graph")
        return formatTableOrGraph(q);
      if (q.type === "gmat") return formatGmat(q);
    });

    console.log(questions.flat());

    setQuestions(questions.flat());
  };

  useEffect(() => {
    const createTest = async () => {
      const test = await getTestById("numerical-reasoning", testId);
      if (!test.questions) {
        notFound();
      } else {
        const questionIds = Object.values(test.questions).flat() as string[];

        getQuestionsById(
          "numerical-reasoning",
          questionIds,
          mapAndSetQuestions
        );
      }
    };

    createTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useBeforeUnload(!testComplete);

  if (!questions || questions.length === 0) return <LoadingScreen />;

  const markTest = (data: any) => {
    const marked = questions.map((question, index) => {
      // deep comparison for objects
      if (question.answer.type === "multiple") {
        return {
          ...question,
          success: _.isEqual(question.answer.value, data[index]),
        };
      }

      // remove whitespace and convert to lowercase for string comparison
      if (question.answer.type === "string") {
        const correctAnswer = question.answer.value
          .toLowerCase()
          .replace(/\s/g, "");
        const userAnswer = data[index].toLowerCase().replace(/\s/g, "");
        return { ...question, success: correctAnswer === userAnswer };
      }

      // numerical comparison (converted to string by form)
      return { ...question, success: question.answer.value === data[index] };
    });

    // calculate test metrics
    const correct = marked.filter((q) => q.success).length;
    const score = {
      percent: correct / marked.length,
      correct: correct,
      total: marked.length,
    };
    const date = Date.now();
    const timeTaken = (hours * 3600 + minutes * 60 + seconds) * 1000;
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
      <TopPanel testId={testId} />
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
