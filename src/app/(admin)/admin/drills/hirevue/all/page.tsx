"use client";

import { useState } from "react";
import { useSnackbar } from "notistack";

import { Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { AdminDataGrid, EditDeleteActions } from "components/data-grid-custom";
import { ConfirmationDialog, LoadingScreen } from "components/global";

import { mock } from "components/drills/hirevue/constants";
import { IHirevueQuestion } from "types/hirevue";
import { HirevueQuestionEditModal } from "components/drills/hirevue";

const AddHirevueQuestion = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);
  const [questionToEdit, setQuestionToEdit] = useState<IHirevueQuestion | null>(
    null
  );

  if (!mock) return <LoadingScreen />;

  const handleDelete = () => {
    console.log(questionToDelete);

    enqueueSnackbar("Hirevue question deleted");

    setQuestionToDelete(null);
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

      <AdminDataGrid columns={columns} rows={mock} />

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
