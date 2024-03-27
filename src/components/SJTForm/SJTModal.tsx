"use client";

import { useSnackbar } from "notistack";
import { useState } from "react";

import { postSJTTest } from "api/tests";
import FormModalWrapper from "components/global-components/FormModalWrapper";
import SJTForm from "./SJTForm";
import { SJTQuestion } from "./types";

const SJTModal = ({
  open,
  setQuestion,
  refresh,
  question,
}: {
  open: boolean;
  setQuestion: (question: SJTQuestion | null) => void;
  refresh: () => void;
  question: SJTQuestion;
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState<SJTQuestion>(question);

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
        setQuestion(null);
      });
  };

  return (
    <FormModalWrapper
      title="Edit SJT question"
      open={open}
      handleClose={() => setQuestion(null)}
    >
      <SJTForm form={form} setForm={setForm} handleSubmit={handleSubmit} />
    </FormModalWrapper>
  );
};

export default SJTModal;
