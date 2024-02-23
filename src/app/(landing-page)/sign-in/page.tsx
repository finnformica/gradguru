"use client";

import { signIn } from "next-auth/react";

import { Box, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const SignIn = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button startIcon={<GoogleIcon />} onClick={() => signIn()}>
        Login with Google
      </Button>
    </Box>
  );
};

export default SignIn;
