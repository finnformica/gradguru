"use client";

import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { Chip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { deleteTest, getTests, patchQuestion } from "api/tests";
import EditDeleteActions from "components/data-grid/edit-delete-action";
import { ConfirmationDialog } from "components/global-components";

const AllSJTTests = () => {
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const [tests, setTests] = useState<any[]>([]);
  const [testToDelete, setTestToDelete] = useState<any | null>(null);

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
      width: 200,
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
      width: 100,
      renderCell: (params) => (
        <EditDeleteActions
          session={session}
          onDeleteClick={() => setTestToDelete(params.row)}
        />
      ),
    },
  ];

  const handleDeleteTest = async () => {
    // delete reference to testId from each question
    const questionsUpdated = await testToDelete.questions.forEach(
      (question: string) =>
        patchQuestion(question, "situational-judgement", { testId: null })
    );

    // delete the test
    const testDeleted = await deleteTest(
      "situational-judgement",
      testToDelete.id
    );

    // wait for all promises to resolve
    Promise.all([questionsUpdated, testDeleted])
      .then(() => enqueueSnackbar("Test deleted"))
      .catch(() => enqueueSnackbar("Error deleting test"))
      .finally(() => setTestToDelete(null));
  };

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
      {testToDelete && (
        <ConfirmationDialog
          open={!!testToDelete}
          onClose={() => setTestToDelete(null)}
          onSubmit={handleDeleteTest}
          title="Are you sure you want to delete this test?"
          confirmText="Delete"
        />
      )}
    </>
  );
};

export default AllSJTTests;
