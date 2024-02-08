import React from "react";
import { IGraphForm, ITableForm } from "./types";
import { EditableTable } from "./EditableTable";

interface GraphFormProps {
  form: IGraphForm;
  setForm: (newForm: ITableForm | IGraphForm) => void;
}

const GraphForm = ({ form, setForm }: GraphFormProps) => {
  return (
    <>
      <EditableTable form={form} setForm={setForm} />
    </>
  );
};

export default GraphForm;
