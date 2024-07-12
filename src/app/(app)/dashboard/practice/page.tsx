"use client";

import { Button, Container, Stack, Typography } from "@mui/material";
import { PageBreadcrumbs } from "components/global";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const VideoAssessmentPractice = () => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [showRecordedVideo, setShowRecordedVideo] = useState<boolean>(false);

  const handleDataAvailable = useCallback(
    ({ data }: BlobEvent) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    setShowRecordedVideo(false); // Hide recorded video if shown

    if (webcamRef.current && webcamRef.current.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm",
      });

      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );

      mediaRecorderRef.current.start();
    }
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    setCapturing(false);
    setShowRecordedVideo(true); // Show recorded video
  }, [mediaRecorderRef, setCapturing, setShowRecordedVideo]);

  const handleReset = useCallback(() => {
    setRecordedChunks([]);
    setShowRecordedVideo(false);
  }, [setRecordedChunks, setShowRecordedVideo]);

  return (
    <Container maxWidth={"lg"}>
      <PageBreadcrumbs
        header={"Video Assessment Practice"}
        links={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Video Assessment Practice" },
        ]}
      />

      <Stack
        direction={"column"}
        mt={6}
        gap={6}
        sx={{ width: "100%", alignItems: "center" }}
      >
        <Typography variant="h4" textAlign={"center"}>
          Question: This is the question that the person will be asnwering
        </Typography>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{ width: "100%", justifyContent: "center" }}
        >
          {capturing ? (
            <Button
              onClick={handleStopCaptureClick}
              variant="contained"
              color="secondary"
            >
              Stop Capture
            </Button>
          ) : (
            <Button
              onClick={handleStartCaptureClick}
              variant="contained"
              color="primary"
            >
              Start Capture
            </Button>
          )}

          <Button onClick={handleReset} variant="outlined">
            Reset
          </Button>
        </Stack>
        {showRecordedVideo && recordedChunks.length > 0 ? (
          <video controls width={800} height={500}>
            <source
              src={URL.createObjectURL(
                new Blob(recordedChunks, { type: "video/webm" })
              )}
              type="video/webm"
            />
            <track kind="captions" srcLang="en" label="English captions" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Webcam audio={false} ref={webcamRef} />
        )}
      </Stack>
    </Container>
  );
};

export default VideoAssessmentPractice;
