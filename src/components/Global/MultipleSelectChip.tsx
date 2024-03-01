import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

export default function MultipleSelectChip({
  options,
  values,
  sx,
}: {
  options: string[];
  values: string[];
  sx?: SxProps;
}) {
  const [option, setOption] = useState<string[]>(values);

  const handleChange = (event: SelectChangeEvent<typeof option>) => {
    const {
      target: { value },
    } = event;
    setOption(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Select
      multiple
      value={option}
      onChange={handleChange}
      sx={{ width: "100%", ...sx }}
      input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
      renderValue={(selected) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {selected.map((value) => (
            <Chip key={value} label={value} />
          ))}
        </Box>
      )}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}
