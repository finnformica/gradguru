import Link from "next/link";
import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";

import { pages } from "./pages";

const MenuButton = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open menu">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {pages.map((page) => (
          <MenuItem key={page.name} onClick={handleCloseUserMenu}>
            <Link href={page.route}>
              <Typography textAlign="center">{page.name}</Typography>
            </Link>
          </MenuItem>
        ))}
        <MenuItem
          key="Login"
          onClick={() => {
            handleCloseUserMenu();
          }}
        >
          <Link href="/sign-in">
            <Typography textAlign="center">Login</Typography>
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MenuButton;
