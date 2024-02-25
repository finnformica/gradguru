import React from "react";
import Image from "next/image";

import { IconButton, Menu, MenuItem, Typography } from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { signOut, useSession } from "next-auth/react";

const AuthButton = () => {
  const { data, status } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (status !== "authenticated") {
    return null;
  }

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {data.user?.image ? (
          <Image
            alt="user profile image"
            src={data.user.image}
            width={30}
            height={30}
            style={{ borderRadius: "50%" }}
          />
        ) : (
          <AccountCircle />
        )}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => signOut()}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AuthButton;
