import { Delete } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getResourceTypes } from "api/resources";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IResource } from "types";

type ResourceAdminFormProps = {
  onSubmit: (data: any) => Promise<string | number>;
  defaultValues?: IResource;
};

const ResourceAdminForm = ({
  onSubmit,
  defaultValues,
}: ResourceAdminFormProps) => {
  const [options, setOptions] = useState([]);

  const { control, handleSubmit, setValue, reset } = useForm<IResource>({
    defaultValues: defaultValues || {
      name: "",
      description: "",
      type: {
        value: "",
        label: "",
      },
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

  const handleFileChange = (e: any) => {
    if (!e.target.files[0]) return;

    setValue("file", e.target.files[0]);
  };

  const submitWithReset = async (data: any) =>
    onSubmit(data).finally(() => reset());

  return (
    <form onSubmit={handleSubmit(submitWithReset)}>
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
              {...field}
              size="small"
              options={options}
              onChange={(_, data) =>
                setValue("type", data || { value: "", label: "" })
              }
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
                <Typography pl={2}>{(value as File).name}</Typography>
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
  );
};

export default ResourceAdminForm;
