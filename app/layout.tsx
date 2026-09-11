import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { RevealInit } from "./components/RevealInit";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Behind the Pixels",
  description: "We Strategize Build and Promote",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${figtree.variable} antialiased`}>
      <body className="min-h-dvh font-sans">
        <RevealInit />
        {children}
      </body>
    </html>
  );
}
