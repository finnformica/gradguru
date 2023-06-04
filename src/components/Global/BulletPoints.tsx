import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type BulletPointsProps = {
  points: string[];
  sx?: object;
  icon?: object;
  container?: object;
};

const BulletPoints = ({ points, ...props }: BulletPointsProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      maxWidth: { xs: "500px", md: "300px", lg: "500px" },
      ...props.container,
    }}
  >
    {points.map((point, key) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          my: 0.5,
          textAlign: "left",
          gap: 1,
          ...props.sx,
        }}
        key={key}
      >
        <CheckCircleIcon
          sx={{
            color: (theme) => theme.palette.primary.main,
            ...props.icon,
          }}
          fontSize="small"
        />

        <Typography variant="body2">{point}</Typography>
      </Box>
    ))}
  </Box>
);

export default BulletPoints;
