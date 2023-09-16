import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { Box, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { consultingCourse as course } from "@/mock/courses";

const VideoControls = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const lesson: number = Number(params.get("lesson")) || 0;
  const section: number = Number(params.get("section")) || 0;

  const handleVideoIncrement = () => {
    if (
      lesson >= course.sections[section].lessons.length - 1 &&
      section >= course.sections.length - 1
    ) {
      return;
    } else if (lesson >= course.sections[section].lessons.length - 1) {
      router.push(`${pathname}?section=${section + 1}&lesson=0`);
    } else {
      router.push(`${pathname}?section=${section}&lesson=${lesson + 1}`);
    }
  };

  const handleVideoDecrement = () => {
    if (lesson <= 0 && section <= 0) {
      return;
    } else if (lesson <= 0) {
      router.push(`${pathname}?section=${section - 1}&lesson=0`);
    } else {
      router.push(`${pathname}?section=${section}&lesson=${lesson - 1}`);
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      py={1}
      textAlign={"center"}
    >
      <IconButton
        onClick={handleVideoDecrement}
        disabled={lesson <= 0 && section <= 0}
      >
        <ChevronLeftIcon />
      </IconButton>
      <Typography variant="h4" fontSize={16}>
        <span style={{ fontWeight: 700 }}>
          {course.sections[section].name}:{" "}
        </span>
        {course.sections[section].lessons[lesson].name}
      </Typography>
      <IconButton
        onClick={handleVideoIncrement}
        disabled={
          lesson >= course.sections[section].lessons.length - 1 &&
          section >= course.sections.length - 1
        }
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

export default VideoControls;
