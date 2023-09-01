"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Typography, Box, Container } from "@mui/material";

import MUIModal from "@/components/Global/UdemyModal";
import { courses } from "./courses";

type CardProps = {
  title: string;
  description: string;
  src: string;
  active: boolean;
};

const Card = ({ ...course }: CardProps) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        width: "200px",
        height: "200px",
        borderRadius: "8px",
        border: "1px rgba(71, 86, 119, 0.2) solid",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        textAlign: "center",
        transition: "all 0.2s ease-in-out",
        "&:hover": course.active
          ? {
              cursor: "pointer",
              border: "1px rgba(71, 86, 119, 0.6) solid",
              transform: "scale(1.02)",
            }
          : {},
      }}
    >
      <Image
        alt={`${course.title} icon`}
        src={course.src}
        width={50}
        height={50}
      />
      <Typography
        variant="h5"
        fontWeight={400}
        fontSize={16}
        sx={{
          color: course.active
            ? "rgba(71, 86, 119, 1)"
            : "rgba(71, 86, 119, 0.6)",
        }}
      >
        {course.title}
      </Typography>
    </Box>
  );
};

const CourseCards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Container>
      <MUIModal open={isModalOpen} setOpen={setIsModalOpen} />
      <Typography variant="h5" fontWeight={500}>
        Course Page
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          my: 4,
        }}
      >
        {courses.map((course, key) => (
          <Card key={key} {...course} />
        ))}
      </Box>
    </Container>
  );
};

export default CourseCards;
