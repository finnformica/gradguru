"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { AccountCircle } from "@mui/icons-material";
import { Typography } from "@mui/material";

import FullFeaturedCrudGrid from "@/components/Global/FullFeaturedCrudGrid";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { User } from "next-auth";

const indexToRoleMapping: { [index: number]: string } = {
  1: "Read Only (User)",
  2: "Read, Create",
  3: "Read, Create, Update",
  4: "Full CRUD",
};

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
  const [users, setUsers] = useState<User[]>([]);
  const [idToEdit, setIdToEdit] = useState<GridRowId>("");
  const [loading, setLoading] = useState(true);

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
    </>
  );
};

export default UsersPage;
