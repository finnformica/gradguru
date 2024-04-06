"use client";

import { useEffect, useState } from "react";

import _ from "lodash";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";

import { Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

import { deleteQuestion, getQuestions } from "api/tests";
import { EditDeleteActions } from "components/data-grid-custom";
import {
  ConfirmationDialog,
  LoadingScreen,
} from "components/global-components";
import { INRQuestion } from "types";
import LRModal from "components/aptitude-tests/logical-reasoning/lr-admin-edit-modal";
import { mapObjectToNestedArray } from "components/aptitude-tests/logical-reasoning/utils";

const AllLRQuestions = () => {
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const [questions, setQuestions] = useState<any[] | null>(null);
  const [questionToEdit, setQuestionToEdit] = useState<INRQuestion | null>(
    null
  );
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);

  useEffect(() => {
    // add event listener on firestore collection
    const unsubscribe = getQuestions("logical-reasoning", setQuestions);

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
    },
    {
      field: "type",
      headerName: "Type",
      width: 200,
      renderCell: (params) => _.startCase(params.value),
    },
    {
      field: "gridType",
      headerName: "Grid",
      width: 100,
      renderCell: (params) => _.startCase(params.row.grid.type),
    },
    {
      field: "rows",
      headerName: "Rows",
      width: 70,
      renderCell: (params) => params.row.grid.rows,
    },
    {
      field: "templateType",
      headerName: "Template",
      width: 100,
      renderCell: (params) => _.startCase(params.row.grid.template),
    },
    {
      field: "created",
      headerName: "Created",
      width: 150,
      renderCell: (params) => {
        return new Date(params.value as number).toLocaleString();
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <EditDeleteActions
          session={session}
          onEditClick={() => {
            const question = params.row;

            question.grid.data = mapObjectToNestedArray(question.grid.data);
            question.grid.options = mapObjectToNestedArray(
              question.grid.options
            );
            setQuestionToEdit(question);
          }}
          onDeleteClick={() => {
            setQuestionToDelete(params.row.id as string);
          }}
        />
      ),
    },
  ];

  const handleDelete = async () => {
    if (!questionToDelete) {
      enqueueSnackbar("Something went wrong - no question found", {
        variant: "error",
      });
      return;
    }

    deleteQuestion("logical-reasoning", questionToDelete)
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
        All LR questions
      </Typography>

      <DataGrid
        rows={questions}
        columns={columns}
        disableDensitySelector
        disableRowSelectionOnClick
        rowHeight={40}
        autoHeight
        pageSizeOptions={[15, 25, 50, 100]}
        initialState={{
          pagination: { paginationModel: { pageSize: 15 } },
          sorting: { sortModel: [{ field: "created", sort: "desc" }] },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            printOptions: { disableToolbarButton: true },
            csvOptions: { disableToolbarButton: true },
          },
        }}
      />
      {questionToEdit && (
        <LRModal question={questionToEdit} setQuestion={setQuestionToEdit} />
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

export default AllLRQuestions;
