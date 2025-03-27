import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "@/styles/global.scss";
import Header from "@/components/header/header.component";
import { ThemeProvider } from "@/contexts/theme-context";

const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Welders Repertuar",
  description: "Müzik grubu için şarkı repertuarı ve akor kitaplığı",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body className={open_sans.className}>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
