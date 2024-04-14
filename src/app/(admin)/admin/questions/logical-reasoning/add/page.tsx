"use client";

import { Typography } from "@mui/material";
import _ from "lodash";
import { useSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";

import { LRQuestionForm } from "components/aptitude-tests/logical-reasoning";
import {
  initialiseSquareGrid,
  mapNestedArrayToObject,
} from "components/aptitude-tests/logical-reasoning/utils";
import { collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "lib/firebase/config";
import { Grid, ILRQuestion } from "types";
import { endpoints } from "utils/axios";

const INIT_NUM_ROWS = 4;

const uploadImagesToStorage = async (data: Grid[], folder: string) => {
  // iterate over each grid cell and upload any images to storage, store the id
  data.forEach((grid) => {
    grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.type === "image") {
          const path = `${endpoints.storage.aptitudeTests("logical-reasoning")}/${folder}/${uuid()}`;

          const _ref = ref(storage, path);

          uploadBytes(_ref, cell.value as any);

          cell.value = path;
        }
      });
    });
  });

  return data;
};

const AddLRQuestion = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { control, handleSubmit, setValue, watch, reset } =
    useForm<ILRQuestion>({
      defaultValues: {
        type: "complete-the-sequence",
        question: "",
        explanation: "",
        answer: "",
        grid: {
          border: { inner: true, outer: true },
          questionMark: "",
          template: "linear",
          type: "square",
          rows: INIT_NUM_ROWS,
          data: _.range(4).map(() => initialiseSquareGrid(INIT_NUM_ROWS)),
          options: _.range(4).map(() => initialiseSquareGrid(INIT_NUM_ROWS)),
        },
      },
    });

  const onSubmit: SubmitHandler<ILRQuestion> = (data: ILRQuestion) => {
    const ref = doc(
      collection(
        db,
        "courses",
        "consulting",
        "tests",
        "questions",
        "logical-reasoning"
      )
    );

    const dataPromise = uploadImagesToStorage(data.grid.data, ref.id);
    const optionsPromise = uploadImagesToStorage(data.grid.options, ref.id);

    Promise.all([dataPromise, optionsPromise]).then(
      ([dataGrid, optionsGrid]) => {
        const payload = {
          ...data,
          grid: {
            ...data.grid,
            data: mapNestedArrayToObject(dataGrid),
            options: mapNestedArrayToObject(optionsGrid),
          },
          created: Date.now(),
        };

        setDoc(ref, payload)
          .then(() => enqueueSnackbar("LR question added"))
          .catch((err) => console.log(err))
          .finally(() => reset());
      }
    );
  };

  return (
    <>
      <Typography variant="h4" pb={2}>
        Add Logical Reasoning question
      </Typography>
      <LRQuestionForm
        onSubmit={onSubmit}
        control={control}
        watch={watch}
        handleSubmit={handleSubmit}
        setValue={setValue}
      />
    </>
  );
};

export default AddLRQuestion;
