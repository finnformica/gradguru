"use client";

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

import { createBlogTag, getBlogTags } from "api/blog";

const AddBlogTagModal = ({
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

  const { fields, remove, append } = useFieldArray({ control, name: "tags" });

  useEffect(() => {
    const fetchTypes = async () => {
      const res = await getBlogTags();
      setValue("tags", res?.tags || [""]);

      if (res?.tags && res.tags.length > 0) {
        const { tags } = res;
        setValue("tags", tags);
      } else {
        setValue("tags", [""]);
        setOpen(true);
      }
    };

    fetchTypes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: any) => {
    const { tags } = data;

    createBlogTag(tags.map((tag: string) => tag.trim()))
      .then(() => enqueueSnackbar("Blog tags saved"))
      .catch(() =>
        enqueueSnackbar("Failed to save blog tags", { variant: "error" })
      )
      .finally(() => handleClose());
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <DialogTitle>Add Blog Tag</DialogTitle>
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
                name={`tags.${index}`}
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
                      label="Blog tag"
                      error={!!error}
                      helperText={!!error && "Tag is required."}
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

export default AddBlogTagModal;
