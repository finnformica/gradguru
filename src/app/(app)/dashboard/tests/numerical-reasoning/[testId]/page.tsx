"use client";

import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

import _ from "lodash";
import { useSnackbar } from "notistack";
import { useStopwatch } from "react-timer-hook";

import { createTestRecord, getQuestionsById, getTestById } from "api/tests";
import { useBeforeUnload } from "hooks/useBeforeUnload";

import {
  NRTestCard,
  TopPanel,
} from "components/aptitude-tests/numerical-reasoning";
import { LoadingScreen } from "components/global";

import { INRTest, NRQuestionFlat } from "types";
import { formatGmat, formatTableOrGraph } from "utils/user-tests";
import NotFoundAnimation from "components/global/NotFoundAnimation";

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

  const [questions, setQuestions] = useState<NRQuestionFlat[]>();
  const [testComplete, setTestComplete] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [test, setTest] = useState<INRTest | null>(null);
  const [testExist, setTestExist] = useState(true);

  const { seconds, minutes, hours, pause } = useStopwatch({ autoStart: true });

  useBeforeUnload(!testComplete);

  useEffect(() => {
    if (testComplete) return pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testComplete]);

  const mapAndSetQuestions = (data: any[]) => {
    const questions = data.map((q) => {
      if (q.type === "table" || q.type === "graph")
        return formatTableOrGraph(q);
      if (q.type === "gmat") return formatGmat(q);
    });

    setQuestions(questions.flat());
  };

  useEffect(() => {
    const createTest = async () => {
      const test = await getTestById("numerical-reasoning", testId);
      if (!test.questions) {
        setTestExist(false);
      } else {
        setTest(test);
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
  }, [testId]);

  if (!questions || questions.length === 0) {
    if (!testExist) {
      return notFound();
    }
    return <LoadingScreen />;
  }

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
    createTestRecord("numerical-reasoning", session!.user.id, testId, {
      score,
      date,
      type,
      questionIds,
      time: timeTaken,
    })
      .then(() => enqueueSnackbar("Test result saved"))
      .catch(() =>
        enqueueSnackbar("Test result not saved", {
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
      <TopPanel testId={test?.name || "Test"} />
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
