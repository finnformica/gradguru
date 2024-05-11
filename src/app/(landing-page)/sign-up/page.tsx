"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";

import AuthForm from "components/LandingPage/AuthForm/AuthForm";
import { LoadingScreen } from "components/global";
import { auth } from "lib/firebase/config";
import { useSnackbar } from "notistack";

const SignUp = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

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
      title="Create an account"
      subtitle="Already have an account?"
      method="sign-in"
      button="Sign up"
      email={email}
      password={password}
      setEmail={(e) => setEmail(e.target.value)}
      setPassword={(e) => setPassword(e.target.value)}
      handleSubmit={() => createUserWithEmailAndPassword(email, password)}
    />
  );
};

export default SignUp;
