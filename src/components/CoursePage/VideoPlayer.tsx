"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { useCourse } from "@/context/course";

const VideoPlayer = () => {
  const params = useSearchParams();
  const { course } = useCourse();

  if (!course) {
    return null;
  }

  const lesson: number = Number(params.get("lesson")) || 0;
  const section: number = course.lessons[lesson].section;

  const [source, setSource] = useState(course.lessons[lesson].video);

  useEffect(() => {
    setSource(course.lessons[lesson].video);
    console.log(course.lessons[lesson].name, course.lessons[lesson].video);
  }, [lesson]);

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
