import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: {
    default: "Thẩm Mỹ Hà Nội - Chuyên gia thẩm mỹ vùng kín hàng đầu",
    template: "%s | Thẩm Mỹ Hà Nội",
  },
  description: "Dịch vụ thẩm mỹ vùng kín chuyên nghiệp tại Hà Nội. Đội ngũ 100% bác sĩ nữ chuyên khoa, công nghệ Laser & HIFU hiện đại từ Mỹ - Hàn Quốc, bảo mật tuyệt đối.",
  keywords: [
    "thẩm mỹ vùng kín",
    "trẻ hóa vùng kín", 
    "thu hẹp âm đạo",
    "làm hồng vùng kín",
    "bác sĩ nữ thẩm mỹ",
    "thẩm mỹ hà nội",
    "laser vùng kín",
    "hifu vùng kín",
  ],
  authors: [{ name: "Thẩm Mỹ Hà Nội" }],
  creator: "Thẩm Mỹ Hà Nội",
  publisher: "Thẩm Mỹ Hà Nội",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://dichvuthammyhanoi.com",
    siteName: "Thẩm Mỹ Hà Nội",
    title: "Thẩm Mỹ Hà Nội - Chuyên gia thẩm mỹ vùng kín",
    description: "Dịch vụ thẩm mỹ vùng kín chuyên nghiệp. 100% bác sĩ nữ, công nghệ hiện đại, bảo mật tuyệt đối.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thẩm Mỹ Hà Nội - Chuyên gia thẩm mỹ vùng kín",
    description: "Dịch vụ thẩm mỹ vùng kín chuyên nghiệp. 100% bác sĩ nữ, công nghệ hiện đại, bảo mật tuyệt đối.",
  },
  verification: {
    google: "google5b2d7fbe0bf6adab",
  },
  alternates: {
    canonical: "https://dichvuthammyhanoi.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <JsonLd type="MedicalBusiness" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

