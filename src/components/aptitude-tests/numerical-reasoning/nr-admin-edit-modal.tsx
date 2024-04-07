import { useSnackbar } from "notistack";
import React, { useState } from "react";

import { patchQuestion } from "api/tests";

import { INRQuestion } from "types";
import FormModalWrapper from "../../global-components/FormModalWrapper";
import NRForm from "./nr-admin-form";

const NRModal = ({
  setQuestion,
  question,
}: {
  setQuestion: (question: INRQuestion | null) => void;
  question: INRQuestion;
  handleDelete: () => void;
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState<INRQuestion>(question);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.id) {
      enqueueSnackbar("Something went wrong - no form found", {
        variant: "error",
      });
      return;
    }

    const { id, ...payload } = form;

    patchQuestion("numerical-reasoning", id, payload)
      .then(() => enqueueSnackbar("NR question updated"))
      .catch((err) =>
        enqueueSnackbar(`Something went wrong - ${err.statusText}`, {
          variant: "error",
        })
      )
      .finally(() => setQuestion(null));
  };

  return (
    <FormModalWrapper
      title="Edit NR question"
      open={!!question}
      handleClose={() => setQuestion(null)}
    >
      <NRForm form={form} setForm={setForm} handleSubmit={handleSubmit} />
    </FormModalWrapper>
  );
};

export default NRModal;
