import SquareButton from "@/components/Buttons/SquareButton";
import TextInput from "@/components/Inputs/TextInput";
import { Box, Typography } from "@mui/material";

import SmallTitle from "./Titles/SmallTitle";

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
        my: 16,
      }}
    >
      <SmallTitle>
        Sign up to the gradguru email list to get notified when we launch!
      </SmallTitle>
      <Typography
        variant="subtitle2"
        fontSize={16}
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
