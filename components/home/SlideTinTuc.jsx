"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

const SlideTinTuc = ({ baiVietLienQuan }) => {
  return (
    <section className="section-padding bg-white">
      <div className="container-premium">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-4">
              <span className="line-accent"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-beauty-primary">
                Kiến Thức Thẩm Mỹ
              </span>
            </div>
            <h2 className="heading-lg text-beauty-dark">Tin Tức & Xu Hướng Làm Đẹp</h2>
          </div>
          <Link href="/tin-tuc" className="btn-premium-outline !py-3 !px-8">Xem Tất Cả</Link>
        </div>

        {/* Cinematic Slider */}
        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            effect="fade"
            speed={1500}
            spaceBetween={0}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
            }}
            className="group"
          >
            {baiVietLienQuan.map((post) => {
              const imageUrl = post?.attributes?.seo?.thumbnail?.data?.attributes?.url;
              return (
                <SwiperSlide key={post.id}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden border border-black/5 bg-beauty-secondary/5">
                    {/* Media Spotlight */}
                    <div className="lg:col-span-7 relative h-[400px] md:h-[600px] overflow-hidden">
                      <Image
                        src={imageUrl ? `${process.env.NEXT_PUBLIC_URL_BE}${imageUrl}` : "/path/defalut.jpg"}
                        alt={post?.attributes?.title}
                        fill
                        className="object-cover transition-transform duration-[4000ms] group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                    </div>

                    {/* Editorial Content */}
                    <div className="lg:col-span-5 p-12 lg:p-20 flex flex-col justify-center space-y-10">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                           <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-beauty-primary">
                            Cập Nhật Y Khoa
                          </span>
                          <span className="h-4 w-[1px] bg-black/10"></span>
                          <span className="text-[10px] uppercase tracking-[0.2em] text-beauty-charcoal/40">
                             {new Date(post?.attributes?.createdAt).toLocaleDateString("vi-VN", { month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-display text-beauty-dark leading-[1.2] hover:text-beauty-primary transition-colors duration-500">
                          <Link href={post?.attributes?.slug}>{post?.attributes?.title}</Link>
                        </h3>
                      </div>

                      <p className="text-beauty-charcoal/60 font-light leading-relaxed line-clamp-4 text-lg">
                        {post?.attributes?.seo?.description || "Những kiến thức chuyên sâu về các thủ thuật thẩm mỹ hiện đại và khoa học đằng sau vẻ đẹp bền vững."}
                      </p>

                      <div className="pt-4">
                        <Link
                          href={post?.attributes?.slug}
                          className="btn-premium-primary !px-10 !py-4"
                        >
                          Đọc Bài Viết
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default SlideTinTuc;
