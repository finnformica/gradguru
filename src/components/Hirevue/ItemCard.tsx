import Image from "next/image";
import { Box, Card, Typography } from "@mui/material";

import SquareButton from "../Buttons/SquareButton";
import BulletPoints from "../Global/BulletPoints";

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

export default ItemCard;
