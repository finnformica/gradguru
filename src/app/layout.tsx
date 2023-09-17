import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "@/styles/global.css";

import "next-cloudinary/dist/cld-video-player.css";

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
        <html lang="en">
          <body suppressHydrationWarning={true}>{children}</body>
        </html>
      </AuthContextProvider>
    </GradguruThemeProvider>
  );
}
