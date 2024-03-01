"use client";

import CourseDescription from "./CourseDescription";
import Sidebar from "./Sidebar";
import VideoControls from "./VideoControls";
import VideoPlayer from "./VideoPlayer";
import { useCourse } from "@/context/course";
import { Box } from "@mui/material";

import { CourseType } from "@/components/globalTypes";

const VideoPlayerWithControls = ({ course }: { course: CourseType }) => {
  const { setCourse } = useCourse();

  if (!course) {
    return null;
  }

  setCourse(course);
  return (
    <>
      <Box>
        <VideoPlayer />
        <VideoControls />
      </Box>
      <CourseDescription />
    </>
  );
};

export default VideoPlayerWithControls;

export { CourseDescription, Sidebar, VideoControls, VideoPlayer };
