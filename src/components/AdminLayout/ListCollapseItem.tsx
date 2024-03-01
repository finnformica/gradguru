import Link from "next/link";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ListCollapse from "./ListCollapse";

const ListCollapseItem = ({ section }: any) => {
  return section.children ? (
    <ListCollapse section={section} />
  ) : (
    <ListItem disablePadding sx={{ display: "block" }}>
      <Link href={section.route} passHref>
        <ListItemButton
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
            {section.icon}
          </ListItemIcon>
          <ListItemText primary={section.name} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default ListCollapseItem;
