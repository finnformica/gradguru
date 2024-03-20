"use client";

import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import _ from "lodash";

import { createTestRecord, useSJTTests } from "api/tests";
import { LoadingScreen } from "components/global-components";
import SJTTestCard from "components/tests/sjt/sjt-test-card";
import TopPanel from "components/tests/sjt/top-panel";
import { useSession } from "next-auth/react";

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

const SituationalJudgementTest = () => {
  const { data: session } = useSession();
  const [testComplete, setTestComplete] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const { questions: allQuestions } = useSJTTests();
  const { enqueueSnackbar } = useSnackbar();

  // map questions into a flat array
  const [questions, setQuestions] = useState<SJTQuestion[]>();

  useEffect(() => {
    if (allQuestions) {
      setQuestions(
        _.shuffle(allQuestions)
          ?.slice(0, 4) // TODO: provide questions the user hasn't seen
          .map((question) =>
            question.questions.map((q: any) => ({
              ...q,
              success: null,
              shuffled: _.shuffle(q.options),
              id: question.id,
              scenario: question.scenario,
            }))
          )
          .flat()
      );
    }
  }, [allQuestions]);

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
    // TODO: include time taken
    const correct = marked.filter((q) => q.success).length;
    const score = {
      percent: correct / marked.length,
      correct: correct,
      total: marked.length,
    };
    const date = Date.now();
    const type = { label: "Situational Judgement", name: "sjt" };
    const questionIds = Array.from(new Set(marked.map((q) => q.id)));

    // store results
    createTestRecord({ score, date, type, questionIds }, session!.user.id);

    // update state
    setQuestions(marked);
    setTestComplete(true);
    setTestLoading(false);
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