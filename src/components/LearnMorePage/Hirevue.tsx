import { useState } from "react";
import Image from "next/image";

import { Box, Container, Card, Typography } from "@mui/material";

import MUIModal from "@/components/Global/UdemyModal";
import SmallTitle from "@/components/Titles/SmallTitle";
import SquareButton from "@/components/Buttons/SquareButton";
import BulletPoints from "@/components/Global/BulletPoints";

const cards = [
  {
    title: "Email Questions",
    content: [
      "See example Hireve email questions.",
      "Practice with example questions.",
      "Use the model answers to improve and perfect your email responses.",
    ],
    src: "/imgs/learn-more/typing.jpeg",
  },
  {
    title: "Situational Questions",
    content: [
      "Learn how to effectively use the STAR framework for situational questions.",
      "Practice with over 100+ example questions.",
      "Reflect on your responses against our model answers.",
    ],
    src: "/imgs/learn-more/high-five.jpeg",
  },
  {
    title: "Job Specific Questions",
    content: [
      "Understand what recruiters are looking for from your responses.",
      "Practice with over 100+ example questions.",
      "Compare responses with our model answers.",
    ],
    src: "/imgs/learn-more/interview.jpeg",
  },
];

type ItemProps = {
  title: string;
  content: string[];
  src: string;
  key: number;
  onClick: () => void;
};

const ItemCard = ({ title, content, src, onClick }: ItemProps) => {
  return (
    <Card sx={{ width: 300, borderRadius: 4 }} elevation={2}>
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
        <BulletPoints
          points={content}
          icon={{ transform: "translateY(3px)" }}
          container={{ gap: 2 }}
        />
        <SquareButton onClick={onClick}>Enroll now</SquareButton>
      </Box>
    </Card>
  );
};

const Hirevue = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container maxWidth="xl">
      <MUIModal open={isModalOpen} setOpen={setIsModalOpen} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          py: { xs: 2, md: 6 },
        }}
      >
        <SmallTitle sx={{ textAlign: "center", pb: 4 }}>
          HireVue Coaching
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
          {cards.map((item, key) => (
            <ItemCard
              key={key}
              {...item}
              onClick={() => setIsModalOpen(true)}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Hirevue;
