import { useState } from "react";
import {
  Toolbar,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Drawer,
  ListSubheader,
  Typography,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

import { consultingCourse, SectionType } from "@/mock/courses";

const drawerWidth = 250;

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

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List subheader={<ListSubheader>Course content</ListSubheader>}>
      <Divider />
      {consultingCourse.sections.map((section, key) => (
        <NestedListItem section={section} key={key} />
      ))}
    </List>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        anchor={"right"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          flexShrink: 0,
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        anchor={"right"}
        sx={{
          display: { xs: "none", sm: "block" },
          position: "relative",
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;
