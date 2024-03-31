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
        header="Numerical Reasoning"
        links={[
          {
            label: "Numerical Reasoning",
            href: "/dashboard/tests/numerical-reasoning",
          },
          { label: testId },
        ]}
      />
    </Stack>
  );
};

export default TopPanel;
