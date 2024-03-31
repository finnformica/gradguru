"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { PlayArrow } from "@mui/icons-material";
import { Card, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { getTests } from "api/tests";
import { LoadingScreen, PageBreadcrumbs } from "components/global-components";

const TopPanel = () => {
  return (
    <Stack
      pb={4}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <PageBreadcrumbs
        header="Numerical Reasoning"
        links={[
          { label: "Tests", href: "/dashboard/tests" },
          { label: "Numerical Reasoning" },
        ]}
      />
    </Stack>
  );
};

const NumericalReasoningHome = () => {
  const router = useRouter();
  const [tests, setTests] = useState<any[] | null>(null);

  useEffect(() => {
    // add event listener on firestore collection
    const unsubscribe = getTests("numerical-reasoning", setTests);

    // remove event listener on unmount
    return () => unsubscribe();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      flex: 1,
      sortComparator: (v1, v2) => v1.localeCompare(v2),
    },
    {
      field: "avgTime",
      headerName: "Average Time",
      width: 200,
    },
    {
      field: "avgScore",
      headerName: "Average Score",
      width: 200,
    },
    {
      field: "bestScore",
      headerName: "Best Score",
      width: 200,
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
                  `/dashboard/tests/numerical-reasoning/${params.row.id}`
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
          rows={tests}
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

export default NumericalReasoningHome;
