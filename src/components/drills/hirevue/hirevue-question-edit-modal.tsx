"use client";

import { useSnackbar } from "notistack";

import { FormModalWrapper } from "components/global";
import { IHirevueQuestion } from "types/hirevue";

import HirevueQuestionAdminForm from "./hirevue-question-admin-form";

const SJTModal = ({
  open,
  setQuestion,
  question,
}: {
  open: boolean;
  setQuestion: (question: IHirevueQuestion | null) => void;
  question: IHirevueQuestion;
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data: any) => {
    console.log(data);

    enqueueSnackbar("Hirevue question saved");

    setQuestion(null);
  };

  return (
    <FormModalWrapper
      title="Edit Hirevue Question"
      open={open}
      handleClose={() => setQuestion(null)}
    >
      <HirevueQuestionAdminForm onSubmit={onSubmit} defaultValues={question} />
    </FormModalWrapper>
  );
};

export default SJTModal;
