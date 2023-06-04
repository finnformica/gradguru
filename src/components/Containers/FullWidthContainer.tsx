import { Box } from "@mui/material";

type FullWidthContainerProps = {
  children?: React.ReactNode;
  sx?: object;
};

const FullWidthContainer = ({
  children,
  ...props
}: FullWidthContainerProps) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 6,
        backgroundColor: (theme) => theme.palette.secondary.light,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        ...props.sx,
      }}
    >
      {children}
    </Box>
  );
};

export default FullWidthContainer;
