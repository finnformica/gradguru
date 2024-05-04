import { PageBreadcrumbs } from "components/global";

const CoursePage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  return (
    <PageBreadcrumbs
      header={slug}
      links={[{ label: "Dashboard", href: "/dashboard" }, { label: slug }]}
    />
  );
};

export default CoursePage;
