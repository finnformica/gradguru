import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type BulletPointsProps = {
  points: string[];
};

const BulletPoints = ({ points }: BulletPointsProps) => (
  <>
    {points.map((point, key) => (
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }} key={key}>
        <CheckCircleIcon
          sx={{
            color: (theme) => theme.palette.primary.main,
            transform: "translateY(3px)",
          }}
          fontSize="small"
        />

        <Typography variant="body1">{point}</Typography>
      </Box>
    ))}
  </>
);

export default BulletPoints;
