"use client";

import _ from "lodash";
import { useRouter } from "next/navigation";

import { Card, CardActionArea, CardHeader, Grid } from "@mui/material";

import TopPanel from "./top-panel";

const CourseTests = () => {
  const router = useRouter();
  const tests: string[] = [
    "Numerical Reasoning",
    "Situational Judgement",
    "Logical Reasoning",
  ];

  return (
    <>
      <TopPanel />
      <Grid container spacing={2}>
        {tests.map((test) => (
          <Grid key={test} item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ mb: 2, borderRadius: 4 }}>
              <CardActionArea
                onClick={() =>
                  router.push(`/dashboard/tests/${_.kebabCase(test)}`)
                }
              >
                <CardHeader title={test} />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CourseTests;
