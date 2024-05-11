"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

import AuthForm from "components/LandingPage/AuthForm/AuthForm";
import { LoadingScreen } from "components/global";
import { auth } from "lib/firebase/config";
import { useSnackbar } from "notistack";

const SignIn = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const [user, loading, error] = useAuthState(auth);

  if (error) {
    enqueueSnackbar("An error occurred while signing in", {
      variant: "error",
    });
  }

  if (loading) return <LoadingScreen />;

  if (user) router.push("/dashboard");

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
      handleSubmit={() => signInWithEmailAndPassword(email, password)}
    />
  );
};

export default SignIn;
