import { Stack } from "@mui/material";
import { PageBreadcrumbs } from "components/global-components";

const TopPanel = ({ testId }: { testId: string }) => {
  return (
    <Stack
      pb={4}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <PageBreadcrumbs
        header={testId}
        links={[
          {
            label: "Tests",
            href: "/dashboard/tests/numerical-reasoning",
          },
          { label: "Numerical Reasoning" },
        ]}
      />
    </Stack>
  );
};

export default TopPanel;
