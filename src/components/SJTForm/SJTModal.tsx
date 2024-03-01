"use client";

import { useState } from "react";

import { useAlert } from "@/context/alert";

import FormModalWrapper from "../Global/FormModalWrapper";
import SJTForm from "./SJTForm";
import { SJTQuestion } from "./types";

const SJTModal = ({
  open,
  setOpen,
  fetchSJT,
  ...question
}: {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
  fetchSJT: () => void;
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=sjt-consulting&document=${form.id}`,
      {
        method: "DELETE",
      }
    );

    if (response.status !== 200) {
      showAlert("Uh oh! Error occurred :(", "error");
    } else {
      showAlert("SJT question deleted", "success");
      fetchSJT();
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
      showAlert("Uh oh! Error occurred :(", "error");
    } else {
      showAlert("SJT question updated", "success");
      setOpen(false);
    }
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
