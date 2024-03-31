import _ from "lodash";

export const combineTestsAndRecords = (tests: any[], records: any[]) => {
  return tests.map((test) => {
    const testRecord = records.find((record) => record.id === test.id);

    if (!testRecord) return test;

    const { results } = testRecord;

    const avgTime =
      results.reduce((acc: number, curr: any) => acc + curr.time, 0) /
      results.length;
    const avgScore =
      results.reduce((acc: number, curr: any) => acc + curr.score.percent, 0) /
      results.length; // percent
    const bestScore = results
      .map((r: any) => r.score.percent)
      .sort((a: number, b: number) => b - a)[0];

    return { ...test, avgTime, avgScore, bestScore };
  });
};

export const formatTableOrGraph = (data: any) => {
  const questions = data.questions.map((q: any) => ({
    ...q,
    ..._.omit(data, ["questions", "created", "testId"]),
    success: null,
  }));

  return questions;
};

export const formatGmat = (data: any) => {
  const question = {
    ..._.omit(data, "created", "testId"),
    success: null,
  };

  return question;
};

const containsNum = (str: string) => /\d/.test(str);

export const sortAlphaNumeric = (a: any, b: any) => {
  const nameA = a.toLowerCase();
  const nameB = b.toLowerCase();

  if (containsNum(nameA) && containsNum(nameB)) {
    const numA = nameA.match(/\d+/)[0];
    const numB = nameB.match(/\d+/)[0];

    if (numA !== numB) return numA - numB;
  }

  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;

  return 0;
};
