"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Card, Rating } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

import { userUserMeta } from "api/user";
import { LoadingScreen } from "components/global-components";

import TopPanel from "./top-panel";

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
];

const CourseTests = () => {
  const [tests, setTests] = useState<any>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    userUserMeta(session.user.id).then((data) =>
      setTests(
        data?.testRecords.map((test: any) => ({
          type: test.type.label,
          score: test.score.percent,
          id: test.date,
          rating: test.score.percent,
        }))
      )
    );
  }, [session]);

  if (!session) return <LoadingScreen />;

  return (
    <>
      <TopPanel />
      <Card elevation={0}>
        <DataGrid
          rows={tests || []} // TODO: no rows overlay not displaying
          columns={columns}
          loading={!tests}
          sx={{
            minHeight: 400,
          }}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              printOptions: { disableToolbarButton: true },
              csvOptions: { disableToolbarButton: true },
            },
          }}
        />
      </Card>
    </>
  );
};

export default CourseTests;
