import { Typography } from "@mui/material";

type SmallerTitleProps = {
  children: React.ReactNode;
  sx?: object;
};

const SmallerTitle = ({ children, ...props }: SmallerTitleProps) => {
  return (
    <Typography variant="subtitle2" fontSize={16} sx={{ pb: 1, ...props.sx }}>
      {children}
    </Typography>
  );
};

export default SmallerTitle;
