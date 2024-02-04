import CircularProgress from "@mui/material/CircularProgress";

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
      {loading && <CircularProgress size={size} />}
    </>
  );
};

export default LoadingWrapper;
