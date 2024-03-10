"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import _ from "lodash";
import { Controller, useForm } from "react-hook-form";

import { CredentialInputs } from "@/components/globalTypes";

type AuthFormProps = {
  title: string;
  method: string;
  button: string;
  subtitle: string;
  onSubmit: (data: CredentialInputs) => void;
};

const AuthForm = ({
  title,
  method,
  button,
  subtitle,
  onSubmit,
}: AuthFormProps) => {
  const { handleSubmit, control } = useForm<CredentialInputs>();
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          {method !== "sign-up" && (
            <Controller
              key="name"
              name="name"
              control={control as any}
              rules={
                {
                  required: true,
                } as any
              }
              render={({
                field: { value, onChange },
                fieldState: { error },
              }: any) => (
                <TextField
                  key="name"
                  fullWidth
                  value={value}
                  placeholder="Name"
                  onChange={onChange}
                  error={!!error}
                  helperText={!!error && (error.message || "Name is required")}
                  size="small"
                />
              )}
            />
          )}
          <Controller
            key="email"
            name="email"
            control={control as any}
            rules={
              {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email address",
                },
              } as any
            }
            render={({
              field: { value, onChange },
              fieldState: { error },
            }: any) => (
              <TextField
                key="email"
                fullWidth
                value={value}
                placeholder="Email Address"
                onChange={onChange}
                error={!!error}
                helperText={!!error && (error.message || "Email is required")}
                size="small"
              />
            )}
          />

          <Controller
            key="password"
            name="password"
            control={control as any}
            rules={
              {
                required: true,
              } as any
            }
            render={({
              field: { value, onChange },
              fieldState: { error },
            }: any) => (
              <TextField
                key="username"
                fullWidth
                type="password"
                value={value}
                placeholder="Password"
                onChange={onChange}
                error={!!error}
                helperText={!!error && "Password is required"}
                size="small"
              />
            )}
          />

          <Button fullWidth variant="contained" type="submit">
            {button}
          </Button>
        </Stack>
      </form>
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
