"use client";

import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { Chip, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { deleteTest, getTests, patchQuestion } from "api/tests";
import { AdminDataGrid, EditDeleteActions } from "components/data-grid-custom";
import { ConfirmationDialog } from "components/global-components";
import { ILRTest } from "types";

const AllLRTests = () => {
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const [tests, setTests] = useState<ILRTest[]>([]);
  const [testToDelete, setTestToDelete] = useState<ILRTest | null>(null);

  useEffect(() => {
    // add event listener on firestore collection
    const unsubscribe = getTests("logical-reasoning", setTests);

    // remove event listener on unmount
    return () => unsubscribe();
  }, []);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
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
    if (!testToDelete) return;
    // delete reference to testId from each question
    const questionsUpdated = await testToDelete.questions.forEach(
      (question: string) =>
        patchQuestion("logical-reasoning", question, { testId: null })
    );

    // delete the test
    const testDeleted = await deleteTest(
      "logical-reasoning",
      testToDelete.id || ""
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
        All Logical Reasoning Tests
      </Typography>

      <AdminDataGrid columns={columns} rows={tests} />

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

export default AllLRTests;
