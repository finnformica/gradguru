import { useState } from "react";
import SquareButton from "@/components/Buttons/SquareButton";
import TextInput from "@/components/Global/TextInput";
import { Box, Container } from "@mui/material";

import SmallTitle from "../Titles/SmallTitle";
import SmallerTitle from "../Titles/SmallerTitle";

import { subscribe } from "@/utils";
import UserAlert from "../Global/UserAlert";
import { AlertState } from "@/components/globalTypes";

const CTA = () => {
  const [email, setEmail] = useState("");
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    severity: "success",
    title: "",
    message: "",
  });

  const handleSubscribe = () => {
    console.log(email);
    subscribe(email, setAlertState, alertState);

    setEmail("");
  };

  return (
    <Container maxWidth="xl">
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
        <SmallerTitle sx={{ textTransform: "uppercase" }}>
          What's included?
        </SmallerTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <TextInput
            state={email}
            setState={setEmail}
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
