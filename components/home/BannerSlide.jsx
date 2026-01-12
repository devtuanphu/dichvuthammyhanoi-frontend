"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";

const BannerSlide = ({ banner }) => {
  return (
    <div className="relative h-screen bg-beauty-dark overflow-hidden">
      <Swiper
        pagination={{
          clickable: true,
          el: ".banner-pagination",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        effect="fade"
        speed={2500}
        modules={[Pagination, Autoplay, EffectFade]}
        className="h-full group"
      >
        {banner.map((slide, index) => {
          const imageUrl = slide.image.data.attributes.url;
          return (
            <SwiperSlide key={slide.id} className="overflow-hidden">
              <div className="relative w-full h-full">
                {/* Background Image with Cinematic Pan/Zoom */}
                <div className="absolute inset-0 scale-105 group-hover:scale-100 transition-transform duration-[12000ms] ease-out">
                  <Image
                    src={process.env.NEXT_PUBLIC_URL_BE + imageUrl}
                    alt={slide.alt || `Elite Beauty - Slide ${index + 1}`}
                    fill
                    className="object-cover object-center"
                    priority={index === 0}
                    sizes="100vw"
                  />
                  {/* Dramatic Overlay Layer */}
                  <div className="absolute inset-0 bg-[#0A0A0A]/40 mix-blend-multiply"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-beauty-dark via-beauty-dark/20 to-transparent opacity-80"></div>
                </div>

                {/* Hero Content Area */}
                <div className="relative h-full flex items-center pt-32 md:pt-40">
                  <div className="container-premium text-white">
                    <div className="max-w-4xl space-y-8 md:space-y-12">
                       <div className="flex items-center gap-6 overflow-hidden">
                        <span className="line-accent"></span>
                        <span className="text-xs font-bold uppercase tracking-[0.4em] text-beauty-primary animate-fade-in">
                          Nghệ Thuật Thẩm Mỹ Y Khoa
                        </span>
                      </div>
                      
                      <h1 className="heading-xl text-white drop-shadow-2xl animate-slide-up selection:bg-beauty-primary/50">
                        {slide.title || "Elite Beauty Clinic"}
                      </h1>
                      
                      <p className="text-lg md:text-xl lg:text-2xl text-white/80 font-light max-w-2xl leading-relaxed animate-slide-up delay-200">
                        {slide.description || "Nơi khoa học hiện đại hội ngộ cùng nghệ thuật thẩm mỹ tinh tế cho vẻ đẹp rạng ngời."}
                      </p>

                      <div className="pt-8 flex flex-wrap gap-6 animate-slide-up delay-400">
                        <button className="btn-premium-gold whitespace-nowrap">
                          Tư Vấn Ngay
                        </button>
                        <button className="btn-premium-outline !border-white/30 !text-white hover:!bg-white hover:!text-black whitespace-nowrap">
                          Về Chúng Tôi
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Minimalist Pagination */}
      <div className="banner-pagination absolute bottom-20 left-12 z-20 flex gap-4"></div>

      {/* Floating Scroll Down */}
      <div className="absolute bottom-12 right-12 z-20 hidden lg:flex flex-col items-center gap-6 animate-fade-in pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 vertical-text font-bold">Cuộn Xuống</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/40 to-transparent"></div>
      </div>
      
      <style jsx global>{`
        .vertical-text {
          writing-mode: vertical-rl;
        }
      `}</style>
    </div>
  );
};

export default BannerSlide;
