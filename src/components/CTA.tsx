import SquareButton from "@/components/Buttons/SquareButton";
import TextInput from "@/components/Inputs/TextInput";
import { Box, Typography } from "@mui/material";
import React from "react";

const CTA = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        textAlign: "center",
        margin: "auto",
        maxWidth: "500px",
        mt: 12,
      }}
    >
      <Typography variant="h5" fontWeight={500}>
        Sign up to the gradguru email list to get notified when we launch!
      </Typography>
      <Typography
        variant="subtitle2"
        fontSize="0.75rem"
        sx={{ textTransform: "uppercase", pb: 1 }}
      >
        What's included?
      </Typography>
      <Box>
        <TextInput placeholder="Email address" />
        <SquareButton borderRadius="2px 8px 8px 2px">Subscribe</SquareButton>
      </Box>
    </Box>
  );
};

export default CTA;
