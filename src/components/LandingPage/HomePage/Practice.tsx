import { Box, Card, Container, Typography } from "@mui/material";
import Image from "next/image";

import ArrowButton from "@/components/LandingPage/Buttons/ArrowButton";
import SmallTitle from "@/components/LandingPage/Titles/SmallTitle";

const practice = [
  {
    title: "Aptitude Tests",
    description:
      "Download this free suite of resume templates and watch in-depth, step-by-step resume advice videos.",
    src: "/imgs/practice/aptitude.jpeg",
  },
  {
    title: "HireVue",
    description:
      "Pick a case practice partner from our diverse community of top candidates, then get practicing.",
    src: "/imgs/practice/hirevue.jpeg",
  },
  {
    title: "Assessment Centre",
    description:
      "Book one-to-one mock interview sessions with one of our former consulting interviewers.",
    src: "/imgs/practice/assessment.jpeg",
  },
];

type ItemProps = {
  title: string;
  description: string;
  src: string;
  key: number;
};

const ItemCard = ({ title, description, src }: ItemProps) => {
  return (
    <Card sx={{ width: 300, borderRadius: 4 }} elevation={4}>
      <Image
        src={src}
        alt={`${title} image`}
        width={300}
        height={150}
        style={{ objectFit: "cover" }}
      />
      <Box sx={{ p: 2.5, display: "flex", flexDirection: "column", gap: 2.5 }}>
        <Typography variant="h5" fontWeight={500}>
          {title}
        </Typography>
        <Typography variant="body1">{description}</Typography>
        <ArrowButton href="/learn-more" style={{ textTransform: "uppercase" }}>
          Learn more
        </ArrowButton>
      </Box>
    </Card>
  );
};

const Practice = () => {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          py: { xs: 2, md: 6 },
        }}
      >
        <SmallTitle sx={{ textAlign: "center", pb: 4 }}>
          Practice Drills for Every Stage of the Process
        </SmallTitle>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            gap: { xs: 4, md: 2, lg: 8 },
            alignItems: "center",
          }}
        >
          {practice.map((item, key) => (
            <ItemCard key={key} {...item} />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Practice;
