import { Metadata } from 'next';
import Link from 'next/link';
import { getServices, getHomepage, getSiteSettings, getStrapiImageUrl, Service } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepage();
  
  console.log('[SEO Home] homepage data:', JSON.stringify(homepage, null, 2));
  console.log('[SEO Home] seo:', JSON.stringify(homepage?.seo, null, 2));
  
  return {
    title: homepage?.seo?.metaTitle || 'Thẩm Mỹ Hà Nội - Chuyên gia thẩm mỹ vùng kín',
    description: homepage?.seo?.metaDescription || 'Dịch vụ thẩm mỹ vùng kín chuyên nghiệp với đội ngũ 100% bác sĩ nữ, công nghệ hiện đại, bảo mật tuyệt đối.',
    keywords: homepage?.seo?.keywords,
    openGraph: {
      title: homepage?.seo?.metaTitle || 'Thẩm Mỹ Hà Nội',
      description: homepage?.seo?.metaDescription || 'Dịch vụ thẩm mỹ vùng kín chuyên nghiệp',
      url: 'https://dichvuthammyhanoi.com',
      images: homepage?.seo?.metaImage ? [getStrapiImageUrl(homepage.seo.metaImage)] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: homepage?.seo?.metaTitle || 'Thẩm Mỹ Hà Nội - Chuyên gia thẩm mỹ vùng kín',
      description: homepage?.seo?.metaDescription || 'Dịch vụ thẩm mỹ vùng kín chuyên nghiệp',
    },
    alternates: {
      canonical: 'https://dichvuthammyhanoi.com',
    },
  };
}

const fallbackServices: Service[] = [
  {
    id: 1,
    documentId: '1',
    title: 'Trẻ hóa vùng kín',
    slug: 'tre-hoa-vung-kin-laser',
    description: 'Công nghệ laser CO2 fractional tiên tiến giúp trẻ hóa, se khít và tăng độ đàn hồi vùng kín an toàn.',
    price: 'Từ 5.000.000đ',
  },
  {
    id: 2,
    documentId: '2',
    title: 'Thu hẹp âm đạo',
    slug: 'thu-hep-am-dao-hifu',
    description: 'Phương pháp không phẫu thuật với công nghệ HIFU hoặc Laser giúp se khít, tăng cường độ đàn hồi.',
    price: 'Từ 8.000.000đ',
  },
  {
    id: 3,
    documentId: '3',
    title: 'Làm hồng vùng kín',
    slug: 'lam-hong-vung-kin',
    description: 'Công nghệ laser và tinh chất sinh học giúp làm hồng, đều màu vùng da nhạy cảm.',
    price: 'Từ 3.000.000đ',
  },
  {
    id: 4,
    documentId: '4',
    title: 'Tạo hình môi bé',
    slug: 'tao-hinh-moi-be',
    description: 'Phẫu thuật thẩm mỹ chỉnh hình môi bé với kỹ thuật hiện đại, an toàn, thẩm mỹ cao.',
    price: 'Từ 15.000.000đ',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Chị H.T.M',
    age: '32 tuổi',
    content: 'Sau khi sinh 2 bé, tôi đã tìm đến đây. Dịch vụ rất chuyên nghiệp và kín đáo. Kết quả rất tốt.',
  },
  {
    id: 2,
    name: 'Chị N.T.L',
    age: '28 tuổi',
    content: 'Tôi rất hài lòng với sự tư vấn tận tình của bác sĩ. Quy trình an toàn và hiệu quả như cam kết.',
  },
  {
    id: 3,
    name: 'Chị P.T.H',
    age: '35 tuổi',
    content: 'Cảm ơn đội ngũ bác sĩ đã giúp tôi tự tin hơn. Không gian riêng tư rất thoải mái.',
  },
];

const whyUs = [
  { icon: '🩺', title: 'Bác sĩ nữ chuyên khoa', desc: 'Đội ngũ 100% bác sĩ nữ giàu kinh nghiệm' },
  { icon: '🔒', title: 'Bảo mật tuyệt đối', desc: 'Thông tin khách hàng được bảo mật nghiêm ngặt' },
  { icon: '🏥', title: 'Phòng riêng VIP', desc: 'Không gian riêng tư, thoải mái cho từng khách' },
  { icon: '✨', title: 'Công nghệ hiện đại', desc: 'Trang thiết bị tiên tiến từ Mỹ, Hàn Quốc' },
];

