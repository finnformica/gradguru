import React from "react";
import {
  useForm,
  UseFormProps,
  UseFormReturn,
  FieldValues,
} from "react-hook-form";

// Extended return type of hook `useForm`
export type UseStepsFormReturn<
  TVariables extends FieldValues = FieldValues,
  TContext = any,
> = UseFormReturn<TVariables, TContext> & {
  currentStep: number;
  gotoStep: (step: number) => void;
};

// Extended properties of hook `useForm`
export type UseStepsFormProps<
  TVariables extends FieldValues = FieldValues,
  TContext = any,
> = UseFormProps<TVariables, TContext> & {
  initialStep?: number;
  isBackValidate?: boolean;
};

export const useStepsForm = <
  TVariables extends FieldValues = FieldValues,
  TContext = any,
>({
  initialStep = 0,
  isBackValidate = false,
  ...reactHookFormProps
}: UseStepsFormProps<TVariables, TContext> = {}): UseStepsFormReturn<
  TVariables,
  TContext
> => {
  const [currentStep, setCurrentStep] = React.useState(initialStep);

  const useFormResult = useForm({
    ...reactHookFormProps,
  });
  const { trigger } = useFormResult;

  // If target step is less than zero, set to zero
  const go = (targetStep: number) => {
    if (targetStep < 0) {
      return setCurrentStep(0);
    }

    setCurrentStep(targetStep);
  };

  const gotoStep = async (targetStep: number) => {
    // If target step is equal to current step, do nothing
    if (targetStep === currentStep) {
      return;
    }

    // If target step is less than current step and `isBackValidate` is false, go to previous step
    if (targetStep < currentStep && !isBackValidate) {
      go(targetStep);
      return;
    }

    // Trigger validation when going to the next step
    // If `isBackValidate` is true, also trigger validation when going to the previous step
    const isValid = await trigger();
    if (isValid) {
      go(targetStep);
    }
  };

  return {
    ...useFormResult,
    currentStep: currentStep,
    gotoStep,
  };
};
