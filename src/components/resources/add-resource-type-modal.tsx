"use client";

import _ from "lodash";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { Add, Clear, Delete, Save } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";

import { getResourceTypes, postResourceType } from "api/resources";

const AddResourceTypeModal = ({
  open,
  handleClose,
  setOpen,
}: {
  open: boolean;
  handleClose: () => void;
  setOpen: (open: boolean) => void;
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { handleSubmit, control, setValue } = useForm();

  const { fields, remove, append } = useFieldArray({ control, name: "types" });

  useEffect(() => {
    const fetchTypes = async () => {
      const res = await getResourceTypes("consulting");
      setValue("types", res?.types || [""]);

      if (res?.types && res.types.length > 0) {
        const types = res.types.map((type: any) => type.label);
        setValue("types", types);
      } else {
        setValue("types", [""]);
        setOpen(true);
      }
    };

    fetchTypes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: any) => {
    const { types } = data;

    postResourceType(
      "consulting",
      types.map((type: string) => ({
        label: type.trim(),
        value: _.kebabCase(type),
      }))
    )
      .then(() => enqueueSnackbar("Resource types saved"))
      .catch(() =>
        enqueueSnackbar("Failed to save resource types", { variant: "error" })
      )
      .finally(() => handleClose());
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <DialogTitle>Add Resource Type</DialogTitle>
        <IconButton onClick={handleClose} sx={{ mr: 2 }}>
          <Clear />
        </IconButton>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2}>
            {fields.map((field, index) => (
              <Controller
                key={field.id}
                name={`types.${index}`}
                control={control}
                rules={{ required: true }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <Stack spacing={2} direction="row">
                    <TextField
                      fullWidth
                      value={value}
                      onChange={onChange}
                      size="small"
                      label="Resource type"
                      error={!!error}
                      helperText={!!error && "Type is required."}
                    />
                    <IconButton onClick={() => remove(index)}>
                      <Delete />
                    </IconButton>
                  </Stack>
                )}
              />
            ))}
          </Stack>
          <Stack direction="row" justifyContent="space-between" pt={4}>
            <Button
              onClick={() => append("")}
              variant="outlined"
              startIcon={<Add />}
            >
              Add
            </Button>
            <Button type="submit" variant="contained" startIcon={<Save />}>
              Submit
            </Button>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddResourceTypeModal;
