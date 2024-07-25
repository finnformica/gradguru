"use client";

import { useRouter } from "next/navigation";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const AvailableCourses = () => {
  const router = useRouter();

  const courses = [
    {
      name: "Big 4 Consulting",
      description: "Learn how to get into the Big 4 consulting firms",
      image: "/imgs/courses/consulting/consulting-thumbnail.png",
      link: "/courses/consulting",
    },
    {
      name: "Investment Banking",
      description: "Learn how to get into investment banking",
      image: "/imgs/courses/consulting/consulting-thumbnail.png",
      link: "/courses/investment-banking",
    },
    {
      name: "Tech",
      description: "Learn how to get into tech",
      image: "/imgs/courses/consulting/consulting-thumbnail.png",
      link: "/courses/tech",
    },
    {
      name: "Startups",
      description: "Learn how to get into startups",
      image: "/imgs/courses/consulting/consulting-thumbnail.png",
      link: "/courses/startups",
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ textAlign: "center", pt: 8 }}>
      <Stack spacing={1}>
        <Typography variant="h3" fontSize={48}>
          Courses
        </Typography>
        <Typography color="text.secondary">
          Challenging multi-step experiences with tests, videos, and additional
          resources
        </Typography>
      </Stack>

      <Divider sx={{ mx: "auto", width: "200px", my: 8 }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 3,
          mt: 4,
        }}
      >
        {courses.map((course) => (
          <Card
            key={course.name}
            sx={{
              display: "flex",
              flexDirection: "column",
              transition: "all 350ms ease-in-out",
              "&:hover": {
                transform: "scale(1.03)",
              },
            }}
          >
            <CardActionArea onClick={() => router.push(course.link)}>
              <CardMedia
                sx={{ height: 160, objectFit: "contain" }}
                image={course.image}
                title={`${course.name} thumbnail`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default AvailableCourses;
