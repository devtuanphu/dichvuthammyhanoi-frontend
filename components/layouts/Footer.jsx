"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import ModalBaoGia from "./ModalBaoGia";
import { ENDPOINT } from "../../enums/endpoint.enum";
import axios from "axios";

const Footer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get(`${ENDPOINT.GET_FOOTER}?populate=logoWhite`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_DEV}`,
        },
      });
      setData(res.data?.data?.attributes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const logo = data?.logoWhite?.data?.attributes?.url;

  return (
    <footer className="relative bg-beauty-dark text-white overflow-hidden selection:bg-white selection:text-beauty-dark">
      {/* Absolute Architectural Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-display italic text-white/[0.02] pointer-events-none uppercase tracking-[0.5em] select-none">
        ELITE
      </div>

      <div className="relative z-10 pt-32 pb-16">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Column 1: Identity */}
            <div className="lg:col-span-4 space-y-12">
              <Image
                src={logo ? process.env.NEXT_PUBLIC_URL_BE + logo : "/logo-hanoi.png"}
                alt="Elite Beauty Logo"
                width={220}
                height={80}
                className="brightness-0 invert mb-4 opacity-80"
              />
              <div className="space-y-6">
                 <p className="text-xl font-display italic text-beauty-primary/80">
                   "Tái định nghĩa chuẩn mực thẩm mỹ chuyên nghiệp từ năm 2008."
                 </p>
                 <div className="flex gap-4">
                   {[FaFacebookF, FaInstagram, FaYoutube].map((Icon, idx) => (
                     <a
                       key={idx}
                       href="#"
                       className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-beauty-primary hover:border-beauty-primary transition-all duration-700"
                     >
                       <Icon className="text-sm" />
                     </a>
                   ))}
                 </div>
              </div>
            </div>

            {/* Column 2: Architecture of Care */}
            <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-beauty-primary">Địa Điểm</h4>
                <div className="space-y-4 text-sm font-light text-white/40 leading-relaxed">
                  <p className="flex items-start gap-4">
                    <FaMapMarkerAlt className="mt-1 text-beauty-primary/40" />
                    <span>{data.address || "Hà Nội — Quận Cầu Giấy — Việt Nam"}</span>
                  </p>
                </div>
              </div>
              <div className="space-y-8">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-beauty-primary">Giờ Làm Việc</h4>
                <div className="space-y-2 text-sm font-light text-white/40">
                  <p>Thứ 2 - Chủ Nhật: {data.time || "08:00 — 20:00"}</p>
                  <p className="italic">Cả ngày lễ</p>
                </div>
              </div>
            </div>

            {/* Column 3: Direct Access */}
            <div className="lg:col-span-3 space-y-12">
               <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-beauty-primary">Hotline Tư Vấn</h4>
                  <a href={`tel:${data.phone}`} className="text-3xl font-display text-white hover:text-beauty-primary transition-colors duration-700 block">
                    {data.phone || "1900 6868"}
                  </a>
               </div>
               <button 
                 onClick={() => setIsModalVisible(true)}
                 className="btn-premium-gold w-full !py-6 !text-[11px]"
               >
                 Đặt Lịch Hẹn Riêng
               </button>
            </div>
          </div>

          <div className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-medium text-white/40">
            <p>© {new Date().getFullYear()} Thẩm mỹ viện Elite — Mọi quy trình đạt chuẩn bệnh viện.</p>
            <div className="flex gap-12">
              <a href="#" className="hover:text-white transition-colors duration-700">Chính sách bảo mật</a>
              <a href="#" className="hover:text-white transition-colors duration-700">Điều khoản y tế</a>
              <a href="#" className="hover:text-white transition-colors duration-700">Sơ đồ trang</a>
            </div>
          </div>
        </div>
      </div>

      {isModalVisible && (
        <ModalBaoGia visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
      )}
    </footer>
  );
};

export default Footer;
