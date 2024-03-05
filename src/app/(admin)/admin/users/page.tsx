"use client";

import { useEffect, useState } from "react";

import { User } from "next-auth";
import Image from "next/image";

import { AccountCircle } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { SubmitHandler } from "react-hook-form";

import { indexToRoleMapping } from "@/utils/permissions";
import { deleteUser, postUser, useUsers } from "@/api/user";

import FullFeaturedCrudGrid from "@/components/global-components/FullFeaturedCrudGrid";
import UserEditModal from "@/components/admin/users/user-edit-modal";
import { LoadingScreen } from "@/components/global-components";
import ConfirmationDialog from "@/components/global-components/confirmation-dialog";
import { IUserFormInput } from "@/components/globalTypes";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 250 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "name", headerName: "Name", width: 200 },
  {
    field: "courses",
    headerName: "Courses",
    width: 200,
    renderCell: (params) => params.value.join(", "),
  },
  { field: "roleIndex", headerName: "Role Index", width: 100 },
  { field: "role", headerName: "Role", width: 200 },
  {
    field: "image",
    headerName: "Image",
    renderCell: (params) =>
      params.value ? (
        <Image
          alt="user profile image"
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
];

const UsersPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [idToEdit, setIdToEdit] = useState<GridRowId | null>(""); // clean up use of ID and user
  const [idToDelete, setIdToDelete] = useState<GridRowId | null>("");
  const [userToEdit, setUserToEdit] = useState<User>();

  const { users, loading, refresh } = useUsers();

  const onSubmit: SubmitHandler<IUserFormInput> = async (
    form: IUserFormInput
  ) => {
    const data = {
      name: form.name,
      email: form.email,
      role: form.role.value,
      courses: form.courses,
    };

    postUser(userToEdit!.id as string, data)
      .then(() => enqueueSnackbar("User updated"))
      .catch((err) =>
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
    setIdToEdit(null);
    setUserToEdit(undefined);
  };

  const handleUserDelete = () => {
    deleteUser(idToDelete as string)
      .then(() => enqueueSnackbar("User deleted"))
      .catch((err) =>
        enqueueSnackbar(`Something went wrong - ${err.statusText}`, {
          variant: "error",
        })
      )
      .finally(() => {
        setIdToDelete(null);
        refresh(); // TODO: refresh not working
      });
  };

  useEffect(() => {
    if (idToEdit) {
      setUserToEdit(users?.find((user) => user.id === idToEdit));
    }
  }, [idToEdit, users]);

  if (!users || loading) return <LoadingScreen />;

  return (
    <>
      <Typography variant="h4" pb={2}>
        All users
      </Typography>
      <FullFeaturedCrudGrid
        rows={users.map((user) => ({
          id: user.id as string,
          email: user.email as string,
          name: user.name as string,
          courses: user.courses as string[],
          roleIndex: user.role as number,
          role: indexToRoleMapping[user.role] as string,
          image: user.image as string,
        }))}
        columns={columns}
        loading={loading}
        setIdToEdit={setIdToEdit}
        setIdToDelete={setIdToDelete}
      />
      {userToEdit && (
        <UserEditModal
          open={!!idToEdit}
          onClose={cleanUp}
          defaultValues={{
            name: userToEdit.name as string,
            email: userToEdit.email as string,
            role: {
              value: userToEdit.role,
              label: indexToRoleMapping[userToEdit.role],
            },
            courses: userToEdit.courses,
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
