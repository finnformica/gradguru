"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

import { AccountCircle } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";

const AuthButton = () => {
  const { data, status } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (status !== "authenticated") {
    return (
      <AccountCircle
        sx={{
          height: 40,
          width: 40,
          color: "grey.400",
          display: "block",
          margin: "0 auto",
        }}
      />
    );
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
        <MenuItem onClick={() => signOut()}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AuthButton;
