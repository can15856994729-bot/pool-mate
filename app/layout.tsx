import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  title: "球伴 CueMate — 台球运动社交平台",
  description: "找陪练、约球局、发现附近台球厅",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full flex flex-col pb-safe">
        <main className="flex-1">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
