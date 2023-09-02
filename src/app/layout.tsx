import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "@/styles/global.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

import GradguruThemeProvider from "@/context/theme";
import { AuthContextProvider } from "@/context/auth";

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
      <AuthContextProvider>
        <html
          lang="en"
          style={{ scrollBehavior: "smooth", scrollPadding: "75px" }}
        >
          <body style={{ margin: 0 }} suppressHydrationWarning={true}>
            <Header />
            <main>{children}</main>
            <Footer />
          </body>
        </html>
      </AuthContextProvider>
    </GradguruThemeProvider>
  );
}
