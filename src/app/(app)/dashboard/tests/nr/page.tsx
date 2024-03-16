import { PageBreadcrumbs } from "components/global-components";

const NumericalReasoningTest = () => {
  return (
    <PageBreadcrumbs
      header="Numerical Reasoning"
      links={[
        { label: "Tests", href: "/dashboard/tests" },
        { label: "Numerical Reasoning" },
      ]}
    />
  );
};

export default NumericalReasoningTest;
