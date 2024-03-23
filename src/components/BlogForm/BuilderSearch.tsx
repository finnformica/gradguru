"use client";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import TextModal from "./TextModal";
import { menuItems } from "./blogArrays";

const BuilderSearch = () => {
  const theme = useTheme();
  const [addingBlock, setAddingBlock] = useState<null | string>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setAddingBlock(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <IconButton
        id="add-button"
        aria-controls={open ? "add-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          backgroundColor: theme.palette.primary.main,
          "&:hover": { backgroundColor: theme.palette.primary.dark },
        }}
      >
        <Box
          sx={{
            display: "flex",
            p: 1,
            gap: 2,
          }}
        >
          <AddIcon sx={{ color: "white" }} />
        </Box>
      </IconButton>
      <Menu
        id="add-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "add-button",
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item}
            onClick={() => {
              setAddingBlock(item);
              handleClose();
            }}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
      {addingBlock === "Text" && <TextModal active={true} />}
    </Container>
  );
};

export default BuilderSearch;
