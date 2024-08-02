import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SALADMAKER",
  description: "SALADMAKER",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <div className="flex bg-[#f5f5f5] w-full h-screen overflow-y-scroll font-sans">
          <Sidebar />
          <div className="flex w-2/12"></div>
          {children}
        </div>
      </body>
    </html>
  );
}
