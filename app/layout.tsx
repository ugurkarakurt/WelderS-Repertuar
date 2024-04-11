import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "@/styles/global.scss"
import Header from "@/components/header/header.component";

const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Welders Repertuar",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={open_sans.className}>
        <Header />
        <main >
          {children}
        </main>
      </body>
    </html>
  );
}
