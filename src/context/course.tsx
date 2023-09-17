"use client";

import { useContext, createContext, useState } from "react";

import { CourseType, consultingCourse } from "@/mock/courses";

export interface CourseContextType {
  course: CourseType | null;
  setCourse: (course: CourseType) => void;
}

const CourseContext = createContext<CourseContextType | null>(null);

export const CourseContextProvider = ({ children }: any) => {
  const [course, setCourse] = useState<CourseType | null>(null);
  const value = { course, setCourse };

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};

export const useCourse = () => {
  return useContext(CourseContext) as CourseContextType;
};
