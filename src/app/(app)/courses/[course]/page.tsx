"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/auth";
import { Sidebar } from "@/components/CoursePage";

type CoursePageProps = {
  params: { course: string };
};

const CoursePage = ({ params: { course } }: CoursePageProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!user && !loading) {
  //     router.push("/login");
  //   }
  // }, [user, loading, router]);

  // if (!user) {
  //   return null;
  // }

  return (
    <>
      <Sidebar />
    </>
  );
};

export default CoursePage;
