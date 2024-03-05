"use client";

import BigTitle from "@/components/LandingPage/Titles/BigTitle";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const WelcomeVideo = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          border: "1.5px solid #CFA284",
          borderRadius: "8px",
          mt: { xs: 4, md: 0 },
          mx: "auto",
        }}
      >
        <iframe
          src="/welcome-vid.mp4"
          title="Welcome Video"
          width={!isMediumScreen ? "600" : "450"}
          style={{
            aspectRatio: "16/9",
            borderRadius: "8px",
            border: "none",
            transform: "translateY(-10px) translateX(16px) scale(1.015)",
          }}
          // eslint-disable-next-line react/no-unknown-property
          // onLoadedData={() => setVideoLoading(false)}
        />
      </Box>
      <BigTitle sx={{ pt: 4 }}>Welcome to your Free Resume Course</BigTitle>
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          mb: 4,
        }}
      >
        The only toolkit you need to secure interviews at PWC, KPMG, EY &
        Deloitte.
      </Typography>
    </Container>
  );
};

export default WelcomeVideo;
