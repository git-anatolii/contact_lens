import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { NotificationProvider } from "@/context/NotificationContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Right Contact | Admin",
  description: "Admin panel of the right contact",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/logo.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </body>
    </html>
  );
}
