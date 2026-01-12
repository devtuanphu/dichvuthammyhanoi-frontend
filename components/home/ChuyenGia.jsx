"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";

const ChuyenGia = ({ doctor }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleDoctorClick = (index) => {
    setActiveIndex(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <section className="section-padding bg-beauty-dark text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-beauty-primary/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-beauty-primary/5 to-transparent"></div>
      </div>

      <div className="container-premium relative z-10">
        {/* Section Header */}
        <div className="mb-24 space-y-6">
          <div className="flex items-center gap-4">
            <span className="line-accent"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-beauty-primary">
              Đội Ngũ Chuyên Gia
            </span>
          </div>
          <h2 className="heading-lg !text-5xl md:!text-7xl">Hội Đồng Bác Sĩ Chuyên Khoa</h2>
          <p className="text-white/40 font-light max-w-xl">
            {doctor.description || "Đội ngũ của chúng tôi bao gồm các bác sĩ phẫu thuật và chuyên gia thẩm mỹ uy tín, cam kết mang lại tiêu chuẩn chăm sóc cao nhất."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Active Doctor Details (The Spotlight) */}
          <div className="lg:col-span-8">
            <Swiper
              ref={swiperRef}
              modules={[EffectFade]}
              effect="fade"
              slidesPerView={1}
              allowTouchMove={false}
              className="w-full"
              onSlideChange={(s) => setActiveIndex(s.activeIndex)}
            >
              {doctor?.doctors.map((doc) => {
                const imageUrl = doc?.image?.data?.attributes?.url;
                return (
                  <SwiperSlide key={doc.id}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                      <div className="relative aspect-[4/5] overflow-hidden card-premium border-none">
                        <Image
                          src={imageUrl ? process.env.NEXT_PUBLIC_URL_BE + imageUrl : "/path/defalut.jpg"}
                          alt={doc.name}
                          fill
                          className="object-cover animate-scale-in"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-beauty-dark via-transparent to-transparent opacity-60"></div>
                      </div>

                      <div className="space-y-10">
                        <div className="space-y-4">
                           <h3 className="text-4xl md:text-6xl font-display italic text-beauty-primary leading-tight">
                            {doc.name}
                          </h3>
                          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60">
                            {doc.position}
                          </p>
                        </div>
                        
                        <div className="w-12 h-[1px] bg-beauty-primary/40"></div>

                        <div
                          className="text-white/70 font-light leading-relaxed text-lg italic prose-invert line-clamp-6"
                          dangerouslySetInnerHTML={{ __html: doc.detail }}
                        ></div>

                        <div>
                           <button className="btn-premium-outline !border-white/20 !text-white hover:!bg-white hover:!text-black">
                             Hồ Sơ Chuyên Môn
                           </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          {/* Selection Carousel (Vertical/Sidebar Style) */}
          <div className="lg:col-span-4 space-y-6">
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30 mb-8">Chọn Chuyên Gia</p>
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-6">
              {doctor?.doctors.map((doc, index) => {
                const imageUrl = doc?.image?.data?.attributes?.url;
                const isActive = activeIndex === index;
                return (
                  <div
                    key={doc.id}
                    onClick={() => handleDoctorClick(index)}
                    className={`group cursor-pointer flex items-center gap-6 transition-all duration-700 ${isActive ? "opacity-100" : "opacity-30 hover:opacity-60"}`}
                  >
                    <div className={`relative w-16 h-16 rounded-full overflow-hidden border transition-all duration-700 ${isActive ? "border-beauty-primary scale-110" : "border-white/10"}`}>
                      <Image
                        src={imageUrl ? process.env.NEXT_PUBLIC_URL_BE + imageUrl : "/path/defalut.jpg"}
                        alt={doc.name}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                    <div className="hidden lg:block">
                      <h4 className={`text-xs font-bold transition-all duration-700 tracking-widest ${isActive ? "text-beauty-primary translate-x-2" : "text-white"}`}>
                        {doc.name.toUpperCase()}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChuyenGia;
