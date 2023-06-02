import { Typography } from "@mui/material";

type TitleProps = {
  children: string;
};

const HeroTitle = ({ children }: TitleProps) => {
  return (
    <Typography
      variant="h1"
      fontSize="2.25rem"
      fontWeight={500}
      sx={{ pb: 2, letterSpacing: "1px" }}
    >
      {children}
    </Typography>
  );
};

const HeroSubtitle = ({ children }: TitleProps) => {
  return <Typography variant="body1">{children}</Typography>;
};

export { HeroTitle, HeroSubtitle };
