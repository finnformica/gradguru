import { Container } from "@mui/material";
import { PageBreadcrumbs } from "components/global";

const page = () => {
  return (
    <Container>
      <PageBreadcrumbs
        header={"HireView"}
        links={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "HireView" },
        ]}
      />
    </Container>
  );
};

export default page;
