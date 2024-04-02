export const renderHelperText = (type?: string) => {
  if (!type) return null;
  switch (type.toLowerCase()) {
    case "currency":
      return "Provider numeric value only";
    case "number":
      return "If applicable, provide value to 2d.p.";
    case "string":
      return "If ratio value, provide in the form x:y";
    default:
      return "Type not specified";
  }
};

export const textFieldInputValidation = (type?: string) => {
  switch (type) {
    case "currency":
    case "number":
      return "number";
    case "string":
      return "text";
    default:
      return "text";
  }
};
