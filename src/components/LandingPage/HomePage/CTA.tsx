"use client";

import { FormEvent, useState } from "react";
import SquareButton from "@/components/LandingPage/Buttons/SquareButton";
import TextInput from "@/components/LandingPage/TextInput";
import { Box, CircularProgress, Container } from "@mui/material";
import isEmail from "validator/lib/isEmail";

import SmallTitle from "@/components/LandingPage/Titles/SmallTitle";

import { subscribe } from "@/utils";
import UserAlert from "@/components/LandingPage/UserAlert";
import { AlertState } from "@/components/globalTypes";

const CTA = () => {
  const [loading, setLoading] = useState(false);
  const [emailState, setEmailState] = useState({
    email: "",
    isValid: false,
  });
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    severity: "success",
    title: "",
    message: "",
  });

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!emailState.isValid) {
      setAlertState({
        open: true,
        severity: "error",
        title: "Invalid email",
        message: "Please enter a valid email address.",
      });
      setLoading(false);
      return;
    }

    subscribe(emailState.email, setAlertState, alertState);

    setEmailState({ email: "", isValid: false });
    setLoading(false);
  };

  return (
    <Container maxWidth="xl" id="subscribe">
      <UserAlert state={alertState} setState={setAlertState} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          textAlign: "center",
          margin: "auto",
          maxWidth: "500px",
          my: 16,
        }}
      >
        <SmallTitle>
          Sign Up to the Gradguru Email List to Get Notified When We Launch!
        </SmallTitle>
        <form onSubmit={handleSubscribe}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 0.5,
              pt: 1,
            }}
          >
            <TextInput
              state={emailState.email}
              onChange={(input: string) =>
                setEmailState({ email: input, isValid: isEmail(input) })
              }
              placeholder="Email address"
              style={{
                paddingLeft: "16px",
                backgroundColor: "#EEF2F2",
                height: "34px",
                width: "275px",
                borderRadius: "8px 2px 2px 8px",
              }}
            />

            <SquareButton type="submit" borderRadius="2px 8px 8px 2px">
              {loading ? (
                <CircularProgress
                  size={24}
                  sx={{ color: "white", margin: "auto" }}
                />
              ) : (
                "Subscribe"
              )}
            </SquareButton>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CTA;
