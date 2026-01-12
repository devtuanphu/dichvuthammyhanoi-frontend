"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaPhone, FaCalendarCheck } from "react-icons/fa";
import ModalBaoGia from "./ModalBaoGia";
import { ENDPOINT } from "../../enums/endpoint.enum";
import axios from "axios";

const Contact = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hotline, setHotline] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get(`${ENDPOINT.GET_HOTLINE}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_DEV}`,
        },
      });
      const data = response.data;
      setHotline(data?.data?.attributes);
    } catch (error) {
      console.error("Error fetching hotline data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {hotline && (
        <div className="fixed right-6 bottom-8 z-[1000] flex flex-col items-end gap-5">
          {/* Booking Button (Concierge) */}
          <button
            onClick={() => setIsModalVisible(true)}
            className="group relative"
          >
            <div className="w-16 h-16 bg-beauty-primary text-white shadow-2xl flex items-center justify-center transform hover:scale-105 transition-all duration-700 animate-float">
               <FaCalendarCheck className="text-xl group-hover:scale-110 transition-all duration-700" />
            </div>
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-beauty-dark text-white px-4 py-2 text-[9px] uppercase tracking-[0.3em] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-700 pointer-events-none border border-white/10">
              Tư Vấn Riêng
            </span>
            {/* Subtle Pulse Ring */}
            <div className="absolute inset-0 border border-beauty-primary animate-pulse-gold -z-10"></div>
          </button>

          {/* Simple Direct Tools */}
          <div className="flex flex-col gap-4 opacity-40 hover:opacity-100 transition-opacity duration-700">
            {/* Zalo */}
            <a
              href={`https://zalo.me/${hotline?.zalo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <div className="w-12 h-12 bg-white border border-black/5 flex items-center justify-center hover:bg-beauty-dark hover:text-white transition-all duration-500">
                <Image
                  src="/icon/zalo.svg"
                  alt="Zalo"
                  width={24}
                  height={24}
                  className="w-5 h-5 grayscale group-hover:grayscale-0 group-hover:invert transition-all duration-500"
                />
              </div>
              <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-beauty-dark text-white px-4 py-2 text-[8px] uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                Chat Zalo
              </span>
            </a>

            {/* Direct Dial */}
            <a
              href={`tel:${hotline?.phone}`}
              className="group relative"
            >
              <div className="w-12 h-12 bg-white border border-black/5 flex items-center justify-center hover:bg-beauty-dark hover:text-white transition-all duration-500">
                <FaPhone className="text-sm group-hover:rotate-12 transition-transform duration-500" />
              </div>
              <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-beauty-dark text-white px-4 py-2 text-[8px] uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                {hotline?.phone}
              </span>
            </a>
          </div>
        </div>
      )}

      {isModalVisible && (
        <ModalBaoGia visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
      )}
    </>
  );
};

export default Contact;
