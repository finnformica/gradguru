import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "@/styles/global.css";

import "next-cloudinary/dist/cld-video-player.css";

import GradguruThemeProvider from "@/context/theme";
import NextAuthProvider from "@/context/next-auth";
import SnackbarContext from "@/context/snackbar";

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
      <NextAuthProvider>
        <html lang="en">
          <body suppressHydrationWarning={true}>
            <SnackbarContext>{children}</SnackbarContext>
          </body>
        </html>
      </NextAuthProvider>
    </GradguruThemeProvider>
  );
}
