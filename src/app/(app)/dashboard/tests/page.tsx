"use client";

import _ from "lodash";

import { Card, CardActionArea, CardHeader, Grid, Rating } from "@mui/material";

import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import TopPanel from "./top-panel";

// keep for test pages
const columns: GridColDef[] = [
  { field: "type", headerName: "Type", width: 250 },
  {
    field: "score",
    headerName: "Score",
    width: 150,
    renderCell: (params) => `${(params.value * 100).toFixed(2)}%`,
  },
  {
    field: "id",
    headerName: "Date",
    width: 200,
    renderCell: (params) => new Date(params.value).toLocaleString(),
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 150,
    renderCell: (params) => (
      <Rating value={Math.ceil(params.value * 5)} readOnly />
    ),
  },
  {
    field: "time",
    headerName: "Time taken",
    width: 150,
    renderCell: (params) => {
      const date = new Date(params.value);
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const seconds = date.getUTCSeconds();

      return params.value
        ? `${hours ? `${hours}h ` : ""}${minutes ? `${minutes}m ` : ""}${seconds ? `${seconds}s` : ""}`
        : null;
    },
  },
];

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
