"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { useCourse } from "@/context/course";
import { Box, CircularProgress } from "@mui/material";

const VideoPlayer = () => {
  const params = useSearchParams();
  const { course } = useCourse();

  const [source, setSource] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const lesson: number = Number(params.get("lesson")) || 0;

  useEffect(() => {
    if (!course) {
      return;
    }

    setSource(course.lessons[lesson].video);
    setLoading(false);
  }, [lesson, course]);

  if (!course) {
    return null;
  }
  const {section} = course.lessons[lesson];

  return !loading ? (
    <video
      width="100%"
      title={`${course.lessons[lesson].name} - ${course.sections[section]} - ${course.name}`}
      src={`${process.env.NEXT_PUBLIC_CLOUDINARY_API_URL}/${source}`}
      controls
      autoPlay
      style={{
        aspectRatio: "16/9",
      }}
    >
      Error loading video.
    </video>
  ) : (
    <Box
      sx={{
        width: "100%",
        aspectRatio: "16/9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default VideoPlayer;
