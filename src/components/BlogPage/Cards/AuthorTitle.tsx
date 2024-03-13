import { Typography, SxProps } from "@mui/material";

type authorTitleProps = {
  children: React.ReactNode;
  sx?: any;
};

const AuthorTitle = ({ children, ...props }: authorTitleProps) => {
  return (
    <Typography fontSize={14} fontWeight={400}>
      {children}
    </Typography>
  );
};

export default AuthorTitle;
