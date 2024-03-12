"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

import AuthForm from "@/components/LandingPage/AuthForm/AuthForm";
import { useRouter } from "next/navigation";

import { CredentialInputs } from "@/components/globalTypes";
import { useSnackbar } from "notistack";

const SignIn = () => {
  const session = useSession();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    console.log(session);
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleCredentialSignIn = async (data: CredentialInputs) => {
    signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: `${window.location.origin}/dashboard`,
    })
      .then((response) => {
        console.log(response);
        enqueueSnackbar("Signed in successfully");
      })
      .catch((err) =>
        enqueueSnackbar(`Something went wrong - ${err.message}`, {
          variant: "error",
        })
      );
  };

  return (
    <AuthForm
      title="Sign in to your account"
      subtitle="Don't have an account?"
      method="sign-up"
      button="Sign in"
      onSubmit={handleCredentialSignIn}
    />
  );
};

export default SignIn;
