"use client";

import { useRef } from "react";

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

import { Download } from "@mui/icons-material";
import { useTruncatedElement } from "hooks";
import { IResource } from "types";
import { retrieveStorageItem } from "lib/firebase/utils";

const downloadMedia = (path: string, filename: string) => {
  retrieveStorageItem(path).then((file) => {
    // Create a URL for the file and click on it to download
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename; // Set the file name
    a.click();
  });
};

const resourceTypeToIcon = (type: string) => {
  switch (type) {
    case "assessment-centre":
      return "/icons/resource-icons/ac-black.svg";
    case "in-tray-exercises":
      return "/icons/resource-icons/in-tray-black.svg";
    default:
      return "/icons/test-icons/lr-black.svg";
  }
};

const ResourceCard = ({ resource }: { resource: IResource }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const ref = useRef(null);
  const { isTruncated, isShowingMore, toggleIsShowingMore } =
    useTruncatedElement({
      ref,
    });

  return (
    <Card elevation={0} sx={{ display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ display: "flex" }}>
        {!isMobile && (
          <CardMedia
            component="img"
            sx={{ height: 75, width: 75, mr: 2 }}
            image={resourceTypeToIcon(resource.type.value)}
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
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
        }}
      >
        {isTruncated && (
          <Button
            onClick={toggleIsShowingMore}
            size="small"
            sx={{ color: "grey.500" }}
          >
            {isShowingMore ? "Show less" : "Show more"}
          </Button>
        )}
        <Button
          startIcon={<Download />}
          variant="contained"
          size="small"
          onClick={() => downloadMedia(resource.file as string, resource.name)}
        >
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
          gap: 5,
          gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))",
        }}
      >
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </Box>
    </Stack>
  );
};

export default ResourceSection;
