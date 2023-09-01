"use client";

import { useState } from "react";
import Image from "next/image";

import { Typography, Box, Container } from "@mui/material";

import MUIModal from "@/components/Global/UdemyModal";
import { courses } from "./courses";
import Link from "next/link";

type CardProps = {
  title: string;
  description: string;
  src: string;
  active: boolean;
  href: string;
};

const Card = ({ ...course }: CardProps) => {
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
        gap: 2,
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
        width={65}
        height={65}
      />
      <Typography
        variant="h5"
        fontWeight={400}
        fontSize={16}
        sx={{
          color: course.active
            ? "rgba(71, 86, 119, 1)"
            : "rgba(71, 86, 119, 0.4)",
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
        Course Dashboard
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
        {courses.map((course, key) =>
          course.active ? (
            <Link href={course.href} key={key}>
              <Card {...course} />
            </Link>
          ) : (
            <Card key={key} {...course} />
          )
        )}
      </Box>
    </Container>
  );
};

export default CourseCards;
