import { Container, useTheme } from "@mui/material";

import SmallTitle from "../Titles/SmallTitle";

import CompanyLogos from "./CompanyLogos";
import Footer from "./Footer";

const Companies = () => {
  const theme = useTheme();
  return (
    <Container
      maxWidth="xl"
      sx={{
        textAlign: "center",
        my: 12,
        py: 6,
        backgroundColor: theme.palette.secondary.light,
      }}
    >
      <SmallTitle>Companies we're familiar with</SmallTitle>
      <CompanyLogos />
      <Footer />
    </Container>
  );
};

export default Companies;
