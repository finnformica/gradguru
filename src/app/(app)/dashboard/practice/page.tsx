"use client";
import { Button, Container, Skeleton, Stack } from "@mui/material";
import { PageBreadcrumbs } from "components/global";
import { useState } from "react";

const VideoAssessmentPractice = () => {
  const buttonWidth = "75px";
  const [recording, setRecording] = useState(false);
  return (
    <Container maxWidth={"lg"}>
      <PageBreadcrumbs
        header={"Video Assessment Practice"}
        links={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Video Assessment Practice" },
        ]}
      />

      <Stack direction={"column"} sx={{ width: "100%", alignItems: "center" }}>
        <Skeleton
          variant="rectangular"
          width={800}
          height={500}
          sx={{ my: 10 }}
        />
        <Stack
          direction={"row"}
          spacing={10}
          sx={{ width: "100%", justifyContent: "center" }}
        >
          {recording ? (
            <Button
              onClick={() => setRecording(false)}
              sx={{
                backgroundColor: "#FF0000",
                width: buttonWidth,
                color: "white",
                "&:hover": { backgroundColor: "rgba(255,0,0,0.8)" },
              }}
            >
              Stop
            </Button>
          ) : (
            <Button
              onClick={() => setRecording(true)}
              variant="contained"
              sx={{ width: buttonWidth }}
            >
              Record
            </Button>
          )}
          <Button variant="outlined">Reset</Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default VideoAssessmentPractice;
