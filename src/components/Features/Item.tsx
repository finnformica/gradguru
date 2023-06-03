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
        gap: { xs: 3, md: 0 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          transform: { xs: "none", md: "translateX(-8px)" },
        }}
      >
        <Image src={src} width={80} height={90} alt={`${title} icon`} />
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
