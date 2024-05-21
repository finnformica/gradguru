import { BoxProps } from "@mui/material";
import { Iconify } from "components/global";

type IconSnackbarProps = {
  iconName: string;
  iconColor: BoxProps["color"];
};

const IconSnackbar = ({ iconName, iconColor }: IconSnackbarProps) => {
  return (
    <Iconify
      color={`${iconColor}.main`}
      width={25}
      sx={{
        mr: 1,
      }}
      icon={iconName}
    />
  );
};

export default IconSnackbar;
