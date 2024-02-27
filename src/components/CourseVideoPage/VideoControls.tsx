import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, IconButton, Typography } from "@mui/material";

import { useCourse } from "@/context/course";

const VideoControls = () => {
  const { course } = useCourse();
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  if (!course) {
    return null;
  }

  const lesson: number = Number(params.get("lesson")) || 0;
  const { section } = course.lessons[lesson];

  const handleVideoIncrement = () => {
    if (lesson >= course.lessons.length - 1) {
      return;
    } else {
      router.push(`${pathname}?lesson=${lesson + 1}`);
    }
  };

  const handleVideoDecrement = () => {
    if (lesson <= 0) {
      return;
    } else {
      router.push(`${pathname}?lesson=${lesson - 1}`);
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
      <IconButton onClick={handleVideoDecrement} disabled={lesson <= 0}>
        <ChevronLeftIcon />
      </IconButton>
      <Typography variant="h4" fontSize={16}>
        <span style={{ fontWeight: 700 }}>{course.sections[section]}: </span>
        {course.lessons[lesson].name}
      </Typography>
      <IconButton
        onClick={handleVideoIncrement}
        disabled={lesson >= course.lessons.length - 1}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

export default VideoControls;
