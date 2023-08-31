"use client";
import { Typography, Box, Container } from "@mui/material";
import SmallTitle from "@/components/Titles/SmallTitle";
import SquareButton from "@/components/Buttons/SquareButton";

const style = {
  position: "relative",
  width: { xs: "80%", md: "60%", lg: "50%" },
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const CoursePage = () => {
  return (
    <Container
      sx={{
        height: "45vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={style}>
        <SmallTitle>gradguru is in beta!</SmallTitle>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          We are currently working on the courses and will be launching them
          soon. For now, you can get a taste of what we offer on Udemy.
        </Typography>
        <SquareButton
          href="https://www.udemy.com/course/the-complete-guide-to-securing-a-big-4-offer"
          sx={{ mt: 4 }}
        >
          Go to Udemy
        </SquareButton>
      </Box>
    </Container>
  );
};

export default CoursePage;
