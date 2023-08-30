import { useState } from "react";
import SquareButton from "@/components/Buttons/SquareButton";
import TextInput from "@/components/Global/TextInput";
import { Box, Container } from "@mui/material";
import isEmail from "validator/lib/isEmail";

import SmallTitle from "../Titles/SmallTitle";
import SmallerTitle from "../Titles/SmallerTitle";

import { subscribe } from "@/utils";
import UserAlert from "../Global/UserAlert";
import { AlertState } from "@/components/globalTypes";

const CTA = () => {
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

  const handleChange = (input: string) => {
    if (isEmail(input)) {
      setEmailState({ email: input, isValid: true });
    } else {
      setEmailState({ email: input, isValid: false });
    }
  };

  const handleSubscribe = () => {
    if (!emailState.isValid) {
      setAlertState({
        open: true,
        severity: "error",
        title: "Invalid email",
        message: "Please enter a valid email address.",
      });

      return;
    }

    subscribe(emailState.email, setAlertState, alertState);

    setEmailState({ email: "", isValid: false });
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
          Sign up to the gradguru email list to get notified when we launch!
        </SmallTitle>
        {/* <SmallerTitle sx={{ textTransform: "uppercase" }}>
          What's included?
        </SmallerTitle> */}
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
            onChange={handleChange}
            placeholder="Email address"
            style={{ paddingLeft: "16px", height: "34px", width: "275px" }}
          />
          <SquareButton
            onClick={handleSubscribe}
            borderRadius="2px 8px 8px 2px"
          >
            Subscribe
          </SquareButton>
        </Box>
      </Box>
    </Container>
  );
};

export default CTA;
