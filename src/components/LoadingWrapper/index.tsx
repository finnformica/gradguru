import { CircularProgress, Box } from "@mui/material";

type LoadingWrapperProps = {
  children: React.ReactNode;
  loading: boolean;
  size?: number;
};

const LoadingWrapper = ({
  children,
  loading,
  size = 40,
}: LoadingWrapperProps) => {
  return (
    <>
      {!loading && children}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress size={size} />
        </Box>
      )}
    </>
  );
};

export default LoadingWrapper;
