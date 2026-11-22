import type { Metadata } from "next";
import "./global-styles.css";

const title = "Hamza Wako | AI / Product / Data";
const description = "I love building and using AI to bring ideas to life. Explore my projects, experience, and creative work.";
const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Hamza Wako. AI / Product / Data. Building ideas into reality.",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://personal-website-cyan-gamma-87.vercel.app"),
  title: "Hamza Wako",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Hamza Wako",
    title,
    description,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@1pluswako",
    title,
    description,
    images: [socialImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
