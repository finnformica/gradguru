import { Box } from "@mui/material";

import FooterLinks from "./FooterLinks";

import { companyLinks, productLinks } from "@/constants";

const MobileFooter = () => {
  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 8 }}>
      <FooterLinks title="Company" links={companyLinks} />
      <FooterLinks title="Products" links={productLinks} />
    </Box>
  );
};

export default MobileFooter;
