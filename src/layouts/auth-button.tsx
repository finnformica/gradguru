"use client";

import { signOut } from "firebase/auth";
import Image from "next/image";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { AccountCircle } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";

import { auth } from "lib/firebase/config";

const AuthButton = () => {
  const [user] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {user?.photoURL ? (
          <Image
            alt="user profile image"
            src={user.photoURL}
            width={35}
            height={35}
            style={{
              borderRadius: "50%",
              display: "block",
              cursor: "pointer",
            }}
          />
        ) : (
          <AccountCircle sx={{ height: 35, width: 35, color: "grey.400" }} />
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
        <MenuItem onClick={() => signOut(auth)}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AuthButton;
