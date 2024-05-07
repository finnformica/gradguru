import { QuestionMark } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { squareSizeMapping } from "./constants";

const QuestionGrid = ({ numRows }: { numRows: number }) => {
  const length =
    parseInt(squareSizeMapping[numRows].replace("px", "")) * numRows + 2;

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      width={length}
      height={length}
      border="2px solid black"
    >
      <QuestionMark sx={{ fontSize: 48 }} />
    </Stack>
  );
};

export default QuestionGrid;
