import { DragIndicator } from "@mui/icons-material";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { Reorder } from "framer-motion";

const ReorderItemElement = ({ item }: { item: string }) => (
  <Box
    sx={{
      my: 1,
      p: 2,
      borderRadius: 6,
      cursor: "pointer",
      maxWidth: "max(50%, 700px)",
    }}
  >
    <Stack direction="row" alignItems="center" spacing={2}>
      <Tooltip title="Drag to reorder">
        <DragIndicator sx={{ color: "grey.400" }} />
      </Tooltip>
      <Typography>{item}</Typography>
    </Stack>
  </Box>
);

type RankOrderProps = {
  setOptions: (newOptions: string[]) => void;
  options: string[];
};

const RankOrder = ({ options, setOptions }: RankOrderProps) => {
  return (
    <Reorder.Group values={options} onReorder={setOptions} as="div">
      <Typography variant="subtitle2" color="grey.400" fontWeight={400}>
        Most likely
      </Typography>
      {options.map((item, index) => (
        <Stack key={item} spacing={2} direction="row" alignItems="center">
          <Typography variant="body1">{index + 1}.</Typography>
          <Reorder.Item key={item} value={item} as="div">
            <ReorderItemElement item={item} />
          </Reorder.Item>
        </Stack>
      ))}
      <Typography variant="subtitle2" color="grey.400" fontWeight={400}>
        Least likely
      </Typography>
    </Reorder.Group>
  );
};

export default RankOrder;
