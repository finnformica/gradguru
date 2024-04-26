"use client";

import { useEffect, useState } from "react";

import { useSnackbar } from "notistack";

import { Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { deleteResource, getResources } from "api/resources";
import { AdminDataGrid, EditDeleteActions } from "components/data-grid-custom";
import { ConfirmationDialog, LoadingScreen } from "components/global";
import { ResourceEditModal } from "components/resources";
import { deleteStorageItem, retrieveStorageItem } from "lib/firebase/utils";
import { IResource } from "types";

const AllResources = () => {
  const { enqueueSnackbar } = useSnackbar();
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

  if (!resources) return <LoadingScreen />;

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
            onEditClick={() => {
              const { file: path } = params.row;
              retrieveStorageItem(path).then((file) =>
                setResourceToEdit({ ...params.row, file })
              );
            }}
            onDeleteClick={() => setResourceToDelete(params.row)}
          />
        );
      },
    },
  ];

  const handleDelete = async () => {
    if (!resourceToDelete?.id || !resourceToDelete.file || !resourceToDelete) {
      enqueueSnackbar("Something went wrong - resource not found", {
        variant: "error",
      });
      return;
    }

    deleteStorageItem(resourceToDelete.file as string);

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

      {resourceToEdit && (
        <ResourceEditModal
          open={!!resourceToEdit}
          resource={resourceToEdit}
          setResource={setResourceToEdit}
        />
      )}
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
