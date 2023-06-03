import { Box, IconButton, useTheme } from "@mui/material";

import { socials } from "@/constants";

const SocialIcons = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {socials.map((social, key) => (
        <a
          key={key}
          href={social.link}
          style={{
            textDecoration: "none",
            color: theme.palette.secondary.main,
          }}
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
      ))}
    </Box>
  );
};

export default SocialIcons;
