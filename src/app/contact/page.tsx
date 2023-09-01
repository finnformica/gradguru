"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import SquareButton from "@/components/Buttons/SquareButton";
import ColouredContainer from "@/components/Containers/ColouredContainer";
import TextInput from "@/components/Global/TextInput";
import UserAlert from "@/components/Global/UserAlert";

import { AlertState } from "@/components/globalTypes";

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
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    severity: "success",
    title: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/firebase/support`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      }
    );

    if (response.status !== 200) {
      setAlertState({
        ...alertState,
        open: true,
        severity: "error",
        message: "Something went wrong. Please try again later.",
        title: "Error!",
      });
    } else {
      setAlertState({
        ...alertState,
        open: true,
        severity: "success",
        message: "Please check your email for a confirmation link.",
        title: "Success!",
      });
    }

    setForm(initFormState);
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
        <SquareButton type="submit">Submit</SquareButton>
      </form>
    </ColouredContainer>
  );
};

export default ContactPage;
