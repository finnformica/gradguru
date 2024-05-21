import Link from "next/link";

import { ChevronRight } from "@mui/icons-material";
import { Box, Breadcrumbs, SxProps, Typography } from "@mui/material";

type BreadcrumbLinkProps = {
  href?: string;
  label: string;
};

const LinkItem = ({
  link,
  last,
}: {
  link: BreadcrumbLinkProps;
  last: boolean;
}) => {
  const { href, label } = link;

  const color = last ? "grey.400" : "text.primary";

  if (!href) {
    return (
      <Typography variant="body2" textTransform="capitalize" color={color}>
        {label}
      </Typography>
    );
  }

  return (
    <Link href={href}>
      <Typography
        variant="body2"
        textTransform="capitalize"
        sx={{
          cursor: "pointer",
          color: color,
          "&:hover": {
            textDecoration: "underline",
          },
        }}
        color={color}
      >
        {label}
      </Typography>
    </Link>
  );
};

type PageBreadcrumbsProps = {
  header: string;
  links: BreadcrumbLinkProps[];
  sx?: SxProps;
};

const PageBreadcrumbs = ({ header, links, sx }: PageBreadcrumbsProps) => {
  const lastLink = links[links.length - 1];

  return (
    <Box sx={sx}>
      <Typography pb={1} variant="h4" textTransform="capitalize">
        {header}
      </Typography>
      <Breadcrumbs aria-label="breadcrumb" separator={<Separator />}>
        {links.map((link, key) => (
          <LinkItem key={key} link={link} last={lastLink === link} />
        ))}
      </Breadcrumbs>
    </Box>
  );
};

const Separator = () => (
  <ChevronRight
    sx={{
      fontSize: "1.25rem",
      verticalAlign: "middle",
      margin: "0 0.5rem",
      color: "grey.400",
    }}
  />
);

export default PageBreadcrumbs;
