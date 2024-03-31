"use client";

import { useEffect, useState } from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PlayArrow } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";

import { getTests } from "api/tests";
import { LoadingScreen, PageBreadcrumbs } from "components/global-components";
import { useRouter } from "next/navigation";

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
        </Stack>
      ),
    },
  ];

  if (!tests) return <LoadingScreen />;

  return (
    <>
      <TopPanel />
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
    </>
  );
};

export default NumericalReasoningHome;
