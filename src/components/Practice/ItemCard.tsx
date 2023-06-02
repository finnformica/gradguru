import Image from "next/image";

import { Card, Typography } from "@mui/material";

import ArrowButton from "@/components/Buttons/ArrowButton";

type ItemProps = {
  title: string;
  description: string;
  src: string;
  key: number;
};

const ItemCard = ({ title, description, src }: ItemProps) => {
  return (
    <Card sx={{ width: 300, height: 300 }}>
      <Image src={src} alt={`${title} image`} />
      <Typography variant="h5" fontWeight={500}>
        {title}
      </Typography>
      <Typography variant="body1">{description}</Typography>
      <ArrowButton href="/learn-more">Learn more</ArrowButton>
    </Card>
  );
};

export default ItemCard;
