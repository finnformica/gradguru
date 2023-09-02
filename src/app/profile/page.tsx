"use client";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";
import { useAuth } from "../../context/auth";
import { useEffect } from "react";

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading]);

  if (!user) {
    return null;
  }

  return <Typography>Profile Page</Typography>;
};

export default ProfilePage;
