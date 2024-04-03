"use client";

import _ from "lodash";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";

import {
  Button,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";

import { Grid } from "types";

import { Clear, Delete } from "@mui/icons-material";
import SquareGrid from "./square-grid";
import TriangleGrid from "./triangle-grid";
import { initialiseSquareGrid, initialiseTriangleGrid } from "./utils";

type LRQuestionFormProps = {
  onSubmit: (data: any) => void;
  defaultValues?: any;
};

const INIT_NUM_ROWS = 4;

const LRQuestionForm = ({ onSubmit, defaultValues }: LRQuestionFormProps) => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: defaultValues || {
      type: "complete-the-sequence",
      grid: {
        template: "linear",
        type: "square",
        rows: INIT_NUM_ROWS,
        data: _.range(4).map(() => initialiseSquareGrid(INIT_NUM_ROWS)),
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "grid.data",
  });

  const numRows = useWatch({
    control,
    name: "grid.rows",
    defaultValue: INIT_NUM_ROWS,
  });

  const gridType = useWatch({
    control,
    name: "grid.type",
  });

  const templateType = useWatch({
    control,
    name: "grid.template",
  });

  const updateFormGrid = (type: string, numRows: number, numGrids?: number) => {
    if (!numRows) return;

    const length = numGrids || fields.length;
    const initialiseGrid =
      type === "triangle" ? initialiseTriangleGrid : initialiseSquareGrid;

    setValue(
      "grid.data",
      _.range(length).map(() => initialiseGrid(numRows))
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={1} pb={1}>
        <Controller
          name="type"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              select
              {...field}
              sx={{ width: 200 }}
              label="Question type"
              size="small"
              error={!!error}
              helperText={!!error && "Question type is required"}
            >
              <MenuItem value="odd-one-out">Odd one out</MenuItem>
              <MenuItem value="complete-the-sequence">
                Complete the sequence
              </MenuItem>
            </TextField>
          )}
        />

        <Controller
          name="grid.template"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              select
              {...field}
              sx={{ width: 150 }}
              label="Template"
              size="small"
              error={!!error}
              helperText={!!error && "Template is required"}
            >
              <MenuItem
                value="grid"
                onClick={() => updateFormGrid(gridType, numRows, 9)}
              >
                Grid
              </MenuItem>
              <MenuItem
                value="linear"
                onClick={() => updateFormGrid(gridType, numRows, 4)}
              >
                Linear
              </MenuItem>
            </TextField>
          )}
        />

        <Controller
          name="grid.type"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              select
              {...field}
              sx={{ width: 150 }}
              label="Grid type"
              size="small"
              error={!!error}
              helperText={!!error && "Grid type is required"}
            >
              <MenuItem
                value="triangle"
                onClick={() => updateFormGrid("triangle", numRows)}
              >
                Triangle
              </MenuItem>
              <MenuItem
                value="square"
                onClick={() => updateFormGrid("square", numRows)}
              >
                Square
              </MenuItem>
            </TextField>
          )}
        />

        <Controller
          name="grid.rows"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              select
              {...field}
              sx={{ width: 80 }}
              label="Grid rows"
              size="small"
              error={!!error}
              helperText={!!error && "Number of rows is required"}
            >
              {_.range(1, 5).map((row) => (
                <MenuItem
                  key={row}
                  value={row}
                  onClick={() => updateFormGrid(gridType, row)}
                >
                  {row}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Stack>

      <Stack
        display={templateType === "grid" ? "grid" : "flex"}
        gridTemplateColumns="repeat(3, 350px)"
        direction="row"
        gap={3}
        my={2}
      >
        {fields.map((item, index) => (
          <Controller
            key={item.id}
            name={`grid.data.${index}`}
            control={control}
            rules={{ required: true }}
            render={({ field: { value }, fieldState: { error } }) => (
              <Stack
                direction={templateType === "grid" ? "row" : "column"}
                spacing={0.5}
              >
                {gridType === "triangle" ? (
                  <TriangleGrid numRows={numRows} />
                ) : (
                  <SquareGrid
                    numRows={numRows}
                    grid={value}
                    setGrid={(grid: Grid) =>
                      setValue(`grid.data.${index}`, grid)
                    }
                  />
                )}
                <Stack
                  direction={templateType !== "grid" ? "row" : "column"}
                  spacing={0.5}
                  justifyContent="center"
                >
                  <Tooltip title="Clear grid">
                    <IconButton
                      onClick={() =>
                        setValue(
                          `grid.data.${index}`,
                          initialiseSquareGrid(numRows)
                        )
                      }
                    >
                      <Clear />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete grid">
                    <IconButton onClick={() => remove(index)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            )}
          />
        ))}
      </Stack>

      <Stack direction="row" spacing={1} pb={1}>
        <Button onClick={() => append([initialiseSquareGrid(numRows)])}>
          Add value
        </Button>

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default LRQuestionForm;
