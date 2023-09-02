"use client";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { uiConfig, auth } from "../../../firebase/config";
import { useAuth } from "../../context/auth";

export default function Login() {
  const { user } = useAuth();
  const router = useRouter();

  if (user) {
    // user is already logged in, redirect to home page
    router.push("/");
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          // border: "1px rgba(71, 86, 119, 0.2) solid",
          // borderRadius: 8,
          padding: 4,
          mb: 4,
        }}
      >
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </Box>
    </Box>
  );
}
