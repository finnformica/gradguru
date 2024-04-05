"use client";

import _ from "lodash";
import { Controller, useFieldArray, useWatch } from "react-hook-form";

import { AddCircleOutline, Clear, Delete } from "@mui/icons-material";
import {
  Button,
  FormControlLabel,
  IconButton,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import { Grid } from "types";

import { alphaToNumericMapping, numericToAlphaMapping } from "./constants";
import SquareGrid from "./square-grid";
import TriangleGrid from "./triangle-grid";
import { initialiseSquareGrid, initialiseTriangleGrid } from "./utils";

type LRQuestionFormProps = {
  onSubmit: (data: any) => void;
  defaultValues?: any;
  control: any;
  watch: any;
  setValue: any;
  handleSubmit: any;
};

const returnDefaultCell = (type: string, numRows: number) => {
  const initialiseGrid =
    type === "triangle" ? initialiseTriangleGrid : initialiseSquareGrid;

  return initialiseGrid(numRows);
};

const LRQuestionForm = ({
  onSubmit,
  control,
  watch,
  setValue,
  handleSubmit,
}: LRQuestionFormProps) => {
  // question data
  const { fields, append, remove } = useFieldArray({
    control,
    name: "grid.data",
  });

  // answer options
  const {
    fields: answerFields,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control,
    name: "grid.options",
  });

  const [gridType, numRows, questionType, innerGrid, outerGrid] = watch([
    "grid.type",
    "grid.rows",
    "type",
    "grid.border.inner",
    "grid.border.outer",
  ]);

  const templateType = useWatch({ control, name: "grid.template" });

  const updateFormGrid = (
    type: string,
    numRows: number,
    numGrids?: number,
    override?: number
  ) => {
    if (!numRows) return;

    const length = numGrids || fields.length;
    const initialiseGrid =
      type === "triangle" ? initialiseTriangleGrid : initialiseSquareGrid;

    setValue(
      "grid.data",
      _.range(length).map(() => initialiseGrid(numRows))
    );

    const optionsLength = templateType === "grid" ? 4 : length;
    setValue(
      "grid.options",
      _.range(override || optionsLength).map(() => initialiseGrid(numRows))
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={2} pb={4}>
        <Controller
          name="question"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              label="Question"
              size="small"
              error={!!error}
              helperText={!!error && "Question is required"}
            />
          )}
        />

        <Controller
          name="explanation"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              label="Explanation"
              size="small"
              error={!!error}
              helperText={!!error && "Explanation is required"}
            />
          )}
        />

        <Controller
          name="answer"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              select
              {...field}
              sx={{ width: 100 }}
              label="Answer"
              size="small"
            >
              {Object.keys(alphaToNumericMapping).map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Stack>

      <Typography variant="h5" pb={2}>
        Question configuration
      </Typography>

      <Stack direction="row" spacing={1} pb={1}>
        <Controller
          name="type"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              select
              {...field}
              sx={{ width: 250 }}
              label="Question type"
              size="small"
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
          render={({ field }) => (
            <TextField
              select
              {...field}
              sx={{ width: 150 }}
              label="Template"
              size="small"
            >
              <MenuItem
                value="grid"
                onClick={() => updateFormGrid(gridType, numRows, 9, 4)}
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
          render={({ field }) => (
            <TextField
              select
              {...field}
              sx={{ width: 150 }}
              label="Grid type"
              size="small"
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
          render={({ field }) => (
            <TextField
              select
              {...field}
              sx={{ width: 80 }}
              label="Grid rows"
              size="small"
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

        {gridType === "square" && (
          <>
            <Controller
              name="grid.border.inner"
              control={control}
              render={({ field: { value } }) => (
                <FormControlLabel
                  slotProps={{ typography: { fontSize: 14 } }}
                  label="Inner grid"
                  control={
                    <Switch
                      value={value}
                      defaultChecked
                      onChange={(e, checked: boolean) =>
                        setValue("grid.border.inner", checked)
                      }
                    />
                  }
                />
              )}
            />

            <Controller
              name="grid.border.outer"
              control={control}
              render={({ field: { value } }) => (
                <FormControlLabel
                  slotProps={{ typography: { fontSize: 14 } }}
                  label="Outer border"
                  control={
                    <Switch
                      value={value}
                      defaultChecked
                      onChange={(e, checked: boolean) =>
                        setValue("grid.border.outer", checked)
                      }
                    />
                  }
                />
              )}
            />
          </>
        )}
      </Stack>

      <Stack direction="row" spacing={1} pt={2} alignItems="center">
        <Typography variant="h5">Question data</Typography>
        <Tooltip title="Add element">
          <IconButton
            onClick={() => append([returnDefaultCell(gridType, numRows)])}
          >
            <AddCircleOutline />
          </IconButton>
        </Tooltip>
      </Stack>

      <Stack
        display={templateType === "grid" ? "grid" : "flex"}
        gridTemplateColumns="repeat(3, 250px)"
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
            render={({ field: { value } }) => (
              <Stack
                direction={templateType === "grid" ? "row" : "column"}
                spacing={0.5}
              >
                {gridType === "triangle" ? (
                  <TriangleGrid
                    numRows={numRows}
                    grid={value}
                    setGrid={(grid: Grid) =>
                      setValue(`grid.data.${index}`, grid)
                    }
                  />
                ) : (
                  <SquareGrid
                    innerGrid={innerGrid}
                    showBorders={outerGrid}
                    numRows={numRows}
                    grid={value}
                    setGrid={(grid: Grid) =>
                      setValue(`grid.data.${index}`, grid)
                    }
                  />
                )}
                <Stack
                  direction={templateType !== "grid" ? "row" : "column"}
                  spacing={2}
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Tooltip title="Clear grid">
                    <IconButton
                      onClick={() =>
                        setValue(
                          `grid.options.${index}`,
                          returnDefaultCell(gridType, numRows)
                        )
                      }
                    >
                      <Clear fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Typography variant="h5">
                    {numericToAlphaMapping[index]}
                  </Typography>
                  <Tooltip title="Delete grid">
                    <IconButton onClick={() => remove(index)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            )}
          />
        ))}
      </Stack>

      {questionType === "complete-the-sequence" && (
        <>
          <Stack direction="row" spacing={1} pt={1} alignItems="center">
            <Typography variant="h5">Answer options</Typography>

            {questionType === "complete-the-sequence" && (
              <Tooltip title="Add element">
                <IconButton
                  onClick={() =>
                    appendAnswer([returnDefaultCell(gridType, numRows)])
                  }
                >
                  <AddCircleOutline />
                </IconButton>
              </Tooltip>
            )}
          </Stack>

          <Stack
            display={templateType === "grid" ? "grid" : "flex"}
            gridTemplateColumns="repeat(2, 250px)"
            direction="row"
            gap={3}
            my={2}
          >
            {answerFields.map((item, index) => (
              <Controller
                key={item.id}
                name={`grid.options.${index}`}
                control={control}
                rules={{ required: true }}
                render={({ field: { value } }) => (
                  <Stack
                    direction={templateType === "grid" ? "row" : "column"}
                    spacing={0.5}
                  >
                    {gridType === "triangle" ? (
                      <TriangleGrid
                        numRows={numRows}
                        grid={value}
                        setGrid={(grid: Grid) =>
                          setValue(`grid.options.${index}`, grid)
                        }
                      />
                    ) : (
                      <SquareGrid
                        innerGrid={innerGrid}
                        showBorders={outerGrid}
                        numRows={numRows}
                        grid={value}
                        setGrid={(grid: Grid) =>
                          setValue(`grid.options.${index}`, grid)
                        }
                      />
                    )}
                    <Stack
                      direction={templateType !== "grid" ? "row" : "column"}
                      spacing={2}
                      justifyContent="space-evenly"
                      alignItems="center"
                    >
                      <Tooltip title="Clear grid">
                        <IconButton
                          onClick={() =>
                            setValue(
                              `grid.options.${index}`,
                              returnDefaultCell(gridType, numRows)
                            )
                          }
                        >
                          <Clear fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Typography variant="h5">
                        {numericToAlphaMapping[index]}
                      </Typography>
                      <Tooltip title="Delete grid">
                        <IconButton onClick={() => removeAnswer(index)}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Stack>
                )}
              />
            ))}
          </Stack>
        </>
      )}

      <Stack direction="row" spacing={1} pb={4}>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default LRQuestionForm;
