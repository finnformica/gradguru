"use client";

import { useSession } from "next-auth/react";

import AuthForm from "components/LandingPage/AuthForm/AuthForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  });

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
      handleSubmit={() => console.log("submit")}
    />
  );
};

export default SignIn;
