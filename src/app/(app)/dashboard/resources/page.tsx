"use client";

import { useEffect, useState } from "react";
import _ from "lodash";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";

import { getResources } from "api/resources";
import { LoadingScreen, PageBreadcrumbs } from "components/global-components";

import { IResource } from "types";

const ResourceCard = ({ resource }: { resource: IResource }) => {
  return (
    <Card>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {resource.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {resource.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Download</Button>
      </CardActions>
    </Card>
  );
};

const ResourceSection = ({
  title,
  resources,
}: {
  title: string;
  resources: IResource[];
}) => {
  return (
    <Stack spacing={2} my={3}>
      <Typography variant="h4">{title}</Typography>
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
        }}
      >
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </Box>
    </Stack>
  );
};

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

  useEffect(() => {
    console.log(resources);
  }, [resources]);

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
