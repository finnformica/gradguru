import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Header from "../components/Header";
import GradguruThemeProvider from "@/theme";

export const metadata = {
  title: "gradguru",
  description: "Coaching platform for graduate students.",
  icons: [
    {
      rel: "favicon",
      url: "/favicon/favicon.ico",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
  ],
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
        </body>
      </html>
    </GradguruThemeProvider>
  );
}
