"use client";
import React from "react";
import Image from "next/image";

const SectionChuyenSau = ({ contentServices }) => {
  return (
    <section className="section-padding bg-beauty-secondary/20">
      <div className="container-premium">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-4">
              <span className="line-accent"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-beauty-primary">
                Dịch Vụ Của Chúng Tôi
              </span>
            </div>
            <h2 className="heading-lg text-beauty-dark">Thẩm Mỹ Y Khoa Chuyên Sâu</h2>
          </div>
          <button className="btn-premium-outline !py-3 !px-8">Xem Danh Mục</button>
        </div>

        {/* Services Grid (Editorial Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {contentServices.map((service, index) => {
            const imageUrl = service.image.data.attributes.url;
            return (
              <div
                key={service.id}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] mb-8 overflow-hidden card-premium border-none">
                  <Image
                    src={process.env.NEXT_PUBLIC_URL_BE + imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  {/* Subtle Top Gradient for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-beauty-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Floating Identity */}
                  <div className="absolute bottom-6 left-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 flex items-center gap-4">
                     <span className="h-[1px] w-8 bg-beauty-primary"></span>
                     <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Khám Phá</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-display italic text-beauty-primary">0{index + 1}</span>
                    <h3 className="text-xl font-display text-beauty-dark group-hover:text-beauty-primary transition-colors duration-500">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm text-beauty-charcoal/50 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Multi-Step Aesthetic CTA */}
        <div className="mt-32 p-16 bg-beauty-dark relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="heading-lg !text-4xl text-white">Trải Nghiệm Chăm Sóc Cá Nhân Hóa</h3>
              <p className="text-white/40 font-light max-w-sm">Mỗi liệu trình được thiết kế riêng biệt cho nhu cầu và mục tiêu thẩm mỹ của bạn.</p>
            </div>
            <div className="flex justify-start md:justify-end">
               <button className="btn-premium-gold !bg-beauty-primary !text-white !border-transparent hover:!bg-white hover:!text-beauty-dark">
                Đặt Lịch Tư Vấn
              </button>
            </div>
          </div>
          {/* Subtle Background Pattern/Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-display italic text-white/[0.02] whitespace-nowrap pointer-events-none uppercase tracking-widest">
            Elite Beauty
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionChuyenSau;
