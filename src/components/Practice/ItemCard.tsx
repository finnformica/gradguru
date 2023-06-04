import Image from "next/image";

import { Box, Card, Typography } from "@mui/material";

import ArrowButton from "@/components/Buttons/ArrowButton";

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

export default ItemCard;
