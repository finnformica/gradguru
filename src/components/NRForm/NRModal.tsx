import React, { useState } from "react";
import FormModalWrapper from "../Global/FormModalWrapper";
import NRForm from "./NRForm";
import { useAlert } from "@/context/adminAlert";
import { NRQuestion } from "./types";

const NRModal = ({
  open,
  setOpen,
  fetchNR,
  ...question
}: {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
  fetchNR: () => void;
} & NRQuestion) => {
  const { setAlertState } = useAlert();
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=nr-consulting&document=${form.id}`,
      {
        method: "DELETE",
      }
    );

    if (response.status !== 200) {
      setAlertState({
        message: "Uh oh! Error occurred :(",
        open: true,
        severity: "error",
      });
    } else {
      setAlertState({
        message: "NR question deleted",
        open: true,
        severity: "success",
      });
      fetchNR();
      handleClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=nr-consulting&document=${form.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    if (response.status !== 200) {
      setAlertState({
        message: "Uh oh! Error occurred :(",
        open: true,
        severity: "error",
      });
    } else {
      setAlertState({
        message: "NR question updated",
        open: true,
        severity: "success",
      });
      handleClose();
    }
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
