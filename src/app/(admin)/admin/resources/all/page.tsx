"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";

import { Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { EditDeleteActions, AdminDataGrid } from "components/data-grid-custom";
import {
  ConfirmationDialog,
  LoadingScreen,
} from "components/global-components";
import { IResource } from "types";
import { deleteResource, getResources } from "api/resources";

const AllResources = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();
  const [resourceToEdit, setResourceToEdit] = useState<IResource | null>(null);
  const [resourceToDelete, setResourceToDelete] = useState<IResource | null>(
    null
  );
  const [resources, setResources] = useState<any[] | null>(null);

  useEffect(() => {
    // add event listener on firestore collection
    const unsubscribe = getResources("consulting", setResources);

    // remove event listener on unmount
    return () => unsubscribe();
  }, []);

  if (!resources || !session) return <LoadingScreen />;

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
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
            onEditClick={() => setResourceToEdit(params.row as IResource)}
            onDeleteClick={() => setResourceToDelete(params.row.id)}
          />
        );
      },
    },
  ];

  const handleDelete = async () => {
    if (!resourceToDelete?.id || !resourceToDelete) {
      enqueueSnackbar("Something went wrong - resource not found", {
        variant: "error",
      });
      return;
    }

    // TODO: delete document from storage

    deleteResource("consulting", resourceToDelete.id)
      .then(() => enqueueSnackbar("Resource  deleted"))
      .catch((err) =>
        enqueueSnackbar(`Something went wrong - ${err.statusText}`, {
          variant: "error",
        })
      )
      .finally(() => setResourceToDelete(null));
  };

  return (
    <>
      <Typography variant="h4" pb={2}>
        All Resources
      </Typography>

      <AdminDataGrid columns={columns} rows={resources} />

      {/* {resourceToEdit && (
        <SJTModal
          open={!!resourceToEdit}
          question={resourceToEdit}
          setQuestion={setResourceToEdit}
        />
      )} */}
      {resourceToDelete && (
        <ConfirmationDialog
          title="Are you sure you want to delete this resource?"
          open={!!resourceToDelete}
          onSubmit={handleDelete}
          onClose={() => setResourceToDelete(null)}
          confirmText="Delete"
        />
      )}
    </>
  );
};

export default AllResources;
