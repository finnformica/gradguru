"use client";

import { useState } from "react";

import { useSnackbar } from "notistack";

import { deleteSJTTest, postSJTTest } from "@/api/tests";
import FormModalWrapper from "@/components/global-components/FormModalWrapper";
import SJTForm from "./SJTForm";
import { SJTQuestion } from "./types";

const SJTModal = ({
  open,
  setOpen,
  refresh,
  ...question
}: {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
  refresh: () => void;
} & SJTQuestion) => {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState<SJTQuestion>(question);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleDelete = async () => {
    if (!form.id) {
      enqueueSnackbar("Something went wrong - form not found", {
        variant: "error",
      });
      return;
    }

    deleteSJTTest(form.id)
      .then(() => enqueueSnackbar("SJT question updated"))
      .catch((err) =>
        enqueueSnackbar(`Something went wrong - ${err.statusText}`, {
          variant: "error",
        })
      )
      .finally(() => {
        refresh();
        handleClose();
      });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.id) {
      enqueueSnackbar("Something went wrong - form not found", {
        variant: "error",
      });
      return;
    }

    postSJTTest(form.id, form)
      .then(() => enqueueSnackbar("SJT question updated"))
      .catch((err) =>
        enqueueSnackbar(`Something went wrong - ${err.statusText}`, {
          variant: "error",
        })
      )
      .finally(() => {
        refresh();
        setOpen(false);
      });
  };

  return (
    <FormModalWrapper
      title="Edit SJT question"
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      handleDelete={handleDelete}
      handleClick={handleClick}
      handleClose={handleClose}
    >
      <SJTForm form={form} setForm={setForm} handleSubmit={handleSubmit} />
    </FormModalWrapper>
  );
};

export default SJTModal;
