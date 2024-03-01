"use client";

import { User } from "next-auth";
import Image from "next/image";
import { useEffect, useState } from "react";

import { AccountCircle } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { SubmitHandler } from "react-hook-form";

import FullFeaturedCrudGrid from "@/components/Global/FullFeaturedCrudGrid";
import { indexToRoleMapping } from "@/utils/permissions";

import UserEditModal from "@/components/admin/users/user-edit-modal";
import { IUserFormInput } from "@/components/globalTypes";
import { useAlert } from "@/context/adminAlert";

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
  const { setAlertState } = useAlert();
  const [users, setUsers] = useState<User[]>([]);
  const [idToEdit, setIdToEdit] = useState<GridRowId | null>(""); // clean up use of ID and user
  const [userToEdit, setUserToEdit] = useState<User>();
  const [loading, setLoading] = useState(true);

  const onSubmit: SubmitHandler<IUserFormInput> = async (
    form: IUserFormInput
  ) => {
    const data = {
      name: form.name,
      email: form.email,
      role: form.role.value,
      courses: form.courses,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=users&document=${userToEdit!.id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (response.status !== 200) {
      setAlertState({
        message: "Uh oh! Error occurred :(",
        open: true,
        severity: "error",
      });
    } else {
      setAlertState({
        message: "User updated",
        open: true,
        severity: "success",
      });
    }
  };

  const cleanUp = () => {
    setIdToEdit(null);
    setUserToEdit(undefined);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=users`
      );
      const data = await response.json();

      setUsers(data.documents);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (idToEdit) {
      setUserToEdit(users.find((user) => user.id === idToEdit));
    }
  }, [idToEdit, users]);

  return (
    <>
      <Typography variant="h4" pb={2}>
        All users
      </Typography>
      {users && users.length > 0 && (
        <FullFeaturedCrudGrid
          rows={users.map((user) => {
            return {
              id: user.id as string,
              email: user.email as string,
              name: user.name as string,
              courses: user.courses as string[],
              roleIndex: user.role as number,
              role: indexToRoleMapping[user.role] as string,
              image: user.image as string,
            };
          })}
          columns={columns}
          loading={loading}
          setIdToEdit={setIdToEdit}
        />
      )}
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
    </>
  );
};

export default UsersPage;
