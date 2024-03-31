"use client";

import { useSnackbar } from "notistack";
import { useState } from "react";

import { patchQuestion } from "api/tests";
import FormModalWrapper from "components/global-components/FormModalWrapper";

import { ISJScenario } from "types";
import SJTForm from "./SJTForm";

const SJTModal = ({
  open,
  setQuestion,
  question,
}: {
  open: boolean;
  setQuestion: (question: ISJScenario | null) => void;
  question: ISJScenario;
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState<ISJScenario>(question);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.id) {
      enqueueSnackbar("Something went wrong - form not found", {
        variant: "error",
      });
      return;
    }

    patchQuestion(form.id, "situational-judgement", form)
      .then(() => enqueueSnackbar("SJT question updated"))
      .catch((err) =>
        enqueueSnackbar(`Something went wrong - ${err.statusText}`, {
          variant: "error",
        })
      )
      .finally(() => setQuestion(null));
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
