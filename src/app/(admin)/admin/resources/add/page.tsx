"use client";

import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Add, Delete } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { getResourceTypes, createResource } from "api/resources";
import { AddResourceTypeModal } from "components/resources";
import { uploadToStorage } from "lib/firebase/utils";
import { IResource } from "types";
import { generateRandomString, getFileExtension } from "utils/format-string";

const AddResource = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [options, setOptions] = useState([]);
  const [typeModalOpen, setTypeModalOpen] = useState(false);
  const { control, handleSubmit, setValue, reset } = useForm<IResource>({
    defaultValues: {
      name: "",
      description: "",
      type: "",
      file: null,
    },
  });

  useEffect(() => {
    const fetchTypes = async () => {
      const res = await getResourceTypes("consulting");
      setOptions(res?.types || []);
    };

    fetchTypes();
  });

  const onSubmit = (data: any) => {
    const filename = generateRandomString();
    const ext = getFileExtension(data.file.name);

    const path = `courses/consulting/resources/${data.type.value}/${filename + ext}`;
    uploadToStorage(data.file, path);

    const payload = { ...data, file: path };

    createResource("consulting", payload)
      .then(() => enqueueSnackbar("Resource added"))
      .catch(() =>
        enqueueSnackbar("Failed to add resource", { variant: "error" })
      )
      .finally(() => reset());
  };

  const handleFileChange = (e: any) => {
    if (!e.target.files[0]) return;

    setValue("file", e.target.files[0]);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} py={2}>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextField
                value={value}
                onChange={onChange}
                size="small"
                label="Name"
                error={!!error}
                helperText={!!error && "Name is required."}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextField
                value={value}
                onChange={onChange}
                multiline
                size="small"
                label="Description"
                error={!!error}
                helperText={!!error && "Description is required."}
              />
            )}
          />
          <Controller
            name="type"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                size="small"
                options={options}
                onChange={(_, data) => setValue("type", data.value)}
                isOptionEqualToValue={(option: any, value: any) =>
                  option.value === value.value
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Type"
                    error={!!error}
                    helperText={!!error && "Type is required."}
                  />
                )}
              />
            )}
          />
          <Controller
            name="file"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange }, fieldState: { error } }) =>
              value ? (
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography pl={2}>{value.name}</Typography>
                  <IconButton onClick={() => setValue("file", null)}>
                    <Delete />
                  </IconButton>
                </Stack>
              ) : (
                <TextField
                  type="file"
                  size="small"
                  onChange={handleFileChange}
                  error={!!error}
                  helperText={!!error && "File is required."}
                />
              )
            }
          />
        </Stack>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
      <AddResourceTypeModal
        open={typeModalOpen}
        handleClose={() => setTypeModalOpen(false)}
        setOpen={setTypeModalOpen}
      />
    </>
  );
};

export default AddResource;
