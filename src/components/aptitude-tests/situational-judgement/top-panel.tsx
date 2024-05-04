import { Stack } from "@mui/material";
import { PageBreadcrumbs } from "components/global";

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
            href: "/dashboard/tests/situational-judgement",
          },
          {
            label: "Situational Judgement",
          },
        ]}
      />
    </Stack>
  );
};

export default TopPanel;
