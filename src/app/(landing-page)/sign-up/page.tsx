"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

import AuthForm from "@/components/LandingPage/AuthForm/AuthForm";
import { useRouter } from "next/navigation";

import { CredentialInputs } from "@/components/globalTypes";
import { registerUser } from "@/api/user";
import { useSnackbar } from "notistack";

const SignUp = () => {
  const session = useSession();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  });

  const handleCredentialSignUp = async (data: CredentialInputs) => {
    registerUser(data)
      .then(() => enqueueSnackbar("You have successfully registered!"))
      .catch((err) =>
        enqueueSnackbar(`Something went wrong - ${err.data}`, {
          variant: "error",
        })
      );
  };

  return (
    <AuthForm
      title="Create an account"
      subtitle="Already have an account?"
      method="sign-in"
      button="Sign up"
      onSubmit={handleCredentialSignUp}
    />
  );
};

export default SignUp;
