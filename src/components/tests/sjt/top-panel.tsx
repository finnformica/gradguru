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
        header="Situational Judgement"
        links={[
          {
            label: "Situational Judgement",
            href: "/dashboard/tests/situational-judgement",
          },
          {
            label: testId,
          },
        ]}
      />
    </Stack>
  );
};

export default TopPanel;
