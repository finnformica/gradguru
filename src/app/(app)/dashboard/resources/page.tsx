import { Container } from "@mui/material";
import { PageBreadcrumbs } from "components/global-components";

const CourseResources = () => {
  return (
    <Container maxWidth="xl">
      <PageBreadcrumbs
        header="Resources"
        links={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Resources" },
        ]}
      />
    </Container>
  );
};

export default CourseResources;
