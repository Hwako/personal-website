import type { Metadata } from "next";
import "./global-styles.css";

export const metadata: Metadata = {
  title: "Hamza Wako",
  description:
    "Hamza Wako — Economics & Data Science student at USC. Product management, data science, and building things that matter.",
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
