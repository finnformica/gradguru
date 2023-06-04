import { Container } from "@mui/material";

import FooterLinks from "./FooterLinks";
import CompanyInfo from "./CompanyInfo";
import BackgroundLogo from "./BackgroundLogo";

import { companyLinks, productLinks } from "./links";

const NormalFooter = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        py: 12,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CompanyInfo />
      <FooterLinks title="Company" links={companyLinks} />
      <FooterLinks title="Products" links={productLinks} />

      <BackgroundLogo />
    </Container>
  );
};

export default NormalFooter;
