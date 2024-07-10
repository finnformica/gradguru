"use client";

import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

import AuthForm from "components/LandingPage/AuthForm/AuthForm";
import { LoadingScreen } from "components/global";
import { auth } from "lib/firebase/config";

const SignIn = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const [user, loading, authError] = useAuthState(auth);

  if (authError) {
    enqueueSnackbar("An error occurred while signing in", {
      variant: "error",
    });
  }

  if (loading) return <LoadingScreen />;

  if (user) router.push("/dashboard");

  const signIn = async () => {
    try {
      const credentials = await signInWithEmailAndPassword(email, password);

      if (!credentials) {
        throw new Error("An error occurred while signing in");
      }

      router.push("/dashboard");
    } catch (error) {
      enqueueSnackbar("An error occurred while signing in", {
        variant: "error",
      });
    }
  };

  return (
    <AuthForm
      title="Sign in to your account"
      subtitle="Don't have an account?"
      method="sign-up"
      button="Sign in"
      email={email}
      password={password}
      setEmail={(e) => setEmail(e.target.value)}
      setPassword={(e) => setPassword(e.target.value)}
      handleSubmit={signIn}
    />
  );
};

export default SignIn;
