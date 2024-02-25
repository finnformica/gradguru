"use client";
import { LoadingWrapper } from "@/components/Global";
import React, { useEffect, useState } from "react";

import { User } from "next-auth";

const indexToRoleMapping: { [index: number]: string } = {
  1: "User",
  2: "Admin - Create",
  3: "Admin - Update",
  4: "Admin - Delete",
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
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
  });
  return (
    <LoadingWrapper loading={loading}>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.email}</h2>
          <p>{indexToRoleMapping[user.role]}</p>
        </div>
      ))}
    </LoadingWrapper>
  );
};

export default Users;
