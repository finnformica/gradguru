import { Box, Typography } from "@mui/material";
import Image from "next/image";

type ItemProps = {
  title: string;
  description: string;
  src: string;
};

const Item = ({ title, description, src }: ItemProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image src={src} width={100} height={100} alt="Feature icon" />
      </Box>
      <Box>
        <Typography variant="h6" fontWeight={500}>
          {title}
        </Typography>
        <Typography variant="body2" fontWeight={300}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default Item;
