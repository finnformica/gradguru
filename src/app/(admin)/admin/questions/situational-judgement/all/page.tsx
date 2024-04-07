"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";

import { Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { deleteQuestion, getQuestions } from "api/tests";
import { SJTModal } from "components/aptitude-tests/situational-judgement";
import { EditDeleteActions, AdminDataGrid } from "components/data-grid-custom";
import {
  ConfirmationDialog,
  LoadingScreen,
} from "components/global-components";
import { ISJScenario } from "types";

const AllSJTQuestions = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();
  const [questionToEdit, setQuestionToEdit] = useState<ISJScenario | null>(
    null
  );
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[] | null>(null);

  useEffect(() => {
    // add event listener on firestore collection
    const unsubscribe = getQuestions("situational-judgement", setQuestions);

    // remove event listener on unmount
    return () => unsubscribe();
  }, []);

  if (!questions || !session) return <LoadingScreen />;

  const columns: GridColDef[] = [
    {
      field: "scenario",
      headerName: "Scenario",
      flex: 1,
    },
    {
      field: "created",
      headerName: "Created",
      width: 150,
      renderCell: (params) => new Date(params.value).toLocaleString(),
      valueGetter: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <EditDeleteActions
            session={session}
            onEditClick={() => setQuestionToEdit(params.row as ISJScenario)}
            onDeleteClick={() => setQuestionToDelete(params.row.id)}
          />
        );
      },
    },
  ];

  const handleDelete = async () => {
    if (!questionToDelete) {
      enqueueSnackbar("Something went wrong - form not found", {
        variant: "error",
      });
      return;
    }

    deleteQuestion("situational-judgement", questionToDelete)
      .then(() => enqueueSnackbar("SJT question deleted"))
      .catch((err) =>
        enqueueSnackbar(`Something went wrong - ${err.statusText}`, {
          variant: "error",
        })
      )
      .finally(() => setQuestionToDelete(null));
  };

  return (
    <>
      <Typography variant="h4" pb={2}>
        All SJT questions
      </Typography>

      <AdminDataGrid columns={columns} rows={questions} />

      {questionToEdit && (
        <SJTModal
          open={!!questionToEdit}
          question={questionToEdit}
          setQuestion={setQuestionToEdit}
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

export default AllSJTQuestions;
