"use client";

import { useState } from "react";

import { useAlert } from "@/context/adminAlert";

import FormModalWrapper from "../Global/FormModalWrapper";
import SJTForm from "./SJTForm";
import { SJTQuestion } from "./types";

const SJTModal = ({
  open,
  setOpen,
  ...question
}: {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
} & SJTQuestion) => {
  const { setAlertState } = useAlert();
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=sjt-consulting&document=${form.id}`,
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
        message: "SJT question deleted",
        open: true,
        severity: "success",
      });
      handleClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=sjt-consulting&document=${form.id}`,
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
        message: "SJT question updated",
        open: true,
        severity: "success",
      });
      setOpen(false);
    }
  };

  return (
    <FormModalWrapper
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
