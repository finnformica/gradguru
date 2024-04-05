"use client";

import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { Chip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { deleteTest, getTests, patchQuestion } from "api/tests";
import { EditDeleteActions } from "components/data-grid-custom";
import { ConfirmationDialog } from "components/global-components";
import { INRTest } from "types";

const AllNRTests = () => {
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();

  const [tests, setTests] = useState<INRTest[]>([]);
  const [testToDelete, setTestToDelete] = useState<INRTest | null>(null);

  useEffect(() => {
    // add event listener on firestore collection
    const unsubscribe = getTests("numerical-reasoning", setTests);

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
        (Object.values(params.value).flat() as string[]).map((q) => (
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

    const flattenedQuestions = Object.values(
      testToDelete.questions
    ).flat() as string[];

    // delete reference to testId from each question
    const questionsUpdated = await flattenedQuestions.forEach((question) =>
      patchQuestion("numerical-reasoning", question, { testId: null })
    );

    // delete the test
    const testDeleted = await deleteTest(
      "numerical-reasoning",
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
        All Numerical Reasoning Tests
      </Typography>
      <DataGrid
        rows={tests}
        columns={columns}
        autoHeight
        pageSizeOptions={[15, 25, 50, 100]}
        initialState={{
          pagination: { paginationModel: { pageSize: 15 } },
          sorting: { sortModel: [{ field: "created", sort: "desc" }] },
        }}
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

export default AllNRTests;
