import PrimaryHeader from "components/LandingPage/PrimaryHeader";
import NotFoundAnimation from "components/global/not-found-animation";

export default function NotFound() {
  return (
    <>
      <PrimaryHeader />
      <NotFoundAnimation href="/" relocatedPageName="home" />
    </>
  );
}
