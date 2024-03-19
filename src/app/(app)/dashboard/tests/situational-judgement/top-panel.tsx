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
        header="Situational Judgement"
        links={[{ label: "Tests" }, { label: "Situational Judgement" }]}
      />
      <Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlayArrow />}
          onClick={() =>
            router.replace("dashboard/tests/situational-judgement/test")
          }
        >
          Start new test
        </Button>
      </Box>
    </Stack>
  );
};

export default TopPanel;
