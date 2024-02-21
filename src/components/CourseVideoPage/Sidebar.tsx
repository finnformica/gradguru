import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Drawer,
  Typography,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

import { useCourse } from "@/context/course";

import { LessonType } from "@/mock/courses";

const NestedListItem = ({
  lessons,
  section,
}: {
  lessons: LessonType[];
  section: string;
}) => {
  const { course } = useCourse();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (!course) {
    return null;
  }

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLessonClick = (lesson: LessonType) => {
    const idx = course.lessons.findIndex(
      (l: LessonType) => l.name === lesson.name
    );

    router.push(`${pathname}?lesson=${idx}`);
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        divider
        sx={{ backgroundColor: (theme) => theme.palette.grey[50] }}
      >
        <ListItemText
          primary={section}
          primaryTypographyProps={{ fontWeight: 500 }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {lessons.map((lesson, key) => (
            <ListItemButton
              key={key}
              onClick={() => {
                handleLessonClick(lesson);
              }}
            >
              <ListItemText
                primary={`${key + 1}. ${lesson.name}`}
                primaryTypographyProps={{ fontSize: "14px" }}
                secondary={
                  <>
                    <OndemandVideoIcon sx={{ fontSize: "1.2rem" }} />
                    <Typography variant="caption">{lesson.duration}</Typography>
                  </>
                }
                secondaryTypographyProps={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};

const Sidebar = ({ open, drawerWidth }: any) => {
  const { course } = useCourse();

  if (!course) {
    return null;
  }

  const drawer = (
    <List>
      {course.sections.map((section, key: number) => (
        <NestedListItem
          section={section}
          lessons={course.lessons.filter(
            (lesson: LessonType) => lesson.section === key
          )}
          key={key}
        />
      ))}
    </List>
  );

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
