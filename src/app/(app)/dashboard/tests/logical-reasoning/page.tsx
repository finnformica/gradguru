import { PageBreadcrumbs } from "components/global";

const LogicalReasoningTest = () => {
  return (
    <PageBreadcrumbs
      header="Logical Reasoning"
      links={[
        { label: "Tests", href: "/dashboard/tests" },
        { label: "Logical Reasoning" },
      ]}
    />
  );
};

export default LogicalReasoningTest;
