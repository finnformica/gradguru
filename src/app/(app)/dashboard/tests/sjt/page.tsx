"use client";

import { useSJTTests } from "api/tests";
import { LoadingScreen } from "components/global-components";
import SJTTestCard from "components/tests/sjt/sjt-test-card";
import TopPanel from "components/tests/sjt/top-panel";

const SituationJudgementTest = () => {
  const { questions: allQuestions } = useSJTTests();

  // map questions into a flat array
  const questions = allQuestions
    ?.slice(0, 4) // TODO: randomise questions
    .map((question) =>
      question.questions.map((q: any) => ({
        ...q,
        scenario: question.scenario,
      }))
    )
    .flat();

  if (!questions) return <LoadingScreen />;

  return (
    <>
      <TopPanel />
      <SJTTestCard questions={questions} />
    </>
  );
};

export default SituationJudgementTest;
