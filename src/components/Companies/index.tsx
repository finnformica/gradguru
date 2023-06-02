/* eslint react/no-unescaped-entities */

import { Box, useTheme } from "@mui/material";

import SmallTitle from "../Titles/SmallTitle";

import CompanyLogos from "./CompanyLogos";
import Footer from "./Footer";

const Companies = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 12,
        py: 6,
        backgroundColor: theme.palette.secondary.light,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SmallTitle>Companies we're familiar with</SmallTitle>
      <CompanyLogos />
      <Footer />
    </Box>
  );
};

export default Companies;
