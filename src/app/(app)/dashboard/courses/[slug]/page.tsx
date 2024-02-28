import { notFound } from "next/navigation";

import { Container } from "@mui/material";

import VideoPlayerWithControls from "@/components/CourseVideoPage";
import { CourseType } from "@/components/globalTypes";

type CoursePageProps = {
  params: { slug: string };
};

const CoursePage = async ({ params }: CoursePageProps) => {
  const { slug } = params;

  const fetchData = async () => {
    // retrieve course from database
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=courses&document=${slug}`
    )
      .then((res) => res.json())
      .then((res) => res.data);

    // if course is found, set course in context
    return data as CourseType;
  };

  const course = await fetchData().catch((err) => {
    console.log(err);
  });

  if (!course) {
    notFound();
  }

  return (
    <Container maxWidth="lg" disableGutters>
      <VideoPlayerWithControls course={course} />
    </Container>
  );
};

export default CoursePage;
