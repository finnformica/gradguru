"use client";
import { FormEvent, useState } from "react";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

import SquareButton from "@/components/LandingPage/Buttons/SquareButton";
import ColouredContainer from "@/components/LandingPage/Containers/ColouredContainer";
import TextInput from "@/components/LandingPage/TextInput";

import { postFirebaseSupport } from "@/api/email";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initFormState: FormState = {
  name: "",
  email: "",
  message: "",
};

const ContactPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState<FormState>(initFormState);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    postFirebaseSupport(form)
      .then(() =>
        enqueueSnackbar(
          "Thank you for reaching out, we'll get back to you shortly."
        )
      )
      .catch((err) =>
        enqueueSnackbar(`Something went wrong - ${err}`, { variant: "error" })
      )
      .finally(() => {
        setForm(initFormState);
        setLoading(false);
      });
  };

  return (
    <ColouredContainer
      sx={{
        height: "40vh",
        m: { xs: "2rem 0 5rem", sm: "2rem 3rem 5rem" },
      }}
    >
      <Typography variant="h4">Contact</Typography>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Box sx={{ display: "flex", gap: 1, width: "80%" }}>
          <TextInput
            state={form.name}
            onChange={(input: string) => setForm({ ...form, name: input })}
            placeholder="Name"
            style={{
              height: "34px",
              paddingLeft: "16px",
            }}
          />
          <TextInput
            state={form.email}
            onChange={(input: string) => setForm({ ...form, email: input })}
            placeholder="Email"
            style={{
              height: "34px",
              paddingLeft: "16px",
              width: "100%",
            }}
          />
        </Box>
        <TextInput
          state={form.message}
          onChange={(input: string) => setForm({ ...form, message: input })}
          placeholder="Message"
          multiline={{
            show: true,
            rows: 8,
            cols: 50,
          }}
          style={{
            paddingLeft: "16px",
            paddingTop: "12px",
            width: "77%",
          }}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <SquareButton type="submit">Submit</SquareButton>
        )}
      </form>
    </ColouredContainer>
  );
};

export default ContactPage;
