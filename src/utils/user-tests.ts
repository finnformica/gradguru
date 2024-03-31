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
