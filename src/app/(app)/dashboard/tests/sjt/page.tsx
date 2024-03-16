import { Container } from "@mui/material";
import { PageBreadcrumbs } from "components/global-components";

const SituationJudgementTest = () => {
  return (
    <Container maxWidth="xl">
      <PageBreadcrumbs
        header="Situational Judgement"
        links={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tests", href: "/dashboard/tests" },
          { label: "Situational Judgement" },
        ]}
      />
    </Container>
  );
};

export default SituationJudgementTest;
