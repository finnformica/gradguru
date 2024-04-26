"use client";

import { useState } from "react";

import { Typography } from "@mui/material";

import { AdminDataGrid, EditDeleteActions } from "components/data-grid-custom";
import { ConfirmationDialog } from "components/global";
import { GridColDef } from "@mui/x-data-grid";
import { useSession } from "next-auth/react";

const AddHirevueQuestion = () => {
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);
  const { data: session } = useSession();

  const columns: GridColDef[] = [
    {
      field: "question",
      headerName: "Question",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
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
            session={session}
            onEditClick={() => console.log(params.row)}
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

      <AdminDataGrid columns={columns} rows={[]} />

      {questionToDelete && (
        <ConfirmationDialog
          title="Are you sure you want to delete this question?"
          open={!!questionToDelete}
          onSubmit={() => console.log(questionToDelete)}
          onClose={() => setQuestionToDelete(null)}
          confirmText="Delete"
        />
      )}
    </>
  );
};

export default AddHirevueQuestion;
