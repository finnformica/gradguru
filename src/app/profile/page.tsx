"use client";

import { Typography } from "@mui/material";
import { useAuth } from "../../../context/auth";

const page = () => {
  const { user } = useAuth();

  if (!user) {
    return <Typography>Please login to view this page</Typography>;
  }

  return <Typography>Profile Page</Typography>;
};

export default page;
