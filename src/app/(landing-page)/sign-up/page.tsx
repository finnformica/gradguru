"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import AuthForm from "components/LandingPage/AuthForm/AuthForm";
import { LoadingScreen } from "components/global";
import { auth } from "lib/firebase/config";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [createUserWithEmailAndPassword, user, loading] =
    useCreateUserWithEmailAndPassword(auth);

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
