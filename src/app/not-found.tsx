import PrimaryHeader from "@/components/LandingPage/PrimaryHeader";
import { NotFoundComponent } from "@/components/Global";

export default function NotFound() {
  return (
    <>
      <PrimaryHeader />
      <NotFoundComponent href="/" />
    </>
  );
}
