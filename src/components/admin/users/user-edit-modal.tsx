import { SyntheticEvent } from "react";

import {
  Autocomplete,
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { useCourseIds } from "api/courses";
import { IUserFormInput } from "types";
import { indexToRoleMapping } from "utils/permissions";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

type UserEditModalProps = {
  defaultValues: IUserFormInput;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: IUserFormInput) => void;
};

const UserEditModal = ({
  defaultValues,
  open,
  onClose,
  onSubmit,
}: UserEditModalProps) => {
  const { control, handleSubmit, setValue } = useForm({ defaultValues });
  const { courseIds, loading } = useCourseIds();

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h4">Edit user</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={2} py={2}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }: any) => (
                <TextField
                  label="Name"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={!!error && "Name is required"}
                  size="small"
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }: any) => (
                <TextField
                  label="Email"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={!!error && "Email is required"}
                  size="small"
                />
              )}
            />
            <Controller
              name="role"
              control={control}
              render={({ field: { value } }: any) => {
                const onValueChange = (
                  event: SyntheticEvent<Element, Event>,
                  data: any
                ) => {
                  // normal OnValue only works for string field
                  setValue("role", data, { shouldTouch: true });
                };
                return (
                  <Autocomplete
                    value={value}
                    onChange={onValueChange}
                    options={Object.keys(indexToRoleMapping).map((index) => ({
                      label: indexToRoleMapping[parseInt(index)],
                      value: parseInt(index),
                    }))}
                    renderInput={(params) => (
                      <TextField {...params} label="Role" />
                    )}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    size="small"
                  />
                );
              }}
            />
            <Controller
              name="courses"
              control={control}
              render={({ field: { value } }: any) => {
                const onValueChange = (
                  event: SyntheticEvent<Element, Event>,
                  data: any
                ) => {
                  // normal OnValue only works for string field
                  setValue("courses", data, { shouldTouch: true });
                };
                return (
                  <Autocomplete
                    value={value}
                    onChange={onValueChange}
                    options={courseIds || []}
                    loading={loading}
                    loadingText="Loading courses..."
                    renderInput={(params) => (
                      <TextField {...params} label="Courses" />
                    )}
                    isOptionEqualToValue={(option, value) => option === value}
                    multiple
                    size="small"
                  />
                );
              }}
            />
          </Stack>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default UserEditModal;
