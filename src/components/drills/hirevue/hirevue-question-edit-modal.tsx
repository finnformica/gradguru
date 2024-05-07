"use client";

import { useSnackbar } from "notistack";

import { FormModalWrapper } from "components/global";
import { IHirevueQuestion } from "types/hirevue";

import HirevueQuestionAdminForm from "./hirevue-question-admin-form";
import { patchHirevueQuestion } from "api/drills";

const HirevueQuestionEditModal = ({
  open,
  setQuestion,
  question,
}: {
  open: boolean;
  setQuestion: (question: IHirevueQuestion | null) => void;
  question: IHirevueQuestion;
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: any) => {
    return patchHirevueQuestion("consulting", data.id, data)
      .then(() => enqueueSnackbar("Question updated"))
      .catch(() =>
        enqueueSnackbar("Failed to update question", { variant: "error" })
      )
      .finally(() => setQuestion(null));
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

export default HirevueQuestionEditModal;
