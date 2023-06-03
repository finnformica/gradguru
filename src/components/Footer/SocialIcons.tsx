import { Box, IconButton, useTheme } from "@mui/material";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";

const socials = [
  {
    icon: <FacebookIcon fontSize="large" />,
    link: "https://www.facebook.com",
  },
  {
    icon: <YouTubeIcon fontSize="large" />,
    link: "https://www.youtube.com",
  },
  {
    icon: <LinkedInIcon fontSize="large" />,
    link: "https://www.linkedin.com",
  },
];

const SocialIcons = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {socials.map((social) => (
        <a
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
