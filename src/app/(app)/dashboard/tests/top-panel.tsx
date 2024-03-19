"use client";

import { PlayArrow } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import { PageBreadcrumbs } from "components/global-components";
import { useRouter } from "next/navigation";

const TopPanel = () => {
  const router = useRouter();
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
          variant="contained"
          color="primary"
          onClick={() => router.push("/dashboard/tests/situational-judgement")}
          startIcon={<PlayArrow />}
        >
          Begin new test
        </Button>
      </Box>
    </Stack>
  );
};

export default TopPanel;
