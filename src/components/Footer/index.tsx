import { Box, useMediaQuery, useTheme } from "@mui/material";

import MobileFooter from "./MobileFooter";
import NormalFooter from "./NormalFooter";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.dark,
      }}
    >
      {!isMobile ? <NormalFooter /> : <MobileFooter />}
    </Box>
  );
};

export default Footer;
