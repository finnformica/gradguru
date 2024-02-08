import React from "react";
import { IGraphForm } from "./types";

interface GraphFormProps {
  form: IGraphForm;
  setForm: (newForm: IGraphForm) => void;
}

const GraphForm = ({ form, setForm }: GraphFormProps) => {
  return <div>GraphForm</div>;
};

export default GraphForm;
