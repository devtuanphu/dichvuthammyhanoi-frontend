"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

const AboutSlider = ({ slide }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="py-8 relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="about-slider"
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
            centeredSlides: false,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
            centeredSlides: true,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
            centeredSlides: true,
          },
        }}
      >
        {slide.map((item, index) => {
          const imageUrl = item.image.data.attributes.url;
          const isActive = activeIndex === index;

          return (
            <SwiperSlide key={item.id}>
              <div
                className={`relative transition-all duration-500 ease-in-out ${
                  isActive
                    ? "scale-100 opacity-100"
                    : "scale-90 opacity-70"
                } w-full h-[250px] md:h-[300px] rounded-2xl overflow-hidden group`}
              >
                {/* Image */}
                <Image
                  src={
                    process.env.NEXT_PUBLIC_URL_BE + imageUrl ||
                    "/path/defalut.jpg"
                  }
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-beauty-dark/90 via-beauty-dark/50 to-transparent"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h4 className="font-bold text-base md:text-lg mb-1 line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs md:text-sm opacity-90 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute top-4 right-4 w-3 h-3 bg-beauty-primary rounded-full animate-pulse shadow-glow"></div>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-beauty flex items-center justify-center hover:bg-beauty-primary hover:text-white transition-all duration-300 -ml-6 hidden md:flex">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-beauty flex items-center justify-center hover:bg-beauty-primary hover:text-white transition-all duration-300 -mr-6 hidden md:flex">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default AboutSlider;
