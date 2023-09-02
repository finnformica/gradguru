"use client";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";
import { useAuth } from "../../context/auth";
import { useEffect } from "react";

const ProfilePage = () => {
  const { protectedPage } = useAuth();
  protectedPage();

  return <Typography>Profile Page</Typography>;
};

export default ProfilePage;
