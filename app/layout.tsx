import type { Metadata } from "next";
import { Cormorant_Garamond, Press_Start_2P } from "next/font/google";
import localFont from "next/font/local";
import { RevealInit } from "./components/RevealInit";
import "./globals.css";

const figtree = localFont({
  src: [
    {
      path: "../public/Font/figtree/static/Figtree-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/Font/figtree/static/Figtree-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Font/figtree/static/Figtree-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/Font/figtree/static/Figtree-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/Font/figtree/static/Figtree-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-figtree",
  display: "swap",
});

const fragmentMono = localFont({
  src: [
    {
      path: "../public/Font/fragment-mono/FragmentMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Font/fragment-mono/FragmentMono-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-fragment",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const pressStart = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://piermontstudios.com"),
  title: "Piermont Studios",
  description: "We Strategize Build and Promote",
  icons: {
    icon: [{ url: "/FooterLogo.png", type: "image/png" }],
    apple: "/FooterLogo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://piermontstudios.com",
    siteName: "Piermont Studios",
    title: "Piermont Studios",
    description: "We Strategize Build and Promote",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Piermont Studios - We Strategize Build and Promote",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Piermont Studios",
    description: "We Strategize Build and Promote",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${fragmentMono.variable} ${cormorant.variable} ${pressStart.variable} antialiased`}
    >
      <body className="min-h-dvh font-sans">
        <RevealInit />
        {children}
      </body>
    </html>
  );
}
