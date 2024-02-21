import Image from "next/image";
import { Container, useTheme, useMediaQuery } from "@mui/material";

import FullWidthContainer from "@/components/LandingPage/Containers/FullWidthContainer";
import SmallTitle from "@/components/LandingPage/Titles/SmallTitle";
import BulletPoints from "@/components/LandingPage/BulletPoints";

const points = [
  "Learn what your specific assessment centre process will likely entail.",
  "Use our independent study drills to practice for each stage of your assessment centre.",
  "Discover what successful candidates do in their assessment centres that sets them apart.",
];

const AssessmentCentre = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <FullWidthContainer sx={{ mt: 12 }}>
      <SmallTitle>Assessment Centre</SmallTitle>
      <Container
        maxWidth="lg"
        sx={{
          py: 6,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-around",
          gap: 4,
        }}
      >
        <Image
          src="/imgs/learn-more/assessment-centre.jpeg"
          alt="Assessment centre image"
          width={!isMobile ? 500 : 350}
          height={!isMobile ? 350 : 200}
          style={{ objectFit: "cover", borderRadius: 4 }}
        />
        <BulletPoints points={points} container={{ gap: 1 }} />
      </Container>
    </FullWidthContainer>
  );
};

export default AssessmentCentre;
