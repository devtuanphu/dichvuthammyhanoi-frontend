import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import Contact from "../components/layouts/Contact";
import NextTopLoader from "nextjs-toploader";
import { GoogleTagManager } from "@next/third-parties/google";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Premium Clinic - Nghệ Thuật Thẩm Mỹ Chuyên Nghiệp",
  description: "Dịch vụ thẩm mỹ nâng cao và chăm sóc y tế chuyên sâu tại Hà Nội.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased font-sans`}
      >
        <GoogleTagManager gtmId="GTM-NF2C32J8" />
        <Header />
        <AntdRegistry>
          <NextTopLoader
            color="#D4A373"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            zIndex={1600}
          />
          {children}
        </AntdRegistry>
        <Footer />
        <Contact />
      </body>
    </html>
  );
}
