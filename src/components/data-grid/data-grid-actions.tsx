import { Delete, DriveFileRenameOutline } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";

type DataGridActionsProps = {
  session: any;
  onEditClick: () => void;
  onDeleteClick: () => void;
};

const DataGridActions = ({
  session,
  onEditClick,
  onDeleteClick,
}: DataGridActionsProps) => {
  return (
    <Stack direction="row" justifyContent="center">
      <IconButton
        size="small"
        disabled={(session?.user?.role || 0) < 3}
        onClick={onEditClick}
      >
        <DriveFileRenameOutline fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        disabled={(session?.user?.role || 0) < 4}
        onClick={onDeleteClick}
      >
        <Delete fontSize="small" />
      </IconButton>
    </Stack>
  );
};

export default DataGridActions;
