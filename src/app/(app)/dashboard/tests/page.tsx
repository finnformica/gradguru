import { Container } from "@mui/material";
import { PageBreadcrumbs } from "components/global-components";

const CourseTests = () => {
  return (
    <Container maxWidth="xl">
      <PageBreadcrumbs
        header="Tests"
        links={[{ label: "Dashboard", href: "/dashboard" }, { label: "Tests" }]}
      />
    </Container>
  );
};

export default CourseTests;
