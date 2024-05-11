import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "styles/global.css";

import "next-cloudinary/dist/cld-video-player.css";

import { CssBaseline } from "@mui/material";

import LatexContext from "context/latex";
import NextAuthProvider from "context/next-auth";
import SnackbarContext from "context/snackbar";
import GradguruThemeProvider from "context/theme";

import favicons from "./favicons";
import { SessionProvider } from "context/user";

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
      <CssBaseline />
      <NextAuthProvider>
        <SessionProvider>
          <html lang="en">
            <body suppressHydrationWarning={true}>
              <SnackbarContext>
                <LatexContext>{children}</LatexContext>
              </SnackbarContext>
            </body>
          </html>
        </SessionProvider>
      </NextAuthProvider>
    </GradguruThemeProvider>
  );
}
