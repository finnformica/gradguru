"use client";

import Image from "next/image";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

import { AccountCircle } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { GridColDef, GridRowId } from "@mui/x-data-grid";

import { updateUser, useUsers } from "api/user";
import UserEditModal from "components/admin/users/user-edit-modal";
import { AdminDataGrid, EditDeleteActions } from "components/data-grid-custom";
import { ConfirmationDialog, LoadingScreen } from "components/global";
import { deleteUserAuth } from "lib/firebase/config";
import { IUserFormInput } from "types";
import { IUser } from "types/user";
import { indexToRoleMapping } from "utils/permissions";

const UsersPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [idToDelete, setIdToDelete] = useState<GridRowId | null>("");
  const [userToEdit, setUserToEdit] = useState<IUser | null>(null);

  const { users, loading, refresh } = useUsers();

  const onSubmit: SubmitHandler<IUserFormInput> = async (
    form: IUserFormInput
  ) => {
    const data = {
      ...userToEdit,
      email: form.email,
      displayName: form.displayName,
      role: form.role.value,
      courses: form.courses,
    };

    updateUser(userToEdit!.id as string, data)
      .then(() => enqueueSnackbar("User updated"))
      .catch((err: any) =>
        enqueueSnackbar(`Something went wrong - ${err.statusText}`, {
          variant: "error",
        })
      )
      .finally(() => {
        cleanUp();
        refresh(); // TODO: refresh not working
      });
  };

  const cleanUp = () => {
    setUserToEdit(null);
  };

  const handleUserDelete = () => {
    deleteUserAuth()
      .then(() => enqueueSnackbar("User deleted"))
      .catch((err: any) =>
        enqueueSnackbar(`Something went wrong - ${err.statusText}`, {
          variant: "error",
        })
      )
      .finally(() => {
        setIdToDelete(null);
        refresh(); // TODO: refresh not working
      });
  };

  if (!users || loading) return <LoadingScreen />;

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 270 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "displayName",
      headerName: "Name",
      width: 200,
      valueGetter: (params) => params.row.displayName || "-",
    },
    {
      field: "courses",
      headerName: "Courses",
      width: 200,
      valueGetter: (params) =>
        params.row.courses.length > 0 ? params.row.courses.join(", ") : "-",
    },
    {
      field: "roleIndex",
      headerName: "Role Index",
      width: 100,
      valueGetter: (params) => params.row.role,
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
      valueGetter: (params) => indexToRoleMapping[params.row.role],
    },
    {
      field: "photoURL",
      headerName: "Image",
      renderCell: (params) =>
        params.value ? (
          <Image
            alt="User profile image"
            src={params.value}
            width={30}
            height={30}
            style={{ borderRadius: "50%" }}
          />
        ) : (
          <AccountCircle />
        ),
      width: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <EditDeleteActions
            onEditClick={() => setUserToEdit(params.row)}
            onDeleteClick={() => setIdToDelete(params.row.id)}
          />
        );
      },
    },
  ];

  return (
    <>
      <Typography variant="h4" pb={2}>
        All users
      </Typography>

      <AdminDataGrid columns={columns} rows={users} />

      {userToEdit && (
        <UserEditModal
          open={!!userToEdit}
          onClose={cleanUp}
          defaultValues={{
            ...userToEdit,
            role: {
              value: userToEdit.role as number,
              label: indexToRoleMapping[userToEdit.role],
            },
          }}
          onSubmit={onSubmit}
        />
      )}
      {idToDelete && (
        <ConfirmationDialog
          title="Are you sure you want to delete this user?"
          open={!!idToDelete}
          onClose={() => setIdToDelete(null)}
          onSubmit={handleUserDelete}
          confirmText="Delete"
        />
      )}
    </>
  );
};

export default UsersPage;
