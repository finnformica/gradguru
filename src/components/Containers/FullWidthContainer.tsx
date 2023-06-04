import { Box } from "@mui/material";

type FullWidthContainerProps = {
  children: React.ReactNode;
};

const FullWidthContainer = ({ children }: FullWidthContainerProps) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 12,
        py: 6,
        backgroundColor: (theme) => theme.palette.secondary.light,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default FullWidthContainer;
