"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Box,
  Button,
  Divider,
  InputLabel,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignIn = () => {
  const session = useSession();
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  });

  return (
    <Box
      sx={{
        width: "400px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        mx: "auto",
        p: 4,
      }}
    >
      <Box>
        <Typography variant="h5" pb={1}>
          Sign in to your account
        </Typography>
        <Typography color="text.secondary">
          Don't have an account?{" "}
          <Link href="/sign-up" style={{ color: theme.palette.primary.main }}>
            Sign up
          </Link>
        </Typography>
      </Box>
      <Box width="100%">
        <InputLabel sx={{ pb: 1 }}>Email address</InputLabel>
        <TextField fullWidth size="small" />
      </Box>
      <Box width="100%">
        <InputLabel sx={{ pb: 1 }}>Password</InputLabel>
        <TextField fullWidth size="small" />
      </Box>
      <Button
        fullWidth
        variant="contained"
        onClick={() => signIn("credentials")}
      >
        Sign in
      </Button>
      <Divider sx={{ py: 2 }}>
        <Typography color="text.secondary" px={1}>
          Or continue with
        </Typography>
      </Divider>
      <Stack
        width={"100%"}
        direction="row"
        spacing={2}
        justifyContent={"space-between"}
      >
        <Button
          size="large"
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={() => signIn("google")}
          sx={{ width: "50%" }}
        >
          Google
        </Button>

        <Button
          size="large"
          variant="outlined"
          startIcon={<FacebookIcon />}
          onClick={() => signIn("facebook")}
          sx={{ width: "50%" }}
        >
          Facebook
        </Button>
      </Stack>
    </Box>
  );
};

export default SignIn;
