import Image from "next/image";
import { Box, Card, Typography } from "@mui/material";

import SquareButton from "../Buttons/SquareButton";
import BulletPoints from "./BulletPoints";

type ItemProps = {
  title: string;
  content: string[];
  src: string;
  key: number;
};

const ItemCard = ({ title, content, src }: ItemProps) => {
  return (
    <Card sx={{ width: 300, borderRadius: 4 }} elevation={2}>
      <Image
        src={src}
        alt={`${title} image`}
        width={300}
        height={150}
        style={{ objectFit: "cover" }}
      />
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2.5 }}>
        <Typography variant="h5" fontWeight={500}>
          {title}
        </Typography>
        <BulletPoints points={content} />
        <SquareButton>Enroll now</SquareButton>
      </Box>
    </Card>
  );
};

export default ItemCard;
