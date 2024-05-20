import IconSnackbar from "./IconSnackbar";

export const iconVariants = {
  success: (
    <IconSnackbar iconName="mdi:success-circle-outline" iconColor="green" />
  ),
  error: <IconSnackbar iconName="mi:circle-error" iconColor="red" />,
  info: (
    <IconSnackbar iconName="material-symbols:info-outline" iconColor="blue" />
  ),
  warning: <IconSnackbar iconName="fe:warning" iconColor="orange" />,
};
