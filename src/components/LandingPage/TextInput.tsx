import { useTheme } from "@mui/material";
import { useState } from "react";

type MultilineProps = {
  rows: number;
  cols: number;
  show: boolean;
};

type TextInputProps = {
  placeholder: string;
  style?: object;
  state: string;
  multiline?: MultilineProps;
  onChange: (state: string) => void;
  autoComplete?: string;
};

const TextInput = ({ ...props }: TextInputProps) => {
  const [hasFocus, setFocus] = useState(false);
  const { state, onChange } = props;

  const theme = useTheme();

  const style = (props: TextInputProps) => ({
    borderRadius: "8px",
    border: "none",
    outline: hasFocus ? `2px solid ${theme.palette.primary.main}` : "none",
    ...props.style,
  });

  return props.multiline?.show ? (
    <textarea
      autoComplete={props.autoComplete || "off"}
      placeholder={props.placeholder}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      value={state}
      onChange={(e) => onChange(e.target.value)}
      style={style(props)}
      rows={props.multiline.rows}
      cols={props.multiline.cols}
    ></textarea>
  ) : (
    <input
      type="text"
      autoComplete={props.autoComplete || "off"}
      placeholder={props.placeholder}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      value={state}
      onChange={(e) => onChange(e.target.value)}
      style={style(props)}
    />
  );
};

export default TextInput;
