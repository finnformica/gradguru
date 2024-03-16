import { Container } from "@mui/material";
import { PageBreadcrumbs } from "components/global-components";

const LogicalReasoningTest = () => {
  return (
    <Container maxWidth="xl">
      <PageBreadcrumbs
        header="Logical Reasoning"
        links={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tests", href: "/dashboard/tests" },
          { label: "Logical Reasoning" },
        ]}
      />
    </Container>
  );
};

export default LogicalReasoningTest;
