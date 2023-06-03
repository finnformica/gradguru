import { useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";

import { socials } from "@/constants";

const SocialIcons = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {socials.map((social, key) => {
        const [isHover, setIsHover] = useState(false);

        return (
          <a
            key={key}
            href={social.link}
            style={{
              textDecoration: "none",
              color: isHover
                ? theme.palette.secondary.light
                : theme.palette.secondary.main,
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              {social.icon}
            </IconButton>
          </a>
        );
      })}
    </Box>
  );
};

export default SocialIcons;
