import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Cleanzera",
  description: "Sistema para tracking de exames antidoping para atletas.",
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
