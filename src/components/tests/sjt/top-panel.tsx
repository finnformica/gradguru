import { Stack } from "@mui/material";
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
          { label: "Tests" },
          {
            label: "Situational Judgement",
            href: "/dashboard/tests/situational-judgement",
          },
          { label: "Test" },
        ]}
      />
    </Stack>
  );
};

export default TopPanel;
