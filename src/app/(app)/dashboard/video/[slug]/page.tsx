"use client";

import { notFound } from "next/navigation";

import { Container } from "@mui/material";

import { useCourse } from "api/courses";
import {
  CourseDescription,
  VideoControls,
  VideoPlayer,
} from "components/CourseVideoPage";
import { LoadingScreen, PageBreadcrumbs } from "components/global-components";
import { useCourse as useCourseContext } from "context/course";
import { useSession } from "next-auth/react";

type VideoPageProps = {
  params: { slug: string };
};

const VideoPage = ({ params }: VideoPageProps) => {
  const { data: session } = useSession();
  const { setCourse } = useCourseContext();
  const { slug } = params;

  const { course, loading, error } = useCourse(slug);

  // if data has loaded and course is null, or if user does not have access, return 404
  if ((!loading && !course) || error || !session?.user.courses.includes(slug)) {
    notFound();
  }

  // if data is loading, show loading screen
  if (!course || loading) return <LoadingScreen />;

  setCourse(course);

  return (
    <>
      <PageBreadcrumbs
        header={slug}
        links={[
          { label: slug, href: `/dashboard/courses/${slug}` },
          { label: "Video" },
        ]}
      />
      <Container maxWidth="lg">
        <VideoPlayer />
        <VideoControls />
        <CourseDescription />
      </Container>
    </>
  );
};

export default VideoPage;