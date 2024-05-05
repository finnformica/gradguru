"use client";

import _ from "lodash";
import { useRouter } from "next/navigation";

import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Grid,
} from "@mui/material";

import { PageBreadcrumbs } from "components/global";

const aptitudeTests = [
  {
    label: "Numerical Reasoning",
    icon: "/icons/test-icons/nr-black.svg",
  },
  {
    label: "Situational Judgement",
    icon: "/icons/test-icons/sj-black.svg",
  },
  {
    label: "Logical Reasoning",
    icon: "/icons/test-icons/lr-black.svg",
  },
];

const CourseTests = () => {
  const router = useRouter();

  return (
    <>
      <PageBreadcrumbs
        sx={{ pb: 2 }}
        header=" Aptitude Tests"
        links={[
          { label: "Consulting", href: "/dashboard/courses/consulting" },
          { label: "Tests" },
        ]}
      />
      <Grid container spacing={2}>
        {aptitudeTests.map((test) => (
          <Grid key={test.label} item xs={12} sm={6} md={4}>
            <Card sx={{ mb: 2, borderRadius: 4 }}>
              <CardActionArea
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  p: 1,
                }}
                onClick={() =>
                  router.push(`/dashboard/tests/${_.kebabCase(test.label)}`)
                }
              >
                <CardMedia
                  image={test.icon}
                  component="img"
                  sx={{ height: 75, width: 75, mr: 2 }}
                  title={test.label}
                />
                <CardHeader title={test.label} />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CourseTests;
