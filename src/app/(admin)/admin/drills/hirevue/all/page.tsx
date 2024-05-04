"use client";

import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import { Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { AdminDataGrid, EditDeleteActions } from "components/data-grid-custom";
import { ConfirmationDialog, LoadingScreen } from "components/global";

import { IHirevueQuestion } from "types/hirevue";
import { HirevueQuestionEditModal } from "components/drills/hirevue";
import { deleteHirevueQuestion, getHirevueQuestions } from "api/drills";

const AddHirevueQuestion = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [hirevueQuestions, setHirevueQuestions] = useState<
    IHirevueQuestion[] | null
  >(null);
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);
  const [questionToEdit, setQuestionToEdit] = useState<IHirevueQuestion | null>(
    null
  );

  useEffect(() => {
    // add event listener on firestore collection
    const unsubscribe = getHirevueQuestions("consulting", setHirevueQuestions);

    // remove event listener on unmount
    return () => unsubscribe();
  }, []);

  if (!hirevueQuestions) return <LoadingScreen />;

  const handleDelete = () => {
    if (!questionToDelete) return;

    deleteHirevueQuestion("consulting", questionToDelete)
      .then(() => enqueueSnackbar("Question deleted"))
      .catch(() =>
        enqueueSnackbar("Failed to delete question", { variant: "error" })
      )
      .finally(() => setQuestionToDelete(null));
  };

  const columns: GridColDef[] = [
    {
      field: "question",
      headerName: "Question",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      width: 120,
      valueGetter: (params) => params.value.label,
    },
    {
      field: "created",
      headerName: "Created",
      width: 180,
      valueGetter: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <EditDeleteActions
            onEditClick={() => setQuestionToEdit(params.row)}
            onDeleteClick={() => setQuestionToDelete(params.row.id)}
          />
        );
      },
    },
  ];

  return (
    <>
      <Typography variant="h4" pb={2}>
        All Hirevue Questions
      </Typography>

      <AdminDataGrid columns={columns} rows={hirevueQuestions} />

      {questionToEdit && (
        <HirevueQuestionEditModal
          open={!!questionToEdit}
          setQuestion={setQuestionToEdit}
          question={questionToEdit}
        />
      )}

      {questionToDelete && (
        <ConfirmationDialog
          title="Are you sure you want to delete this question?"
          open={!!questionToDelete}
          onSubmit={handleDelete}
          onClose={() => setQuestionToDelete(null)}
          confirmText="Delete"
        />
      )}
    </>
  );
};

export default AddHirevueQuestion;
