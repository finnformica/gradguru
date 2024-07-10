"use client";

import { useEffect, useState } from "react";

import { useSnackbar } from "notistack";
import { useStopwatch } from "react-timer-hook";

import { Stack } from "@mui/material";

import { createTestRecord, getQuestionsById, getTestById } from "api/tests";
import { LRTestCard } from "components/aptitude-tests/logical-reasoning";
import {
  downloadImagesFromStorage,
  mapObjectToNestedArray,
} from "components/aptitude-tests/logical-reasoning/utils";
import { LoadingScreen, PageBreadcrumbs } from "components/global";
import { useBeforeUnload, useLocalStorage } from "hooks";
import { ILRQuestion, ILRTest } from "types";
import { useSession } from "context/user";
import { useRouter } from "next/navigation";
import { endpoints } from "utils/axios";

type LogicalReasoningTestProps = {
  params: {
    testId: string;
  };
};

const LogicalReasoningTest = ({
  params: { testId },
}: LogicalReasoningTestProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSession();

  const [questions, setQuestions] = useState<ILRQuestion[]>();
  const [testComplete, setTestComplete] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [test, setTest] = useState<ILRTest | null>(null);
  const router = useRouter();

  const [storedTest, setStoredTest] = useLocalStorage(
    "logical-reasoning-consulting",
    { [testId]: null }
  );

  const { seconds, minutes, hours, pause } = useStopwatch({ autoStart: true });

  useEffect(() => {
    if (testComplete) return pause();
  }, [testComplete, pause]);

  useEffect(() => {
    const createTest = async () => {
      const test = await getTestById("logical-reasoning", testId);

      const mapQuestions = (q: ILRQuestion[]) => {
        let res = q.map(async (question) => {
          question.grid.data = mapObjectToNestedArray(question.grid.data);
          question.grid.options = mapObjectToNestedArray(question.grid.options);

          const dataPromise = downloadImagesFromStorage(question.grid.data);
          const optionsPromise = downloadImagesFromStorage(
            question.grid.options
          );

          return Promise.all([dataPromise, optionsPromise]).then(
            ([dataGrid, optionsGrid]) => {
              const questionWithImageFiles = {
                ...question,
                grid: {
                  ...question.grid,
                  data: dataGrid,
                  options: optionsGrid,
                },
              };

              return questionWithImageFiles;
            }
          );
        });

        Promise.all(res).then((questions) => {
          setQuestions(questions); // set questions in local state
          setStoredTest({
            ...storedTest,
            [testId]: { questions, name: test.name },
          }); // store questions in local storage
        });
      };

      if (!test.questions) {
        router.push(`/dashboard/tests/${endpoints.paths.error404}`);
      } else {
        setTest(test);
        const questionIds = Object.values(test.questions).flat() as string[];
        getQuestionsById("logical-reasoning", questionIds, mapQuestions);
      }
    };

    if (storedTest[testId]) {
      setQuestions(storedTest[testId].questions);
      setTest({ name: storedTest[testId].name, questions: [] });
    } else {
      createTest();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testId]);

  useBeforeUnload(!testComplete);

  if (!questions || questions.length === 0 || !user) return <LoadingScreen />;

  const markTest = (data: any) => {
    const marked = questions.map((question, index) => ({
      ...question,
      success: question.answer === data[index],
    }));

    // calculate test metrics
    const correct = marked.filter((q) => q.success).length;
    const score = {
      percent: correct / marked.length,
      correct: correct,
      total: marked.length,
    };
    const date = Date.now();
    const timeTaken = (hours * 3600 + minutes * 60 + seconds) * 1000;
    const type = { label: "Logical Reasoning", name: "lr" };
    const questionIds = Array.from(new Set(marked.map((q) => q.id)));

    // store results
    createTestRecord("logical-reasoning", user?.id, testId, {
      score,
      date,
      type,
      questionIds,
      time: timeTaken,
    })
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
      <Stack
        pb={4}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <PageBreadcrumbs
          header={test?.name || "Logical Reasoning Test"}
          links={[
            { label: "Tests", href: "/dashboard/tests/logical-reasoning" },
            { label: "Logical Reasoning" },
          ]}
        />
      </Stack>
      <LRTestCard
        questions={questions}
        handleEndTest={handleEndTest}
        testComplete={testComplete}
        testLoading={testLoading}
      />
    </>
  );
};

export default LogicalReasoningTest;
