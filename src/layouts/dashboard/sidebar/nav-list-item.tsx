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

import { Icon } from "@iconify/react";

export const NavListItem = ({
  item,
}: {
  item: {
    name: string;
    href: string;
    icon: string;
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
          <Icon icon={icon} width="32" height="32" color="#BDBDBD" />
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
