/* eslint react/no-unescaped-entities */

import SquareButton from "@/components/Buttons/SquareButton";
import TextInput from "@/components/Inputs/TextInput";
import { Box, Typography, Container } from "@mui/material";

import SmallTitle from "../Titles/SmallTitle";
import SmallerTitle from "../Titles/SmallerTitle";

const CTA = () => {
  return (
    <Container maxWidth="xl">
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
            placeholder="Email address"
            style={{ paddingLeft: "16px", height: "34px", width: "275px" }}
          />
          <SquareButton borderRadius="2px 8px 8px 2px">Subscribe</SquareButton>
        </Box>
      </Box>
    </Container>
  );
};

export default CTA;
