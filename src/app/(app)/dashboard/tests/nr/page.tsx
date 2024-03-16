import { Container } from "@mui/material";
import { PageBreadcrumbs } from "components/global-components";

const NumericalReasoningTest = () => {
  return (
    <Container maxWidth="xl">
      <PageBreadcrumbs
        header="Numerical Reasoning"
        links={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tests", href: "/dashboard/tests" },
          { label: "Numerical Reasoning" },
        ]}
      />
    </Container>
  );
};

export default NumericalReasoningTest;