export default async function HomePage() {
  const [servicesData, homepageData, siteSettings] = await Promise.all([
    getServices(),
    getHomepage(),
    getSiteSettings(),
  ]);

  const services = servicesData.length > 0 ? servicesData.slice(0, 4) : fallbackServices;
  const heroTitle = homepageData?.heroTitle || 'Tự tin tỏa sáng, hạnh phúc viên mãn';
  const heroSubtitle = homepageData?.heroSubtitle || 'Thẩm Mỹ Hà Nội - Địa chỉ thẩm mỹ vùng kín uy tín với đội ngũ bác sĩ nữ chuyên khoa, công nghệ hiện đại và cam kết bảo mật tuyệt đối.';
  const phone = siteSettings?.phone || '0123 456 789';
  const phoneClean = phone.replace(/\s/g, '');

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur text-pink-600 rounded-full text-sm font-medium mb-6 shadow-lg">
                <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                Chuyên gia thẩm mỹ vùng kín hàng đầu
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                {heroTitle.split(',')[0]},
                <span className="block bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                  {heroTitle.split(',')[1] || 'hạnh phúc viên mãn'}
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
                {heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/lien-he"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-semibold rounded-full shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105"
                >
                  Đặt lịch tư vấn kín đáo
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href={`tel:${phoneClean}`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-pink-600 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100"
                >
                  Hotline: {phone}
                </a>
              </div>
              
              <div className="flex items-center gap-6 mt-10 pt-8 border-t border-pink-100">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">100% Bác sĩ nữ</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">Bảo mật tuyệt đối</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-pink-600 font-bold text-sm">5K+</span>
                  </div>
                  <span className="text-sm text-gray-600">Khách hàng</span>
                </div>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                {homepageData?.heroImage ? (
                  <img 
                    src={getStrapiImageUrl(homepageData.heroImage)} 
                    alt="Hero" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-rose-400 to-purple-400 flex items-center justify-center">
                    <div className="text-center text-white/80">
                      <svg className="w-20 h-20 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">Hình ảnh minh họa</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">An toàn tuyệt đối</p>
                  <p className="text-sm text-gray-500">Được cấp phép hoạt động</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-4">
              Tại sao chọn chúng tôi
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cam kết <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">an toàn và riêng tư</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi thấu hiểu sự nhạy cảm của dịch vụ thẩm mỹ vùng kín và cam kết mang đến trải nghiệm thoải mái nhất
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item, index) => (
              <div key={index} className="text-center p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 hover:shadow-xl transition-all duration-300 group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-4">
              Dịch vụ của chúng tôi
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dịch vụ thẩm mỹ <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">chuyên sâu</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Các dịch vụ được thực hiện bởi đội ngũ bác sĩ nữ chuyên khoa với công nghệ hiện đại
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link key={service.id} href={`/dich-vu/${service.slug}`} className="group">
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:-translate-y-2 h-full">
                  <div className="aspect-[4/3] bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200 relative">
                    {service.image ? (
                      <img 
                        src={getStrapiImageUrl(service.image)} 
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white/60">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                      <span className="text-white font-semibold">{service.price}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{service.description}</p>
                    <span className="inline-flex items-center text-pink-500 text-sm font-medium group-hover:translate-x-2 transition-transform">
                      Tìm hiểu thêm →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/dich-vu"
              className="inline-flex items-center px-8 py-4 bg-white text-pink-600 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100"
            >
              Xem tất cả dịch vụ
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Privacy Promise */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-pink-900 to-rose-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur rounded-full mb-6">
              <svg className="w-10 h-10 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cam kết <span className="text-pink-400">bảo mật</span> tuyệt đối
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Chúng tôi hiểu rằng sự riêng tư là ưu tiên hàng đầu của bạn
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur rounded-3xl p-8 text-center hover:bg-white/15 transition-colors">
              <div className="text-5xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold mb-3">Thông tin mã hóa</h3>
              <p className="text-white/70">Mọi thông tin cá nhân được mã hóa và bảo vệ theo tiêu chuẩn quốc tế</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-3xl p-8 text-center hover:bg-white/15 transition-colors">
              <div className="text-5xl mb-4">🚪</div>
              <h3 className="text-xl font-semibold mb-3">Phòng riêng biệt</h3>
              <p className="text-white/70">Mỗi khách hàng có phòng riêng VIP, không gian hoàn toàn riêng tư</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-3xl p-8 text-center hover:bg-white/15 transition-colors">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-3">Cam kết không tiết lộ</h3>
              <p className="text-white/70">Thông tin khách hàng tuyệt đối không được tiết lộ cho bên thứ 3</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-4">
              Khách hàng chia sẻ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cảm nhận từ <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">khách hàng</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(4)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.age}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-4">
              Quy trình
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quy trình <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">kín đáo và chuyên nghiệp</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Tư vấn riêng tư', desc: 'Gặp bác sĩ nữ trong phòng riêng để được tư vấn kỹ lưỡng' },
              { step: 2, title: 'Thăm khám kín đáo', desc: 'Thăm khám cẩn thận, đánh giá tình trạng và đề xuất phương án' },
              { step: 3, title: 'Thực hiện an toàn', desc: 'Tiến hành thủ thuật với công nghệ hiện đại, êm ái' },
              { step: 4, title: 'Chăm sóc tận tâm', desc: 'Hướng dẫn chăm sóc và theo dõi sau thủ thuật' },
            ].map((item) => (
              <div key={item.step} className="relative text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tự tin tận hưởng cuộc sống
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Đặt lịch tư vấn kín đáo với bác sĩ nữ chuyên khoa ngay hôm nay
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/lien-he"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-pink-600 font-bold rounded-full hover:shadow-xl transition-all duration-300"
            >
              Đặt lịch tư vấn kín đáo
            </Link>
            <a
              href={`tel:${phoneClean}`}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Hotline: {phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
