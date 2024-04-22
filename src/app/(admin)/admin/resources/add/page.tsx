"use client";

import { useSnackbar } from "notistack";
import { useState } from "react";

import { Add } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

import { createResource } from "api/resources";
import { AddResourceTypeModal } from "components/resources";
import ResourceAdminForm from "components/resources/resource-admin-form";
import { uploadToStorage } from "lib/firebase/utils";
import { generateRandomString, getFileExtension } from "utils/format-string";

const AddResource = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [typeModalOpen, setTypeModalOpen] = useState(false);

  const onSubmit = async (data: any) => {
    const filename = generateRandomString();
    const ext = getFileExtension(data.file.name);

    const path = `courses/consulting/resources/${data.type.value}/${filename + ext}`;
    uploadToStorage(data.file, path);

    const payload = { ...data, file: path };

    return createResource("consulting", payload)
      .then(() => enqueueSnackbar("Resource added"))
      .catch(() =>
        enqueueSnackbar("Failed to add resource", { variant: "error" })
      );
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Add Resource</Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => setTypeModalOpen(true)}
        >
          Add Type
        </Button>
      </Stack>

      <ResourceAdminForm onSubmit={onSubmit} />

      <AddResourceTypeModal
        open={typeModalOpen}
        handleClose={() => setTypeModalOpen(false)}
        setOpen={setTypeModalOpen}
      />
    </>
  );
};

export default AddResource;
