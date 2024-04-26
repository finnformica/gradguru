"use client";

import { Delete, DriveFileRenameOutline } from "@mui/icons-material";
import { CircularProgress, IconButton, Stack } from "@mui/material";
import { useSession } from "next-auth/react";

type EditDeleteActionsProps = {
  onEditClick?: () => void;
  onDeleteClick?: () => void;
};

const EditDeleteActions = ({
  onEditClick,
  onDeleteClick,
}: EditDeleteActionsProps) => {
  const { data: session } = useSession();

  if (!session)
    return (
      <Stack direction="row" justifyContent="center">
        <CircularProgress size={25} />
      </Stack>
    );

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
