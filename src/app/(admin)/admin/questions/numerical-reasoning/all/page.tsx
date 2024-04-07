"use client";

import { useEffect, useState } from "react";

import _ from "lodash";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";

import { Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { deleteQuestion, getQuestions } from "api/tests";
import { NRModal } from "components/aptitude-tests/numerical-reasoning";
import { EditDeleteActions, AdminDataGrid } from "components/data-grid-custom";
import {
  ConfirmationDialog,
  LoadingScreen,
} from "components/global-components";
import { INRQuestion } from "types";

const AllNRQuestions = () => {
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const [questions, setQuestions] = useState<any[] | null>(null);
  const [questionToEdit, setQuestionToEdit] = useState<INRQuestion | null>(
    null
  );
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);

  useEffect(() => {
    // add event listener on firestore collection
    const unsubscribe = getQuestions("numerical-reasoning", setQuestions);

    // remove event listener on unmount
    return () => unsubscribe();
  }, []);

  if (!questions || !session) return <LoadingScreen />;

  const columns: GridColDef[] = [
    {
      field: "question",
      headerName: "Question",
      flex: 1,
      renderCell: (params) => {
        switch (params.row.type) {
          case "table":
            return params.row.questions[0].question;
          case "graph":
            return params.row.scenario;
          default:
            return params.value;
        }
      },
      valueGetter: (params) => {
        switch (params.row.type) {
          case "table":
            return params.row.questions[0].question;
          case "graph":
            return params.row.scenario;
          default:
            return params.value;
        }
      },
    },
    {
      field: "type",
      headerName: "Type",
      width: 80,
      renderCell: (params) => _.startCase(params.value),
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
            onEditClick={() => {
              setQuestionToEdit(params.row as INRQuestion);
            }}
            onDeleteClick={() => {
              setQuestionToDelete(params.row.id as string);
            }}
          />
        );
      },
    },
  ];

  const handleDelete = async () => {
    if (!questionToDelete) {
      enqueueSnackbar("Something went wrong - no question found", {
        variant: "error",
      });
      return;
    }

    deleteQuestion("numerical-reasoning", questionToDelete)
      .then(() => enqueueSnackbar("NR question deleted"))
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
        All NR questions
      </Typography>

      <AdminDataGrid columns={columns} rows={questions} />

      {questionToEdit && (
        <NRModal
          question={questionToEdit}
          setQuestion={setQuestionToEdit}
          handleDelete={handleDelete}
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

export default AllNRQuestions;
