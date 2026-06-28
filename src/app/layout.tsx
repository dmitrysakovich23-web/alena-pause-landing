import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ПАУЗА",
  description: "Визуальный прототип лендинга проекта ПАУЗА.",
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
