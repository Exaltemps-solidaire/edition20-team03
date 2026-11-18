import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "L'BURN — Parcours",
  description: "Parcours BURN TO BE ALIVE et BURN'ette is BACK",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={libreFranklin.variable}>
      <body>{children}</body>
    </html>
  );
}
