"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { CldVideoPlayer } from "next-cloudinary";

import { consultingCourse as course } from "@/mock/courses";

const VideoPlayer = () => {
  const params = useSearchParams();

  const lesson: number = Number(params.get("lesson")) || 0;
  const section: number = course.lessons[lesson].section;

  const [source, setSource] = useState(course.lessons[lesson].video);

  useEffect(() => {
    setSource(course.lessons[lesson].video);
    console.log(course.lessons[lesson].name, course.lessons[lesson].video);
  }, [lesson]);

  return (
    <CldVideoPlayer
      id={`${course.lessons[lesson].name} - ${course.sections[section]} - ${course.name}`}
      width="800px"
      height="400px"
      src={source}
      controls
      logo={false}
    />
  );
};

export default VideoPlayer;
