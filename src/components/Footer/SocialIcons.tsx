import { useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";

import socials from "./socials";

type SocialIconProps = {
  social: {
    link: string;
    icon: React.ReactNode;
  };
};

const SocialIcon = ({ social }: SocialIconProps) => {
  const theme = useTheme();
  const [isHover, setIsHover] = useState(false);

  return (
    <a
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
      <IconButton size="large" edge="start" color="inherit" aria-label="menu">
        {social.icon}
      </IconButton>
    </a>
  );
};

const SocialIcons = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {socials.map((social, key) => (
        <SocialIcon key={key} social={social} />
      ))}
    </Box>
  );
};

export default SocialIcons;
