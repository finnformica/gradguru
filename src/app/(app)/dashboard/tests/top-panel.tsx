"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import _ from "lodash";

import { ExpandMore } from "@mui/icons-material";
import { Box, Button, Menu, MenuItem, Stack } from "@mui/material";

import { PageBreadcrumbs } from "components/global-components";

const TopPanel = () => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = (path: string) => {
    setAnchorEl(null);
    router.push(`/dashboard/tests/${path}`);
  };

  const tests = [
    "situational-judgement",
    "numerical-reasoning",
    "logical-reasoning",
  ];

  return (
    <Stack
      pb={4}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <PageBreadcrumbs
        header="Tests"
        links={[
          { label: "Consulting", href: "/dashboard/courses/consulting" },
          { label: "Tests" },
        ]}
      />
      <Box>
        <Button
          variant="outlined"
          onClick={handleClick}
          endIcon={<ExpandMore />}
        >
          Begin new test
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          {tests.map((test) => (
            <MenuItem key={test} onClick={() => handleClose(test)}>
              {_.startCase(test.replace("-", " "))}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Stack>
  );
};

export default TopPanel;
