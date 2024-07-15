"use client";

import { PlayArrow } from "@mui/icons-material";
import {
  Card,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { sortAlphaNumeric } from "utils/user-tests";

interface IQuestionList {
  [test: string]: { name: string; attempted: string; id: number }[];
}

const questionsList: IQuestionList = {
  strengths: [
    { name: "Happy", attempted: "No", id: 1 },
    { name: "Sad", attempted: "Yes", id: 2 },
    { name: "Angry", attempted: "No", id: 3 },
  ],
  weaknesses: [
    { name: "Long", attempted: "No", id: 4 },
    { name: "Good", attempted: "Yes", id: 5 },
    { name: "Mad", attempted: "No", id: 6 },
  ],
  leadership: [
    { name: "Leader", attempted: "No", id: 7 },
    { name: "Power", attempted: "Yes", id: 8 },
    { name: "Smart", attempted: "No", id: 9 },
  ],
};

const QuestionSelection = ({ params }: { params: { test: string } }) => {
  const router = useRouter();
  const testQuestions = questionsList[params.test] || [];

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
      flex: 1,
      sortComparator: sortAlphaNumeric,
    },
    {
      field: "attempted",
      headerName: "Attempted",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Start Test">
            <IconButton
              size="small"
              onClick={() =>
                router.push(
                  `/dashboard/tests/logical-reasoning/${params.row.id}`
                )
              }
            >
              <PlayArrow sx={{ color: "grey.400" }} />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Stack direction={"column"} gap={4}>
        <Typography variant="h3">{`Test: ${params.test}`}</Typography>
        <Card elevation={0} sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
          <DataGrid
            rows={testQuestions}
            columns={columns}
            autoHeight
            hideFooter
            hideFooterPagination
            initialState={{
              sorting: { sortModel: [{ field: "name", sort: "asc" }] },
            }}
          />
        </Card>
      </Stack>
    </Container>
  );
};

export default QuestionSelection;
