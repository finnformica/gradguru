"use client";

import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

const AdminDataGrid = ({
  rows,
  columns,
}: {
  rows: any[];
  columns: GridColDef[];
}) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      disableDensitySelector
      disableRowSelectionOnClick
      rowHeight={40}
      autoHeight
      pageSizeOptions={[15, 25, 50, 100]}
      initialState={{
        pagination: { paginationModel: { pageSize: 15 } },
        sorting: { sortModel: [{ field: "created", sort: "desc" }] },
      }}
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          printOptions: { disableToolbarButton: true },
          csvOptions: { disableToolbarButton: true },
        },
      }}
    />
  );
};

export default AdminDataGrid;
