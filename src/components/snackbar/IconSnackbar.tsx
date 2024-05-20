import { Icon } from "@iconify/react";
import { Box } from "@mui/material";

type IconSnackbarProps = {
  iconName: string;
  iconColor: string;
};

const IconSnackbar = ({ iconName, iconColor }: IconSnackbarProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: 25,
        height: 25,
        justifyContent: "center",
        mr: 1,
        alignItems: "center",
        borderRadius: "4px",
        color: iconColor,
      }}
    >
      <Icon icon={iconName} width="25" height="25" />
    </Box>
  );
};

export default IconSnackbar;
