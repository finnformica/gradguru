"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { PlayArrow } from "@mui/icons-material";
import { Card, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { getTestRecords, getTests } from "api/tests";
import { LoadingScreen, PageBreadcrumbs } from "components/global";
import { useSession } from "context/user";
import { INRTest, ITestRecord } from "types";
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
        header="Logical Reasoning"
        links={[
          { label: "Tests", href: "/dashboard/tests" },
          { label: "Logical Reasoning" },
        ]}
      />
    </Stack>
  );
};

const LogicalReasoningHome = () => {
  const { user } = useSession();
  const router = useRouter();

  const [tests, setTests] = useState<INRTest[] | null>(null);
  const [testRecords, setTestRecords] = useState<ITestRecord[] | null>(null);

  useEffect(() => {
    // add event listener on firestore collection
    const unsubscribe = getTests("logical-reasoning", setTests);

    // remove event listener on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = getTestRecords(
      "logical-reasoning",
      user?.id,
      setTestRecords
    );

    return () => unsubscribe();
  }, [user]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
      flex: 1,
      sortComparator: sortAlphaNumeric,
    },
    {
      field: "lastAttempt",
      headerName: "Last Attempt",
      width: 200,
      renderCell: (params) =>
        params.value ? new Date(params.value).toLocaleString() : null,
    },
    {
      field: "attempts",
      headerName: "Attempts",
      width: 120,
    },
    {
      field: "avgTime",
      headerName: "Average Time",
      width: 120,
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
      width: 120,
      renderCell: (params) =>
        params.value || params.value === 0
          ? `${(params.value * 100).toFixed(2)}%`
          : null,
    },
    {
      field: "bestScore",
      headerName: "Best Score",
      width: 120,
      renderCell: (params) =>
        params.value || params.value === 0
          ? `${(params.value * 100).toFixed(2)}%`
          : null,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Start Test">
            <IconButton
              size="small"
              onClick={() =>
                router.push(
                  `/dashboard/tests/logical-reasoning/${params.row.id}`
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
      <Card elevation={0} sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
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

export default LogicalReasoningHome;
