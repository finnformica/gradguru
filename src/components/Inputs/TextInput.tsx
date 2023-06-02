import React, { useState } from "react";
import { useTheme } from "@mui/material";

type TextInputProps = {
  placeholder: string;
  style?: object;
};

const TextInput = ({ placeholder, ...props }: TextInputProps) => {
  const [hasFocus, setFocus] = useState(false);

  const theme = useTheme();

  return (
    <input
      type="text"
      placeholder={placeholder}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        borderRadius: "8px 2px 2px 8px",
        border: "none",
        backgroundColor: "#EEF2F2",
        outline: hasFocus ? `2px solid ${theme.palette.primary.main}` : "none",
        ...props.style,
      }}
    />
  );
};

export default TextInput;
