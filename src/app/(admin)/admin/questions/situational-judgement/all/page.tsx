"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";

import { Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

import { deleteSJTTest, useSJTTests } from "api/tests";
import { SJTModal } from "components/SJTForm";
import { SJTQuestion } from "components/SJTForm/types";
import DataGridActions from "components/data-grid/data-grid-actions";
import {
  ConfirmationDialog,
  LoadingScreen,
} from "components/global-components";

const AllSJTQuestions = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();
  const [questionToEdit, setQuestionToEdit] = useState<SJTQuestion | null>(
    null
  );
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);
  const { questions, loading, refresh } = useSJTTests();

  if (!questions || loading || !session) return <LoadingScreen />;

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
          <DataGridActions
            session={session}
            onEditClick={() => setQuestionToEdit(params.row as SJTQuestion)}
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

    deleteSJTTest(questionToDelete)
      .then(() => enqueueSnackbar("SJT question updated"))
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
        All SJT questions
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
        <SJTModal
          open={!!questionToEdit}
          question={questionToEdit}
          setQuestion={setQuestionToEdit}
          refresh={refresh}
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
