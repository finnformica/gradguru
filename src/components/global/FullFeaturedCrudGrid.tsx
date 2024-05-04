"use client";

import { useState } from "react";

import { Delete, Edit } from "@mui/icons-material";
import { Box, LinearProgress } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
} from "@mui/x-data-grid";
import { useSession } from "next-auth/react";

type FullFeaturedCrudGridProps = {
  columns: GridColDef[];
  rows: GridRowsProp;
  loading: boolean;
  setIdToEdit?: (id: GridRowId) => void;
  setIdToDelete?: (id: GridRowId) => void;
};

export default function FullFeaturedCrudGrid({
  columns,
  rows: initialRows,
  loading,
  setIdToEdit,
  setIdToDelete,
}: FullFeaturedCrudGridProps) {
  const { data: session } = useSession();
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const actions: GridColDef = {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    cellClassName: "actions",
    getActions: ({ id }) => {
      return [
        <GridActionsCellItem
          key="edit"
          icon={<Edit />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
          disabled={(session?.user.role ?? 0) < 3}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<Delete />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
          disabled={(session?.user.role ?? 0) < 4}
        />,
      ];
    },
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    if (setIdToEdit) {
      setIdToEdit(id);
    }
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    if (setIdToDelete) {
      setIdToDelete(id);
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={[...columns, actions]}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        loading={loading}
        slots={{
          loadingOverlay: LinearProgress,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </Box>
  );
}
