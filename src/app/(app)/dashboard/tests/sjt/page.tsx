"use client";

import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import _ from "lodash";

import { useSJTTests } from "api/tests";
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
};

const SituationalJudgementTest = () => {
  const [testComplete, setTestComplete] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const { questions: allQuestions } = useSJTTests();
  const { enqueueSnackbar } = useSnackbar();

  // map questions into a flat array
  const [questions, setQuestions] = useState<SJTQuestion[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (allQuestions) {
      setQuestions(
        allQuestions
          ?.slice(0, 4) // TODO: randomise questions
          .map((question) =>
            question.questions.map((q: any) => ({
              ...q,
              shuffled: _.shuffle(q.options),
              scenario: question.scenario,
              success: null,
            }))
          )
          .flat()
      );
    }
  }, [allQuestions]);

  if (!questions) return <LoadingScreen />;

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

    // TODO: store results

    setQuestions(marked);
    setTestComplete(true);
    setTestLoading(false);
  };

  const onSubmit = (data: any) => {
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
        handleEndTest={onSubmit}
        testComplete={testComplete}
        testLoading={testLoading}
      />
    </>
  );
};

export default SituationalJudgementTest;
