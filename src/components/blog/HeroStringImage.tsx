import { Delete } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import Image from "next/image";

type HeroImageStringProps = {
  ImageUrl: string;
  handleClearChange: () => void;
};

const HeroStringImage = ({
  ImageUrl,
  handleClearChange,
}: HeroImageStringProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Image
        src={ImageUrl}
        width={400}
        height={300}
        alt="Selected hero photo"
        style={{
          borderRadius: "12px",
        }}
      />
      <Typography variant="body1">{ImageUrl}</Typography>
      <Tooltip title="Clear Image">
        <IconButton onClick={handleClearChange}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default HeroStringImage;
