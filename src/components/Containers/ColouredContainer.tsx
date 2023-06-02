import { Box, useTheme } from "@mui/material";

type ColouredContainerProps = {
  children: React.ReactNode;
  sx?: object;
};

const ColouredContainer = ({ children, ...props }: ColouredContainerProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.light,
        borderRadius: "24px",
        padding: "2rem 4rem",
        margin: "2rem 3rem",
        ...props.sx,
      }}
    >
      {children}
    </Box>
  );
};

export default ColouredContainer;
