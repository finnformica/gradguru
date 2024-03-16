import { PageBreadcrumbs } from "components/global-components";

const SituationJudgementTest = () => {
  return (
    <PageBreadcrumbs
      header="Situational Judgement"
      links={[
        { label: "Tests", href: "/dashboard/tests" },
        { label: "Situational Judgement" },
      ]}
    />
  );
};

export default SituationJudgementTest;
