import { Box, Container, useTheme } from "@mui/material";

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
        p: { xs: "2rem", md: "2rem 4rem" },
        m: { xs: "2rem 0", sm: "2rem 3rem" },
        ...props.sx,
      }}
    >
      <Container maxWidth="md">{children}</Container>
    </Box>
  );
};

export default ColouredContainer;
