import { Typography } from "@mui/material";

interface TitleProps {
  children: React.ReactNode;
  sx?: object;
}

const BigTitle = ({ children, ...props }: TitleProps) => {
  return (
    <Typography
      variant="h1"
      fontSize="2.25rem"
      fontWeight={500}
      sx={{ pb: 2, letterSpacing: "1px", ...props.sx }}
    >
      {children}
    </Typography>
  );
};
export default BigTitle;
