"use client";

import _ from "lodash";
import { useRouter } from "next/navigation";

import {
  ListItemButton,
  Stack,
  SxProps,
  Tooltip,
  Typography,
} from "@mui/material";

export const NavListItem = ({
  item,
}: {
  item: {
    name: string;
    href: string;
    icon: (sx: SxProps) => React.ReactElement;
  };
}) => {
  const router = useRouter();

  const { name, href, icon } = item;

  const path = href !== "/admin" ? `/dashboard/${href}` : href;

  return (
    <Tooltip title={_.startCase(name)} placement="right">
      <ListItemButton
        key={name}
        disableGutters
        onClick={() => router.push(path)}
      >
        <Stack
          spacing={1}
          justifyContent="center"
          alignItems="center"
          mx="auto"
          maxWidth="100%"
        >
          {icon({ color: "grey.400" })}
          <Typography
            variant="body2"
            fontSize={12}
            color="text.secondary"
            textTransform="capitalize"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            width="100%"
          >
            {name}
          </Typography>
        </Stack>
      </ListItemButton>
    </Tooltip>
  );
};
