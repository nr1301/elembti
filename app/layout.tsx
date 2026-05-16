import type { Metadata } from "next";
import { Noto_Sans_KR, Jua } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-noto",
});

const jua = Jua({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jua",
});

export const metadata: Metadata = {
  title: "나는 어떤 디즈니 캐릭터일까? 🌟",
  description: "초등학생을 위한 MBTI 성향 검사! 나의 성격과 꼭 닮은 디즈니 캐릭터를 찾아봐요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} ${jua.variable} h-full`}>
      <body className="min-h-full bg-[#FFF8F0] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
