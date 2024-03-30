import { Delete, DriveFileRenameOutline } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";

type EditDeleteActionsProps = {
  session: any;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
};

const EditDeleteActions = ({
  session,
  onEditClick,
  onDeleteClick,
}: EditDeleteActionsProps) => {
  return (
    <Stack direction="row" justifyContent="center">
      {onEditClick && (
        <IconButton
          size="small"
          disabled={(session?.user?.role || 0) < 3}
          onClick={onEditClick}
        >
          <DriveFileRenameOutline fontSize="small" />
        </IconButton>
      )}
      {onDeleteClick && (
        <IconButton
          size="small"
          disabled={(session?.user?.role || 0) < 4}
          onClick={onDeleteClick}
        >
          <Delete fontSize="small" />
        </IconButton>
      )}
    </Stack>
  );
};

export default EditDeleteActions;
