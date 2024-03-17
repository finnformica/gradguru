"use client";

import { useSJTTests } from "api/tests";
import { LoadingScreen } from "components/global-components";
import SJTTestCard from "components/tests/sjt/sjt-test-card";
import TopPanel from "components/tests/sjt/top-panel";
import { useSnackbar } from "notistack";

const SituationalJudgementTest = () => {
  const { questions: allQuestions } = useSJTTests();
  const { enqueueSnackbar } = useSnackbar();

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

  const onSubmit = (data: any) => {
    console.log("form submitted");
    console.log("data", data);

    if (Object.keys(data).length !== questions.length) {
      enqueueSnackbar("Not all questions answered", { variant: "error" });
      return;
    }
  };

  return (
    <>
      <TopPanel />
      <SJTTestCard questions={questions} handleEndTest={onSubmit} />
    </>
  );
};

export default SituationalJudgementTest;
