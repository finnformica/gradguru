import { Card, Stack, Typography } from "@mui/material";

import {
  SquareGrid,
  TriangleGrid,
} from "components/aptitude-tests/logical-reasoning";

const AddLRQuestion = () => {
  return (
    <>
      <Typography variant="h4" pb={2}>
        Add Logical Reasoning question
      </Typography>
      <Stack direction="column" spacing={2}>
        <Card sx={{ p: 2 }}>
          <TriangleGrid />
        </Card>
        <Card sx={{ p: 2 }}>
          <SquareGrid numRows={4} />
        </Card>
      </Stack>
    </>
  );
};

export default AddLRQuestion;
