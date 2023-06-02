import { Box } from "@mui/material";

type ColouredContainerProps = {
  children: React.ReactNode;
  sx?: object;
};

const ColouredContainer = ({ children, ...props }: ColouredContainerProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#F3F2E7",
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
