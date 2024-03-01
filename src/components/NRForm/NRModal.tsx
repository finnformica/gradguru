import React, { useState } from "react";
import FormModalWrapper from "../global/FormModalWrapper";
import NRForm from "./NRForm";
import { useAlert } from "@/context/alert";
import { NRQuestion } from "./types";
import { deleteNRTest, postNRTest } from "@/api/tests";

const NRModal = ({
  open,
  setOpen,
  refresh,
  ...question
}: {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
  refresh: () => void;
} & NRQuestion) => {
  const { showAlert } = useAlert();
  const [form, setForm] = useState<NRQuestion>(question);
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
    deleteNRTest(form.id)
      .then(() => showAlert("NR question deleted", "success"))
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

    postNRTest(form.id, form)
      .then(() => showAlert("NR question updated", "success"))
      .catch(() => showAlert("Uh oh! Error occurred :(", "error"))
      .finally(() => {
        refresh();
        handleClose();
      });
  };

  return (
    <FormModalWrapper
      title="Edit NR question"
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      handleDelete={handleDelete}
      handleClick={handleClick}
      handleClose={handleClose}
    >
      <NRForm form={form} setForm={setForm} handleSubmit={handleSubmit} />
    </FormModalWrapper>
  );
};

export default NRModal;
