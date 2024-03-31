"use client";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

import _ from "lodash";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useStopwatch } from "react-timer-hook";

import { createTestRecord, getQuestionsById, getTestById } from "api/tests";
import { useBeforeUnload } from "hooks/useBeforeUnload";

import { LoadingScreen } from "components/global-components";
import SJTTestCard from "components/tests/sjt/sjt-test-card";
import TopPanel from "components/tests/sjt/top-panel";

type SJTQuestion = {
  question: string;
  scenario: string;
  type: "multiple" | "rank";
  options: string[];
  shuffled: string[];
  answer: string;
  success: boolean | null;
  id?: string;
};

type SituationalJudgementTestProps = {
  params: {
    testId: string;
  };
};

const SituationalJudgementTest = ({
  params: { testId },
}: SituationalJudgementTestProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();

  const [questions, setQuestions] = useState<SJTQuestion[]>();
  const [testComplete, setTestComplete] = useState(false);
  const [testLoading, setTestLoading] = useState(false);

  const { seconds, minutes, hours, pause } = useStopwatch({ autoStart: true });

  useEffect(() => {
    if (testComplete) return pause();
  }, [testComplete, pause]);

  const mapAndSetQuestions = (data: any) => {
    const questions = data.map((question: any) =>
      question.questions.map((q: any) => ({
        ...q,
        success: null,
        shuffled: _.shuffle(q.options),
        id: question.id,
        scenario: question.scenario,
      }))
    );

    setQuestions(questions.flat());
  };

  useEffect(() => {
    const createTest = async () => {
      const test = await getTestById("situational-judgement", testId);
      if (!test.questions) {
        notFound();
      } else {
        const questionIds = Object.values(test.questions).flat() as string[];
        getQuestionsById(
          "situational-judgement",
          questionIds,
          mapAndSetQuestions
        );
      }
    };

    createTest();
  }, [testId]);

  useBeforeUnload(!testComplete);

  if (!questions || questions.length === 0) return <LoadingScreen />;

  const markTest = (data: any) => {
    const marked = questions.map((question, index) => {
      return question.type === "multiple"
        ? {
            // mc answer may be string or number
            ...question,
            success: question.answer == data[index],
          }
        : {
            // compare if arrays are equal and ordered the same
            ...question,
            success: _.isEqual(question.options, data[index]),
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
    const timeTaken = (hours * 3600 + minutes * 60 + seconds) * 1000;
    const type = { label: "Situational Judgement", name: "sjt" };
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
      <SJTTestCard
        questions={questions}
        handleEndTest={handleEndTest}
        testComplete={testComplete}
        testLoading={testLoading}
      />
    </>
  );
};

export default SituationalJudgementTest;
