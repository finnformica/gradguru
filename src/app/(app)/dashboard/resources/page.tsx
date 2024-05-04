"use client";

import _ from "lodash";
import { useEffect, useState } from "react";

import { getResources } from "api/resources";
import { LoadingScreen, PageBreadcrumbs } from "components/global";
import { ResourceSection } from "components/resources";
import { IResource } from "types";

const CourseResources = () => {
  const [resources, setResources] = useState<{
    [key: string]: IResource[];
  } | null>(null);

  useEffect(
    () =>
      getResources("consulting", (resources) =>
        setResources(_.groupBy(resources, (resource) => resource.type.label))
      ),
    []
  );

  if (!resources) return <LoadingScreen />;

  return (
    <>
      <PageBreadcrumbs
        header="Resources"
        links={[
          { label: "Consulting", href: "/dashboard/consulting" },
          { label: "Resources" },
        ]}
      />
      {Object.entries(resources).map(([type, resources]) => (
        <ResourceSection key={type} title={type} resources={resources} />
      ))}
    </>
  );
};

export default CourseResources;
