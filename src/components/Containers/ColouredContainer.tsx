import { Box } from "@mui/material";

type ColouredContainerProps = {
  children: React.ReactNode;
};

const ColouredContainer = ({ children, ...props }: ColouredContainerProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#F3F2E7",
        borderRadius: "24px",
        padding: "2rem 4rem",
        margin: "2rem 3rem",
      }}
    >
      {children}
    </Box>
  );
};

export default ColouredContainer;
