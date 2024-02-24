"use client";

import { signIn, useSession } from "next-auth/react";

import { Box, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignIn = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  });

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
      <Button startIcon={<GoogleIcon />} onClick={() => signIn("google")}>
        Login with Google
      </Button>
    </Box>
  );
};

export default SignIn;
