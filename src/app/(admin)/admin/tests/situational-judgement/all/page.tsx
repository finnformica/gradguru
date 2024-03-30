"use client";

import { useEffect, useState } from "react";

import { Chip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { getTests } from "api/tests";
import EditDeleteActions from "components/data-grid/edit-delete-action";
import { useSession } from "next-auth/react";

const AllSJTTests = () => {
  const { data: session } = useSession();
  const [tests, setTests] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTests("situational-judgement");
      setTests(res);
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "questions",
      headerName: "Questions",
      flex: 1,
      renderCell: (params) =>
        params.value.map((q: string) => (
          <Chip key={q} label={q} sx={{ mx: 0.5 }} />
        )),
    },
    {
      field: "created",
      headerName: "Created",
      width: 200,
      renderCell: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <EditDeleteActions
          session={session}
          onEditClick={() => {}}
          onDeleteClick={() => {}}
        />
      ),
    },
  ];

  return (
    <>
      <Typography variant="h4" pb={4}>
        All Situational Judgement Tests
      </Typography>
      <DataGrid
        rows={tests}
        columns={columns}
        autoHeight
        sx={{ minHeight: 400 }}
      />
    </>
  );
};

export default AllSJTTests;
