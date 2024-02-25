import { PrimaryHeader } from "@/components/LandingPage/Headers";
import { NotFoundComponent } from "@/components/Global";

export default function NotFound() {
  return (
    <>
      <PrimaryHeader />
      <NotFoundComponent href="/" />
    </>
  );
}
