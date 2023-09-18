import { Box } from "@mui/material";

import FooterLinks from "./FooterLinks";

import { companyLinks, productLinks } from "./links";
import CompanyInfo from "./CompanyInfo";

const MobileFooter = () => {
  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 6 }}>
      <FooterLinks title="Company" links={companyLinks} />
      <FooterLinks title="Products" links={productLinks} />
      <CompanyInfo />
    </Box>
  );
};

export default MobileFooter;
