import { useSnackbar } from "notistack";

import { patchQuestion } from "api/tests";

import FormModalWrapper from "../../global-components/FormModalWrapper";
import LRQuestionForm from "./lr-admin-form";
import { useForm } from "react-hook-form";
import { mapNestedArrayToObject } from "./utils";
import { ILRQuestion } from "types";

const LRModal = ({
  setQuestion,
  question,
}: {
  setQuestion: (question: ILRQuestion | null) => void;
  question: ILRQuestion;
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: question,
  });

  const onSubmit = async (data: ILRQuestion) => {
    if (!data.id) return;

    data.grid.data = mapNestedArrayToObject(data.grid.data);
    data.grid.options = mapNestedArrayToObject(data.grid.options);

    const { id, ...payload } = data;

    patchQuestion("logical-reasoning", id, payload)
      .then(() => enqueueSnackbar("LR question updated"))
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
      <LRQuestionForm
        onSubmit={onSubmit}
        control={control}
        watch={watch}
        handleSubmit={handleSubmit}
        setValue={setValue}
      />
    </FormModalWrapper>
  );
};

export default LRModal;
