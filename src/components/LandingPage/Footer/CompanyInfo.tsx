import { Box, Typography } from "@mui/material";

import SocialIcons from "./SocialIcons";
import Image from "next/image";

const CompanyInfo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
        flexDirection: { xs: "row-reverse", sm: "column" },
        justifyContent: { xs: "space-between", sm: "center" },
        alignItems: { xs: "center", sm: "flex-start" },
      }}
    >
      <Image
        src="/logos/small-logo.png"
        alt="gradguru logo"
        width={100}
        height={100}
        style={{ position: "relative", left: -20 }}
      />
      <Box>
        <SocialIcons />

        <Typography
          variant="body2"
          fontSize={12}
          fontWeight={300}
          pt={2}
          sx={{ color: "#FFF", opacity: "40%" }}
        >
          © {new Date().getFullYear()} gradguru. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default CompanyInfo;
