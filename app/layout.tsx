import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OBLIQUE — Cultural Marketing Agency",
  description: "We make culture move. A London-based cultural marketing agency working at the intersection of music, brand, and live experience.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={unbounded.variable}>
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
