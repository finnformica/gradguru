"use client";
import { FormEvent, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

import SquareButton from "@/components/LandingPage/Buttons/SquareButton";
import ColouredContainer from "@/components/LandingPage/Containers/ColouredContainer";
import TextInput from "@/components/LandingPage/TextInput";
import UserAlert from "@/components/LandingPage/UserAlert";

import { AlertState } from "@/components/globalTypes";
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
  const [form, setForm] = useState<FormState>(initFormState);
  const [loading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    severity: "success",
    title: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    postFirebaseSupport(form)
      .then(() => {
        setAlertState({
          ...alertState,
          open: true,
          severity: "success",
          message: "Thank you for reaching out, we'll get back to you shortly.",
          title: "Success!",
        });
      })
      .catch((err) => {
        console.error(err);
        setAlertState({
          ...alertState,
          open: true,
          severity: "error",
          message: "Something went wrong. Please try again later.",
          title: "Error!",
        });
      })
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
      <UserAlert state={alertState} setState={setAlertState} />

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
