import { Box, Typography, useTheme } from "@mui/material";
import Link from "next/link";

type FooterLinksProps = {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
};

const FooterLinks = ({ title, links }: FooterLinksProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        zIndex: 1,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          maxWidth: "60%",
          color: theme.palette.secondary.main,
          textTransform: "uppercase",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pt: { xs: 2, sm: 4 },
        }}
      >
        {links.map((link, key) =>
          link.name === "Contact" ? (
            <a
              key={key}
              // target="_blank"
              // rel="nofollow"
              href={link.href}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#FFF",
                  opacity: "60%",
                  "&:hover": {
                    opacity: "100%",
                    color: theme.palette.secondary.light,
                  },
                }}
              >
                {link.name}
              </Typography>
            </a>
          ) : (
            <Link key={key} href={link.href} style={{ textDecoration: "none" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#FFF",
                  opacity: "60%",
                  "&:hover": {
                    opacity: "100%",
                    color: theme.palette.secondary.light,
                  },
                }}
              >
                {link.name}
              </Typography>
            </Link>
          )
        )}
      </Box>
    </Box>
  );
};

export default FooterLinks;
