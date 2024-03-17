import { Box, Button, Stack } from "@mui/material";
import { PageBreadcrumbs } from "components/global-components";

const TopPanel = () => {
  return (
    <Stack
      pb={4}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <PageBreadcrumbs
        header="Situational Judgement"
        links={[
          { label: "Tests", href: "/dashboard/tests" },
          { label: "Situational Judgement" },
        ]}
      />
      <Box>
        <Button variant="contained" color="primary">
          Action
        </Button>
      </Box>
    </Stack>
  );
};

export default TopPanel;
