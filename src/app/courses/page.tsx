"use client";
import { useState } from "react";
import { Typography, Box, Container } from "@mui/material";

import MUIModal from "@/components/Global/UdemyModal";

const courses = [
  {
    title: "Big 4 Consulting",
    description: "Learn how to ace the Big 4 Consulting interview process.",
    src: "/icons/course-icons/consulting-icon.png",
  },
  {
    title: "Accounting & Financial Services",
    description: "Learn how to ace the Big 4 Consulting interview process.",
    src: "/icons/course-icons/finance-icon.png",
  },
  {
    title: "Investment Banking",
    description: "Learn how to ace the Big 4 Consulting interview process.",
    src: "/icons/course-icons/investment-icon.png",
  },
  {
    title: "Software Engineering",
    description: "Learn how to ace the Big 4 Consulting interview process.",
    src: "/icons/course-icons/software-icon.png",
  },
  {
    title: "Law",
    description: "Learn how to ace the Big 4 Consulting interview process.",
    src: "/icons/course-icons/law-icon.png",
  },
];

type CardProps = {
  title: string;
};

const Card = ({ title }: CardProps) => (
  <Box sx={{ width: "100px", height: "100px", borderRadius: "8px" }}>
    <Typography variant="h5" fontWeight={500}>
      {title}
    </Typography>
  </Box>
);

const CoursePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <Container>
      <MUIModal open={isModalOpen} setOpen={setIsModalOpen} />
      <Box>
        <Typography variant="h5" fontWeight={500}>
          Course Page
        </Typography>
      </Box>
    </Container>
  );
};

export default CoursePage;
