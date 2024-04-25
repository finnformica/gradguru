"use client";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import { patchQuestion } from "api/tests";
import { FormModalWrapper } from "components/global";
import { deleteStorageFolder } from "lib/firebase/utils";
import { ILRQuestion } from "types";
import { endpoints } from "utils/axios";

import LRQuestionForm from "./lr-admin-form";
import { mapNestedArrayToObject, uploadImagesToStorage } from "./utils";

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

    const { id, ...strippedId } = data;

    deleteStorageFolder(
      `${endpoints.storage.aptitudeTests("logical-reasoning")}/${id}`
    ).then(() => {
      const dataPromise = uploadImagesToStorage(data.grid.data, id);
      const optionsPromise = uploadImagesToStorage(data.grid.options, id);

      Promise.all([dataPromise, optionsPromise]).then(
        ([dataGrid, optionsGrid]) => {
          const payload = {
            ...strippedId,
            grid: {
              ...data.grid,
              data: mapNestedArrayToObject(dataGrid),
              options: mapNestedArrayToObject(optionsGrid),
            },
            created: Date.now(),
          };

          patchQuestion("logical-reasoning", id, payload)
            .then(() => enqueueSnackbar("LR question updated"))
            .catch((err) =>
              enqueueSnackbar(`Something went wrong - ${err}`, {
                variant: "error",
              })
            )
            .finally(() => setQuestion(null));
        }
      );
    });
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
