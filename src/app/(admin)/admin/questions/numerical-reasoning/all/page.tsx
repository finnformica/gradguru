"use client";

import { useState } from "react";

import _ from "lodash";
import { useSession } from "next-auth/react";

import { Typography } from "@mui/material";

import {
  ConfirmationDialog,
  LoadingScreen,
} from "components/global-components";
import NRModal from "components/NRForm/NRModal";
import { NRQuestion } from "components/NRForm/types";

import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { deleteNRTest, useNRTests } from "api/tests";
import EditDeleteActions from "components/data-grid/edit-delete-action";
import { useSnackbar } from "notistack";

const AllNRQuestions = () => {
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const [questionToEdit, setQuestionToEdit] = useState<NRQuestion | null>(null);
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);
  const { questions, loading, refresh } = useNRTests();

  if (!questions || loading || !session) return <LoadingScreen />;

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
      width: 80,
      renderCell: (params) => _.startCase(params.value as string),
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
      renderCell: (params) => {
        return (
          <EditDeleteActions
            session={session}
            onEditClick={() => {
              setQuestionToEdit(params.row as NRQuestion);
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

    deleteNRTest(questionToDelete)
      .then(() => enqueueSnackbar("NR question deleted"))
      .catch((err) =>
        enqueueSnackbar(`Something went wrong - ${err.statusText}`, {
          variant: "error",
        })
      )
      .finally(() => {
        refresh();
        setQuestionToDelete(null);
      });
  };

  return (
    <>
      <Typography variant="h4" pb={2}>
        All NR questions
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
        <NRModal
          question={questionToEdit}
          setQuestion={setQuestionToEdit}
          refresh={refresh}
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
