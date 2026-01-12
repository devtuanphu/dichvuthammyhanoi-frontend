"use client";
import React, { useState } from "react";
import ModalBaoGia from "./ModalBaoGia";

const BaoGia = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <section className="section-padding bg-beauty-secondary/30 relative overflow-hidden">
      {/* Decorative Branding */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display italic text-black/[0.015] pointer-events-none uppercase tracking-[0.4em] select-none">
        Elite
      </div>

      <div className="container-premium relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          {/* Invitation Content */}
          <div className="lg:col-span-12 text-center space-y-12">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4">
                <span className="line-accent"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-beauty-primary">
                  Lời Ngỏ
                </span>
                <span className="line-accent"></span>
              </div>
              <h2 className="heading-lg !text-5xl md:!text-7xl">Hành Trình Tỏa Sáng Đang Chờ Bạn</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-10">
              <p className="text-xl md:text-2xl font-display italic text-beauty-charcoal/60 leading-relaxed">
                "Dù bạn đang tìm kiếm sự thay đổi tinh tế hay lột xác ngoạn mục, các chuyên gia của chúng tôi luôn sẵn sàng đồng hành cùng bạn với sự tận tâm tuyệt đối."
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
                <button
                  onClick={() => setIsModalVisible(true)}
                  className="btn-premium-gold !px-12 !py-6"
                >
                  Đăng Ký Tư Vấn
                </button>
                <div className="h-[1px] w-12 bg-black/10 hidden md:block"></div>
                 <button
                  onClick={() => setIsModalVisible(true)}
                  className="btn-premium-outline !px-12 !py-6"
                >
                  Nhận Bảng Giá
                </button>
              </div>
            </div>

            {/* Subtle Clinical Badges */}
            <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="space-y-4">
                <p className="text-2xl font-display">15+</p>
                <p className="text-[9px] uppercase tracking-widest font-bold">Năm Kinh Nghiệm</p>
              </div>
              <div className="space-y-4">
                <p className="text-2xl font-display">8k+</p>
                <p className="text-[9px] uppercase tracking-widest font-bold">Khách Hàng Hài Lòng</p>
              </div>
              <div className="space-y-4">
                <p className="text-2xl font-display">Chuẩn</p>
                <p className="text-[9px] uppercase tracking-widest font-bold">Bệnh Viện</p>
              </div>
              <div className="space-y-4">
                <p className="text-2xl font-display">Elite</p>
                <p className="text-[9px] uppercase tracking-widest font-bold">Mạng Lưới Chuyên Gia</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalVisible && (
        <ModalBaoGia visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
      )}
    </section>
  );
};

export default BaoGia;
