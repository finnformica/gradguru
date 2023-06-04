import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type BulletPointsProps = {
  points: string[];
};

const BulletPoints = ({ points }: BulletPointsProps) => (
  <>
    {points.map((point, key) => (
      <Box
        sx={{ display: "flex", alignItems: "flex-start", gap: 1, my: 0.5 }}
        key={key}
      >
        <CheckCircleIcon
          sx={{
            color: (theme) => theme.palette.primary.main,
            transform: "translateY(3px)",
          }}
          fontSize="small"
        />

        <Typography variant="body2">{point}</Typography>
      </Box>
    ))}
  </>
);

export default BulletPoints;
