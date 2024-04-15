"use client";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";

import { db } from "lib/firebase/config";

import { ILRQuestion } from "types";
import FormModalWrapper from "components/global-components/FormModalWrapper";

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

    const ref = doc(
      db,
      "courses",
      "consulting",
      "tests",
      "questions",
      "logical-reasoning",
      id
    );

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

        setDoc(ref, payload, { merge: true })
          .then(() => enqueueSnackbar("LR question updated"))
          .catch((err) =>
            enqueueSnackbar(`Something went wrong - ${err}`, {
              variant: "error",
            })
          )
          .finally(() => setQuestion(null));
      }
    );
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
