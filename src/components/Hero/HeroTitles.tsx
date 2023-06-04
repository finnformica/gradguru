import { Typography } from "@mui/material";

import { TitleProps } from "../globalTypes";

const HeroSubtitle = ({ children }: TitleProps) => {
  return <Typography variant="body1">{children}</Typography>;
};

export { HeroSubtitle };
