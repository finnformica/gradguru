import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import GradguruThemeProvider from "@/theme";

import favicons from "./favicons";

export const metadata = {
  title: "gradguru",
  description: "Coaching platform for graduate students.",
  icons: favicons,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GradguruThemeProvider>
      <html lang="en">
        <body style={{ margin: 0 }} suppressHydrationWarning={true}>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </GradguruThemeProvider>
  );
}
