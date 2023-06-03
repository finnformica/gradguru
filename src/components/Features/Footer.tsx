import { Box, Typography } from "@mui/material";

import SquareButton from "@/components/Buttons/SquareButton";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-around",
        pt: 6,
        pb: 2,
        gap: 4,
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", md: "90%" },
          textAlign: { xs: "center", md: "left" },
          mx: "auto",
        }}
      >
        <Typography variant="h5" fontWeight={500}>
          Explore the courses
        </Typography>
        <Typography variant="body2" fontWeight={300}>
          Learn more about the different courses, course curriculum and our
          practice drills before you enroll.
        </Typography>
      </Box>
      <SquareButton sx={{ maxWidth: 400, mx: "auto" }}>
        Explore courses
      </SquareButton>
    </Box>
  );
};

export default Footer;
