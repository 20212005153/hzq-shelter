import "./globals.css";
import CustomCursor from "@/components/CustomCursor"
import AmbientSound from "@/components/AmbientSound";

export const metadata = {
  title: "华子强的避难所",
  description: "个人作品集与博客，带终端视觉、交互音效和项目展示。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh" className="dark">
      <body className="antialiased">
        <CustomCursor />
        <AmbientSound />
        {children}
      </body>
    </html>
  );
}
