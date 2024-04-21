"use client";

import _ from "lodash";
import { useEffect, useRef, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { getResources } from "api/resources";
import { LoadingScreen, PageBreadcrumbs } from "components/global-components";

import { IResource } from "types";
import { useTruncatedElement } from "hooks";
import { Download } from "@mui/icons-material";

const ResourceCard = ({ resource }: { resource: IResource }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const ref = useRef(null);
  const { isTruncated, isShowingMore, toggleIsShowingMore } =
    useTruncatedElement({
      ref,
    });

  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ display: "flex" }}>
        {!isMobile && (
          <CardMedia
            component="img"
            sx={{ height: 75, width: 75, mr: 2 }}
            image="/icons/test-icons/lr-black.svg"
            title={resource.name}
          />
        )}
        <Box>
          <Typography gutterBottom variant="h6" component="div">
            {resource.name}
          </Typography>
          <Typography
            ref={ref}
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitLineClamp: isShowingMore ? "unset" : 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {resource.description}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        {isTruncated && (
          <Button onClick={toggleIsShowingMore} size="small">
            {isShowingMore ? "Show less" : "Show more"}
          </Button>
        )}
        <Button startIcon={<Download />} variant="contained" size="small">
          Download
        </Button>
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
      <Typography variant="h5">{title}</Typography>
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
