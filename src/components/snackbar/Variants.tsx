import IconSnackbar from "./icon-snackbar";

export const iconVariants = {
  success: (
    <IconSnackbar iconName="mdi:success-circle-outline" iconColor="success" />
  ),
  error: <IconSnackbar iconName="mi:circle-error" iconColor="error" />,
  info: (
    <IconSnackbar iconName="material-symbols:info-outline" iconColor="info" />
  ),
  warning: (
    <IconSnackbar iconName="ant-design:warning-outlined" iconColor="warning" />
  ),
};
