import Link from "next/link";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import ListCollapse from "./list-collapse";
import { Icon } from "@iconify/react";

const ListCollapseItem = ({ section }: any) => {
  return section.children ? (
    <ListCollapse section={section} />
  ) : (
    <ListItem disablePadding sx={{ display: "block" }}>
      <Link href={section.route} passHref>
        <ListItemButton
          disabled={!section.active}
          sx={{
            minHeight: 48,
            justifyContent: "initial",
            pl: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center",
            }}
          >
            <Tooltip title={section.name} placement="right">
              <Icon
                icon={section.icon}
                width="32"
                height="32"
                color="#BDBDBD"
              />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary={section.name} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default ListCollapseItem;
