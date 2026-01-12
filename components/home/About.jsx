"use client";
import React from "react";
import AboutSlider from "./AboutSlider";

const About = ({ about, slide }) => {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-premium">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="line-accent"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-beauty-primary">
                  Triết Lý Của Chúng Tôi
                </span>
              </div>
              <h2 className="heading-lg text-beauty-dark leading-tight">
                {about.title || "Tầm Nhìn Về Sự Hoàn Hảo"}
              </h2>
            </div>

            <div className="space-y-8">
              <p className="text-2xl md:text-3xl font-display italic text-beauty-charcoal/80 leading-relaxed">
                &ldquo;{about.mainDescribe || "Vẻ đẹp là sự biểu hiện độc nhất của bản thân, được tinh chỉnh bởi nghệ thuật và khoa học."}&rdquo;
              </p>
              
              <div className="h-[1px] w-full bg-black/5"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-beauty-dark">Di Sản & Chuyên Môn</h4>
                  <p className="text-sm text-beauty-charcoal/60 leading-relaxed">
                    Hơn một thập kỷ xuất sắc trong phẫu thuật và đổi mới thẩm mỹ tại trung tâm thủ đô.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-beauty-dark">Tiên Phong An Toàn</h4>
                  <p className="text-sm text-beauty-charcoal/60 leading-relaxed">
                    Công nghệ đạt chuẩn FDA và tiêu chuẩn vô trùng bệnh viện cho mọi quy trình.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8">
               <button className="btn-premium-outline">
                Hành Trình Của Chúng Tôi
              </button>
            </div>
          </div>

          {/* Cinematic Slider / Media */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 border border-beauty-primary/20 -z-10 translate-x-4 translate-y-4"></div>
            {slide && slide.length > 0 && (
              <div className="card-premium h-[500px] md:h-[600px] overflow-hidden">
                <AboutSlider slide={slide} />
              </div>
            )}
            {/* Minimal Decorative Badge */}
            <div className="absolute -bottom-10 -left-10 bg-beauty-dark text-white p-8 hidden md:block animate-float">
              <p className="text-4xl font-display italic mb-1">15+</p>
              <p className="text-[9px] uppercase tracking-widest opacity-60">Năm Chăm Sóc Tận Tâm</p>
            </div>
          </div>
        </div>

        {/* Floating Secondary Content */}
        <div className="mt-32 max-w-5xl">
           <p className="text-premium">
             {about.subDescribe || "Chúng tôi tin vào phương pháp tiếp cận cá nhân hóa trong y học thẩm mỹ. Mỗi khách hàng là một kiệt tác đang chờ được khai phá. Các chuyên gia của chúng tôi kết hợp độ chính xác lâm sàng với con mắt nghệ thuật để mang lại kết quả tự nhiên và tuyệt mỹ."}
           </p>
        </div>
      </div>
    </section>
  );
};

export default About;
