"use client";

import { useSession } from "next-auth/react";

import AuthForm from "@/components/LandingPage/AuthForm/AuthForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignUp = () => {
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
      title="Create an account"
      subtitle="Already have an account?"
      method="sign-in"
      button="Sign up"
      email={email}
      password={password}
      setEmail={(e) => setEmail(e.target.value)}
      setPassword={(e) => setPassword(e.target.value)}
      handleSubmit={() => console.log("submit")}
    />
  );
};

export default SignUp;
