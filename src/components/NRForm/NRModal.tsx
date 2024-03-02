import { deleteNRTest, postNRTest } from "@/api/tests";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import FormModalWrapper from "../global-components/FormModalWrapper";
import NRForm from "./NRForm";
import { NRQuestion } from "./types";

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
  const { enqueueSnackbar } = useSnackbar();
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
      enqueueSnackbar("Error - no form found", { variant: "error" });
      return;
    }
    deleteNRTest(form.id)
      .then(() => enqueueSnackbar("NR question deleted"))
      .catch((err) =>
        enqueueSnackbar(`Something went wrong - ${err}`, { variant: "error" })
      )
      .finally(() => {
        refresh();
        handleClose();
      });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.id) {
      enqueueSnackbar("Something went wrong - no form found", {
        variant: "error",
      });
      return;
    }

    postNRTest(form.id, form)
      .then(() => enqueueSnackbar("NR question updated"))
      .catch((err) =>
        enqueueSnackbar(`Something went wrong - ${err}`, { variant: "error" })
      )
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
