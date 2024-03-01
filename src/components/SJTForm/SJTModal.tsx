"use client";

import { useState } from "react";

import { useAlert } from "@/context/alert";

import FormModalWrapper from "../Global/FormModalWrapper";
import SJTForm from "./SJTForm";
import { SJTQuestion } from "./types";
import { deleteSJTTest, postSJTTest } from "@/api/tests";

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
  const { showAlert } = useAlert();
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
      showAlert("Uh oh! Error occurred :(", "error");
      return;
    }

    deleteSJTTest(form.id)
      .then(() => showAlert("SJT question updated", "success"))
      .catch(() => showAlert("Uh oh! Error occurred :(", "error"))
      .finally(() => {
        refresh();
        handleClose();
      });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.id) {
      showAlert("Uh oh! Error occurred :(", "error");
      return;
    }

    postSJTTest(form.id, form)
      .then(() => showAlert("SJT question updated", "success"))
      .catch(() => showAlert("Uh oh! Error occurred :(", "error"))
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
