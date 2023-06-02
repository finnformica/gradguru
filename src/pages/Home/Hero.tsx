import { Typography, Box, useTheme } from "@mui/material";
import Image from "next/image";

const Hero = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", gap: 4, alignItems: "center", mt: 4 }}>
      <Box sx={{ width: "40%" }}>
        <Typography
          variant="h1"
          fontSize="2.25rem"
          fontWeight={400}
          sx={{ pb: 2 }}
        >
          Empower Your Graduate Journey and Land Your Dream Job
        </Typography>
        <Typography variant="body1">
          Unleash your potential with comprehensive coaching and resources to
          secure the perfect graduate job after university.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", mx: "auto" }}>
        <Image
          src="/imgs/hero.png"
          alt="Graduate coaching example"
          width={500}
          height={300}
          style={{
            objectFit: "contain",
            borderRadius: "8px",
            border: "2px solid #CFA284",
          }}
          priority
        />
      </Box>
    </Box>
  );
};

export default Hero;
