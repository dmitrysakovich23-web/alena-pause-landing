import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "СИСТЕМА ОСОЗНАННОСТИ «ПАУЗА»",
  description: "внимание → пауза → реализация",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
