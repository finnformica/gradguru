import { useState } from "react";
import {
  Divider,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { DrawerHeader } from "@/components/Headers";
import AuthButton from "@/components/Headers/PrimaryHeader/AuthButton";

import { consultingCourse, SectionType } from "@/mock/courses";

const NestedListItem = ({ section }: { section: SectionType }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        divider
        sx={{ backgroundColor: "#F6F9FA" }}
      >
        <ListItemText
          primary={section.name}
          primaryTypographyProps={{ fontWeight: 500 }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {section.lessons.map((lesson, key) => (
            <ListItemButton key={key}>
              <ListItemText
                primary={`${key + 1}. ${lesson.name}`}
                primaryTypographyProps={{ fontSize: "14px" }}
                secondary={
                  <>
                    <OndemandVideoIcon sx={{ fontSize: "1.2rem" }} />
                    <Typography variant="caption">10 min</Typography>
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

const Sidebar = ({ open, handleDrawerClose, drawerWidth }: any) => {
  const drawer = (
    <List sx={{ pt: 0 }}>
      {consultingCourse.sections.map((section, key) => (
        <NestedListItem section={section} key={key} />
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
      <DrawerHeader>
        <Box sx={{ flexGrow: 1 }}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
        <AuthButton />
      </DrawerHeader>
      <Divider />
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
