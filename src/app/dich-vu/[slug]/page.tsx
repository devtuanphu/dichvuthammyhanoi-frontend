import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getServices, getStrapiImageUrl } from '@/lib/strapi';
import JsonLd from '@/components/JsonLd';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  
  if (!service) {
    return {
      title: 'Dịch vụ không tồn tại',
    };
  }

  const title = service.seo?.metaTitle || `${service.title} | Thẩm Mỹ Hà Nội`;
  const description = service.seo?.metaDescription || service.description || `Dịch vụ ${service.title} tại Thẩm Mỹ Hà Nội - 100% bác sĩ nữ, công nghệ hiện đại, bảo mật tuyệt đối.`;
  
  return {
    title,
    description,
    keywords: service.seo?.keywords || `${service.title}, thẩm mỹ vùng kín, bác sĩ nữ, hà nội`,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://thammyhanoi.vn/dich-vu/${slug}`,
      images: service.image ? [getStrapiImageUrl(service.image)] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://thammyhanoi.vn/dich-vu/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// Fallback service data
const fallbackServices: Record<string, { title: string; description: string; price: string; duration: string; content: string }> = {
  'tre-hoa-vung-kin-laser': {
    title: 'Trẻ hóa vùng kín bằng Laser',
    description: 'Công nghệ Laser CO2 Fractional tiên tiến từ Mỹ giúp kích thích tái tạo collagen, trẻ hóa và se khít vùng kín an toàn, hiệu quả.',
    price: 'Từ 5.000.000đ',
    duration: '30-45 phút',
    content: '<h2>Công nghệ Laser CO2 Fractional</h2><p>Laser CO2 Fractional là công nghệ tiên tiến nhất hiện nay trong việc trẻ hóa vùng kín. Laser tạo ra các vi điểm nhiệt giúp kích thích sản sinh collagen mới.</p><h3>Ưu điểm</h3><ul><li>Không xâm lấn, không đau</li><li>Hiệu quả sau 1-2 lần điều trị</li><li>Thời gian hồi phục nhanh</li></ul>',
  },
  'thu-hep-am-dao-hifu': {
    title: 'Thu hẹp âm đạo HIFU',
    description: 'Công nghệ HIFU không xâm lấn sử dụng sóng siêu âm hội tụ giúp se khít, tăng cường độ đàn hồi vùng kín hiệu quả.',
    price: 'Từ 8.000.000đ',
    duration: '45-60 phút',
    content: '<h2>Công nghệ HIFU Hàn Quốc</h2><p>HIFU (High-Intensity Focused Ultrasound) sử dụng sóng siêu âm cường độ cao để kích thích collagen tái tạo.</p><h3>Ưu điểm</h3><ul><li>Không đau, không nghỉ dưỡng</li><li>Kết quả lâu dài 12-18 tháng</li><li>An toàn tuyệt đối</li></ul>',
  },
  'lam-hong-vung-kin': {
    title: 'Làm hồng vùng kín',
    description: 'Sử dụng công nghệ Laser kết hợp tinh chất sinh học cao cấp giúp làm hồng, đều màu da vùng bikini và vùng kín.',
    price: 'Từ 3.000.000đ',
    duration: '30 phút',
    content: '<h2>Làm hồng vùng kín</h2><p>Công nghệ Laser kết hợp tinh chất sinh học giúp làm mờ thâm, đều màu da vùng nhạy cảm.</p>',
  },
};

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  
  // Fetch service from Strapi
  let service = await getServiceBySlug(slug);
  
  // Fallback to mock data if not found
  if (!service) {
    const fallback = fallbackServices[slug];
    if (!fallback) {
      notFound();
    }
    service = {
      id: 0,
      documentId: slug,
      slug,
      ...fallback,
    };
  }

  return (
    <>
      {/* JSON-LD for Service */}
      <JsonLd 
        type="Service" 
        data={{
          name: service.title,
          description: service.description,
          provider: {
            "@type": "MedicalBusiness",
            name: "Thẩm Mỹ Hà Nội",
          },
          offers: {
            "@type": "Offer",
            price: service.price,
            priceCurrency: "VND",
          },
        }} 
      />

      {/* Breadcrumb */}
      <div className="bg-pink-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-pink-600">Trang chủ</Link>
            <span className="mx-2">/</span>
            <Link href="/dich-vu" className="hover:text-pink-600">Dịch vụ</Link>
            <span className="mx-2">/</span>
            <span className="text-pink-600">{service.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-4">
                {service.duration && `⏱️ ${service.duration}`}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {service.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {service.description}
              </p>
              {service.features && (
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/lien-he"
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all text-center"
                >
                  Đặt lịch tư vấn kín đáo
                </Link>
                <a
                  href="tel:0123456789"
                  className="px-8 py-4 border-2 border-pink-500 text-pink-600 font-semibold rounded-full hover:bg-pink-50 transition-all text-center"
                >
                  Gọi: 0123 456 789
                </a>
              </div>
            </div>
            <div className="relative">
              {service.image ? (
                <img 
                  src={getStrapiImageUrl(service.image)} 
                  alt={service.title}
                  className="w-full aspect-[4/3] object-cover rounded-3xl shadow-2xl"
                />
              ) : (
                <div className="aspect-[4/3] bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200 rounded-3xl flex items-center justify-center shadow-2xl">
                  <div className="text-center text-white/60">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    <span>Hình ảnh dịch vụ</span>
                  </div>
                </div>
              )}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4">
                <p className="text-sm text-gray-500">Giá từ</p>
                <p className="text-2xl font-bold text-pink-600">{service.price}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      {service.content && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-pink-600"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          </div>
        </section>
      )}

      {/* Trust Section */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Tại sao chọn <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Thẩm Mỹ Hà Nội</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: '🩺', title: '100% Bác sĩ nữ', desc: 'Đội ngũ bác sĩ nữ chuyên khoa' },
              { icon: '🔒', title: 'Bảo mật tuyệt đối', desc: 'Thông tin được mã hóa an toàn' },
              { icon: '✨', title: 'Công nghệ hiện đại', desc: 'Thiết bị từ Mỹ - Hàn Quốc' },
              { icon: '💝', title: 'Chăm sóc tận tâm', desc: 'Theo dõi và hỗ trợ sau điều trị' },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Sẵn sàng trải nghiệm {service.title}?
          </h2>
          <p className="text-white/90 mb-8">
            Đặt lịch tư vấn kín đáo với bác sĩ nữ chuyên khoa ngay hôm nay
          </p>
          <Link
            href="/lien-he"
            className="inline-flex items-center px-8 py-4 bg-white text-pink-600 font-bold rounded-full hover:shadow-xl transition-all"
          >
            Đặt lịch tư vấn miễn phí
          </Link>
        </div>
      </section>
    </>
  );
}
