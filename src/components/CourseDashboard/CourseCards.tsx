"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Typography, Box, Container } from "@mui/material";

import LoadingWrapper from "@/components/LoadingWrapper";
import { courses } from "./courses";

import { useAuth } from "@/context/auth";

type CardProps = {
  title: string;
  id: string;
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
  const [userCourses, setUserCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      console.log(user.uid);

      // retrieve user courses from database
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=users&document=${user.uid}`
      )
        .then((res) => res.json())
        .then((res) => res.data);

      // if course is not found
      if (!data) {
        console.log("Course not found");
      } else {
        setUserCourses(data.courses);
      }
      setLoading(false);
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <>
      <Typography variant="h2" fontWeight={500}>
        Your Courses
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
        <LoadingWrapper loading={loading} size={40}>
          {userCourses.length === 0 ? (
            <Typography>You have no purchased courses</Typography>
          ) : (
            courses
              .filter((course) => userCourses.includes(course.id))
              .map((course, key) =>
                course.active ? (
                  <Link href={course.href} key={key}>
                    <Card {...course} />
                  </Link>
                ) : (
                  <Card key={key} {...course} />
                )
              )
          )}
        </LoadingWrapper>
      </Box>
    </>
  );
};

export default CourseCards;
