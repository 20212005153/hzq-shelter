import { Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  title: "华子强的避难所",
  description: "个人作品集 & 博客 — 极客风暗黑终端",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh" className="dark">
      <body className={`${mono.variable} antialiased`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
