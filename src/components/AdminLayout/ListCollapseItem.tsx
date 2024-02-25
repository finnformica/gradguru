import Link from "next/link";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ListCollapse from "./ListCollapse";

const ListCollapseItem = ({ item }: any) => {
  return item.children ? (
    <ListCollapse section={item} />
  ) : (
    <ListItem disablePadding sx={{ display: "block" }}>
      <Link href={item.route} passHref>
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
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default ListCollapseItem;
