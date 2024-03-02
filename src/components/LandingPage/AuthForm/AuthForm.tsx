"use client";

import { signIn } from "next-auth/react";
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
import _ from "lodash";

type AuthFormProps = {
  title: string;
  method: string;
  button: string;
  subtitle: string;
  email: string;
  setEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  setPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
};

const AuthForm = ({
  title,
  method,
  button,
  subtitle,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
}: AuthFormProps) => {
  const theme = useTheme();

  const linkText = _.upperFirst(method.replace("-", " "));

  return (
    <Box
      sx={{
        width: { xs: "300px", sm: "400px" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        mx: "auto",
        gap: 4,
        transform: "translate(0, -8%)",
      }}
    >
      <Box>
        <Typography variant="h5" pb={1}>
          {title}
        </Typography>
        <Typography color="text.secondary">
          {subtitle}{" "}
          <Link
            href={`/${method}`}
            style={{ color: theme.palette.primary.main }}
          >
            {linkText}
          </Link>
        </Typography>
      </Box>
      <Box width="100%">
        <InputLabel sx={{ pb: 1 }}>Email address</InputLabel>
        <TextField fullWidth size="small" value={email} onChange={setEmail} />
      </Box>
      <Box width="100%">
        <InputLabel sx={{ pb: 1 }}>Password</InputLabel>
        <TextField
          fullWidth
          size="small"
          value={password}
          onChange={setPassword}
        />
      </Box>
      <Button fullWidth variant="contained" onClick={handleSubmit}>
        {button}
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
          sx={{ width: "50%", color: "black", borderColor: "grey.400" }}
        >
          Google
        </Button>

        <Button
          size="large"
          variant="outlined"
          startIcon={<FacebookIcon />}
          onClick={() => signIn("facebook")}
          sx={{ width: "50%", color: "black", borderColor: "grey.400" }}
        >
          Facebook
        </Button>
      </Stack>
    </Box>
  );
};

export default AuthForm;
