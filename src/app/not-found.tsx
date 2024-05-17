import PrimaryHeader from "components/LandingPage/PrimaryHeader";
import NotFoundAnimation from "components/global/NotFoundAnimation";

export default function NotFound() {
  return (
    <>
      <PrimaryHeader />
      <NotFoundAnimation href="/" relocatedPageName="home" />
    </>
  );
}
