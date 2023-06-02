import React, { useState } from "react";
import { useTheme } from "@mui/material";

const TextInput = ({ placeholder, ...props }: any) => {
  const [hasFocus, setFocus] = useState(false);

  const theme = useTheme();

  return (
    <input
      type="text"
      placeholder={placeholder}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        height: "32px",
        borderRadius: "8px 2px 2px 8px",
        border: "none",
        paddingLeft: "16px",
        marginRight: "6px",
        backgroundColor: "#EEF2F2",
        width: "275px",
        outline: hasFocus ? `2px solid ${theme.palette.primary.main}` : "none",
        ...props,
      }}
    />
  );
};

export default TextInput;
