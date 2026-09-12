import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { RevealInit } from "./components/RevealInit";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Behind the Pixels",
  description: "We Strategize Build and Promote",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${cormorant.variable} antialiased`}
    >
      <body className="min-h-dvh font-sans">
        <RevealInit />
        {children}
      </body>
    </html>
  );
}
