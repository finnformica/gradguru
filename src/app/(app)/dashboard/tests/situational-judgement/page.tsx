"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { PlayArrow } from "@mui/icons-material";
import { Card, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { getTestRecords, getTests } from "api/tests";
import { LoadingScreen, PageBreadcrumbs } from "components/global-components";
import { ISJTest, ITestRecord } from "types";
import { combineTestsAndRecords, sortAlphaNumeric } from "utils/user-tests";

const TopPanel = () => {
  return (
    <Stack
      pb={4}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <PageBreadcrumbs
        header="Situational Judgement"
        links={[
          { label: "Tests", href: "/dashboard/tests" },
          { label: "Situational Judgement" },
        ]}
      />
    </Stack>
  );
};

const SituationalJudgementHome = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [tests, setTests] = useState<ISJTest[] | null>(null);
  const [testRecords, setTestRecords] = useState<ITestRecord[] | null>(null);

  useEffect(() => {
    // add event listener on firestore collection
    const unsubscribe = getTests("situational-judgement", setTests);

    // remove event listener on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    const unsubscribe = getTestRecords(
      "situational-judgement",
      session?.user?.id,
      setTestRecords
    );

    return () => unsubscribe();
  }, [session]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      flex: 1,
      sortComparator: sortAlphaNumeric,
    },
    {
      field: "avgTime",
      headerName: "Average Time",
      width: 200,
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
    {
      field: "avgScore",
      headerName: "Average Score",
      width: 200,
      renderCell: (params) =>
        params.value || params.value === 0
          ? `${(params.value * 100).toFixed(2)}%`
          : null,
    },
    {
      field: "bestScore",
      headerName: "Best Score",
      width: 200,
      renderCell: (params) =>
        params.value || params.value === 0
          ? `${(params.value * 100).toFixed(2)}%`
          : null,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Start Test">
            <IconButton
              size="small"
              onClick={() =>
                router.push(
                  `/dashboard/tests/situational-judgement/${params.row.id}`
                )
              }
            >
              <PlayArrow sx={{ color: "grey.400" }} />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  if (!tests) return <LoadingScreen />;

  return (
    <>
      <TopPanel />
      <Card elevation={0}>
        <DataGrid
          rows={combineTestsAndRecords(tests, testRecords || [])}
          columns={columns}
          autoHeight
          hideFooter
          hideFooterPagination
          initialState={{
            sorting: { sortModel: [{ field: "name", sort: "asc" }] },
          }}
        />
      </Card>
    </>
  );
};

export default SituationalJudgementHome;
