import { Typography } from "@mui/material";

type TitleProps = {
  text: string;
};

const HeroTitle = ({ text }: TitleProps) => {
  return (
    <Typography
      variant="h1"
      fontSize="2.25rem"
      fontWeight={500}
      sx={{ pb: 2, letterSpacing: "1px" }}
    >
      {text}
    </Typography>
  );
};

const HeroSubtitle = ({ text }: TitleProps) => {
  return <Typography variant="body1">{text}</Typography>;
};

export { HeroTitle, HeroSubtitle };
