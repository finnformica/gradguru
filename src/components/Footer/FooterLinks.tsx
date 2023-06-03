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
    <Box>
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 4 }}>
        {links.map((link) => (
          <Link href={link.href} style={{ textDecoration: "none" }}>
            <Typography
              variant="body2"
              sx={{
                color: "#FFF",
                opacity: "60%",
                "&:hover": {
                  opacity: "100%",
                },
              }}
            >
              {link.name}
            </Typography>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default FooterLinks;
