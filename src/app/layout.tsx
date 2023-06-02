import Header from "../components/Header";
import GradguruThemeProvider from "@/theme";

export const metadata = {
  title: "Grad Guru",
  description: "Coaching platform for graduate students.",
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
