import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Cleanzera",
  description: "Sistema para tracking de exames antidoping para atletas.",
  icons: {
    icon: '/assets/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
