import { CourseContextProvider } from "@/context/course";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <CourseContextProvider>{children}</CourseContextProvider>;
}
