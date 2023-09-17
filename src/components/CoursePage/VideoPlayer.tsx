"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { useCourse } from "@/context/course";

const VideoPlayer = () => {
  const params = useSearchParams();
  const { course } = useCourse();

  const [source, setSource] = useState("");

  const lesson: number = Number(params.get("lesson")) || 0;

  useEffect(() => {
    if (!course) {
      return;
    }

    setSource(course.lessons[lesson].video);
  }, [lesson]);

  if (!course) {
    return null;
  }

  const section: number = course.lessons[lesson].section;

  return (
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
  );
};

export default VideoPlayer;
