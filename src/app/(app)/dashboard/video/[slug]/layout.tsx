"use client";

import { useState } from "react";
import { Fab } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { CourseContextProvider } from "context/course";

import { Sidebar } from "components/CourseVideoPage";

const drawerWidth = 340;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // handle drawer
  const [open, setOpen] = useState(false);

  return (
    <CourseContextProvider>
      <Sidebar open={open} drawerWidth={drawerWidth} />
      {children}
      <Fab
        sx={{
          position: "fixed",
          bottom: 40,
          right: 40,
          zIndex: 1301,
        }}
        color="primary"
        aria-label="sidemenu"
        onClick={() => setOpen(!open)}
      >
        <MenuIcon sx={{ color: "white" }} />
      </Fab>
    </CourseContextProvider>
  );
}
