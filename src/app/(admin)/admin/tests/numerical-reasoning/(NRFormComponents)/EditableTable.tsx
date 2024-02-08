import React, { useState } from "react";
import { Box, Button, Typography, Stack, TextField } from "@mui/material";

import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import { ITableForm, IGraphForm, INRForm } from "./types";

const camelise = (str: string) => {
  // removes special characters and spaces, returns a camel case string
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
    .replace(/[^a-zA-Z ]/g, "");
};

const sanitiseRows = (rows: GridRowsProp) => {
  return rows.map((row) => {
    const newRow = { ...row };
    delete newRow.id;
    delete newRow.isNew;
    return newRow;
  });
};

const sanitiseColumns = (columns: any) => {
  return columns.splice(0, columns.length - 1).map((column: any) => {
    const newColumn = { ...column };
    delete newColumn.width;
    delete newColumn.editable;
    delete newColumn.cellClassName;
    delete newColumn.getActions;
    return newColumn;
  });
};

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add row
      </Button>
    </GridToolbarContainer>
  );
}

const FullFeaturedCRUDTable = ({
  columnNames,
  form,
  setForm,
}: {
  columnNames: string[];
  form: ITableForm;
  setForm: (newForm: ITableForm) => void;
}) => {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    // update the row
    const updatedRow = { ...newRow, isNew: false };

    const updatedRows = rows.map((row) =>
      row.id === newRow.id ? updatedRow : row
    );

    setForm({
      ...form,
      data: {
        ...form.data,
        rows: sanitiseRows(updatedRows),
        columns: sanitiseColumns(columns),
      },
    });
    setRows(updatedRows);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    ...columnNames.map((name) => {
      return {
        field: camelise(name),
        headerName: name,
        width: 180,
        editable: true,
      };
    }),
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }: { id: string }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key="save"
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key="cancel"
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            key="edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            key="delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
        py: 2,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        hideFooterPagination
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: {
            setRows,
            setRowModesModel,
          },
        }}
      />
    </Box>
  );
};

const EditableTable = ({
  form,
  setForm,
}: {
  form: ITableForm;
  setForm: (newForm: ITableForm) => void;
}) => {
  const [columnNames, setColumnNames] = useState<string[]>([""]);

  return (
    <>
      <Typography variant="h5" pt={3}>
        Column names
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          py: 2,
        }}
      >
        {columnNames.map((name, index) => (
          <TextField
            size="small"
            label={`Column ${index + 1}`}
            required
            key={index}
            value={name}
            onChange={(e) => {
              const newColumnNames = [...columnNames];
              newColumnNames[index] = e.target.value;
              setColumnNames(newColumnNames);
            }}
          />
        ))}
      </Box>
      <Stack spacing={2} direction={"row"}>
        <Button
          variant="outlined"
          onClick={() => {
            setColumnNames([...columnNames, ""]);
          }}
        >
          Add
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() =>
            setColumnNames(columnNames.splice(0, columnNames.length - 1))
          }
        >
          Delete
        </Button>
      </Stack>
      <Typography variant="h5" pt={3}>
        Data input
      </Typography>
      <FullFeaturedCRUDTable
        columnNames={columnNames}
        form={form}
        setForm={setForm}
      />
    </>
  );
};

export { FullFeaturedCRUDTable, EditableTable };
