"use client";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from "@mui/material";
import { Iconify, PageBreadcrumbs } from "components/global";
import _ from "lodash";
import { useRouter } from "next/navigation";

const hireViewTests = [
  {
    label: "Leadership",
    icon: "icon-park-twotone:muscle",
  },
  {
    label: "Strengths",
    icon: "ph:plus-circle-duotone",
  },
  {
    label: "weaknesses",
    icon: "solar:minus-circle-bold-duotone",
  },
];

const HireViewHome = () => {
  const router = useRouter();

  return (
    <Container maxWidth="md">
      <PageBreadcrumbs
        header={"HireView"}
        links={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "HireView" },
        ]}
      />
      <Grid container spacing={2} mt={4}>
        {hireViewTests.map((test) => (
          <Grid key={test.label} item xs={12} md={4}>
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
                  router.push(`/dashboard/hireview/${_.kebabCase(test.label)}`)
                }
              >
                <CardContent>
                  <Iconify icon={test.icon} />
                </CardContent>
                <CardHeader title={test.label} />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HireViewHome;
