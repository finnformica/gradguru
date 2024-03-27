import { Box, IconButton, useTheme } from "@mui/material";
import { useState } from "react";

import socials from "./socials";

type SocialIconProps = {
  link: string;
  icon: React.ReactNode;
};

const SocialIcon = ({ ...social }: SocialIconProps) => {
  const theme = useTheme();
  const [isHover, setIsHover] = useState(false);

  return (
    <a
      href={social.link}
      style={{
        color: isHover
          ? theme.palette.secondary.light
          : theme.palette.secondary.main,
        transition: "color 0.2s ease-in-out",
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{
          p: { xs: 1, sm: "auto" },
        }}
      >
        {social.icon}
      </IconButton>
    </a>
  );
};

const SocialIcons = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: 1, sm: 2 },
      }}
    >
      {socials.map((social, key) => (
        <SocialIcon key={key} {...social} />
      ))}
    </Box>
  );
};

export default SocialIcons;
