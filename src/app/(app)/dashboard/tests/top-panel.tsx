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
        header="Tests"
        links={[
          { label: "Consulting", href: "/dashboard/courses/consulting" },
          { label: "Tests" },
        ]}
      />
    </Stack>
  );
};

export default TopPanel;
