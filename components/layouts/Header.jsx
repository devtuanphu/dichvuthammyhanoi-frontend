"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Link from "next/link";
import Marquee from "./Marquee";
import ModalBaoGia from "./ModalBaoGia";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { title: "Trang Chủ", link: "/" },
    { title: "Về Chúng Tôi", link: "/ve-chung-toi" },
    { title: "Dịch Vụ", link: "/dich-vu" },
    { title: "Tin Tức", link: "/tin-tuc" },
    { title: "Liên Hệ", link: "/lien-he" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] transition-all duration-700">
        <Marquee />
        <header
          className={`transition-all duration-700 ${
            scrolled
              ? "py-3 bg-white/80 backdrop-blur-2xl border-b border-black/5 shadow-premium"
              : "py-6 bg-transparent"
          }`}
        >
          <div className="container-premium flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="relative z-[110] group">
              <Image
                src="/logo-hanoi.png"
                alt="Premium Clinic Logo"
                width={240}
                height={80}
                className={`transition-all duration-700 object-contain ${
                  scrolled ? "w-[160px] md:w-[200px]" : "w-[180px] md:w-[240px]"
                } ${!scrolled && "brightness-0"}`}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.link}
                  className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-500 relative group truncate ${
                    scrolled ? "text-beauty-dark" : "text-black"
                  }`}
                >
                  {item.title}
                  <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-beauty-primary transition-all duration-500 group-hover:w-full"></span>
                </Link>
              ))}
              <div className={`h-4 w-[1px] mx-2 transition-colors duration-700 ${scrolled ? "bg-black/10" : "bg-black/20"}`}></div>
              <button 
                onClick={() => setIsModalVisible(true)}
                className="btn-premium-primary !px-8 !py-3 !text-[10px]"
              >
                Đặt Lịch
              </button>
            </nav>

            {/* Mobile Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-[110] p-2"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <CloseOutlined className="text-2xl text-beauty-dark" />
              ) : (
                <MenuOutlined className={`text-2xl transition-colors duration-500 ${scrolled ? "text-beauty-dark" : "text-black"}`} />
              )}
            </button>
          </div>
        </header>

        {/* Cinematic Mobile Navigation */}
        <div 
          className={`fixed inset-0 bg-white z-[105] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
        >
          <div className="flex flex-col h-full items-center justify-center p-12 space-y-10">
            {menuItems.map((item, idx) => (
              <Link
                key={item.title}
                href={item.link}
                style={{ transitionDelay: `${idx * 100}ms` }}
                className={`text-4xl md:text-6xl font-display text-beauty-dark transition-all duration-1000 ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                } hover:text-beauty-primary hover:italic`}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <div className={`h-[1px] w-20 bg-beauty-primary transition-all duration-1000 ${isOpen ? "w-40 opacity-100" : "w-0 opacity-0"}`}></div>
            <button
              onClick={() => {
                setIsModalVisible(true);
                setIsOpen(false);
              }}
              className="btn-premium-gold !px-12 !py-5"
            >
              Yêu cầu tư vấn
            </button>
          </div>
        </div>
      </div>

      {isModalVisible && (
        <ModalBaoGia visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
      )}
    </>
  );
};

export default Header;
