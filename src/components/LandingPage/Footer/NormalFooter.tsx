import { Container } from "@mui/material";

import FooterLinks from "./FooterLinks";
import CompanyInfo from "./CompanyInfo";
import { companyLinks, productLinks } from "./links";

const NormalFooter = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        py: 6,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CompanyInfo />
      <FooterLinks title="Company" links={companyLinks} />
      <FooterLinks title="Products" links={productLinks} />
    </Container>
  );
};

export default NormalFooter;
