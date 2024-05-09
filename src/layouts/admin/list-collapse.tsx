"use client";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import ListCollapseItem from "./list-collapse-item";
import { Icon } from "@iconify/react";

const ListCollapse = ({ section }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: "initial",
            px: 2.5,
          }}
          onClick={() => setOpen(!open)}
          disabled={!section.active}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center",
            }}
          >
            <Tooltip title={section.name} placement="right">
              <Icon icon={section.icon} width="32" height="32" />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary={section.name} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Divider />

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{ p: 0 }}>
          {section.children.map((item: any, key: number) => (
            <ListCollapseItem section={item} key={key} />
          ))}
        </List>
      </Collapse>

      {open && <Divider />}
    </>
  );
};

export default ListCollapse;
