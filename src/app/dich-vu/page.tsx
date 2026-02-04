import Link from 'next/link';
import { Metadata } from 'next';
import { getServices, getStrapiImageUrl, Service } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Dịch vụ thẩm mỹ vùng kín | Thẩm Mỹ Hà Nội';
  const description = 'Dịch vụ thẩm mỹ vùng kín chuyên nghiệp tại Hà Nội: Trẻ hóa Laser, Thu hẹp HIFU, Làm hồng. 100% bác sĩ nữ chuyên khoa, công nghệ hiện đại, bảo mật tuyệt đối.';
  
  return {
    title,
    description,
    keywords: ['dịch vụ thẩm mỹ vùng kín', 'trẻ hóa laser', 'thu hẹp hifu', 'làm hồng vùng kín', 'bác sĩ nữ', 'thẩm mỹ hà nội'],
    openGraph: {
      title,
      description,
      url: 'https://thammyhanoi.vn/dich-vu',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: 'https://thammyhanoi.vn/dich-vu',
    },
  };
}

// Fallback services
const fallbackServices = [
  {
    id: 1,
    documentId: '1',
    title: 'Trẻ hóa vùng kín bằng Laser',
    slug: 'tre-hoa-vung-kin-laser',
    description: 'Công nghệ Laser CO2 Fractional tiên tiến từ Mỹ giúp kích thích tái tạo collagen, trẻ hóa và se khít vùng kín an toàn, hiệu quả.',
    price: 'Từ 5.000.000đ',
    features: ['Laser CO2 Fractional Mỹ', 'Không xâm lấn', 'Hiệu quả sau 1-2 lần'],
    duration: '30-45 phút',
  },
  {
    id: 2,
    documentId: '2',
    title: 'Thu hẹp âm đạo HIFU',
    slug: 'thu-hep-am-dao-hifu',
    description: 'Công nghệ HIFU không xâm lấn sử dụng sóng siêu âm hội tụ giúp se khít, tăng cường độ đàn hồi vùng kín hiệu quả.',
    price: 'Từ 8.000.000đ',
    features: ['Công nghệ HIFU Hàn Quốc', 'Không đau, không nghỉ dưỡng', 'Kết quả lâu dài'],
    duration: '45-60 phút',
  },
  {
    id: 3,
    documentId: '3',
    title: 'Làm hồng vùng kín',
    slug: 'lam-hong-vung-kin',
    description: 'Sử dụng công nghệ Laser kết hợp tinh chất sinh học cao cấp giúp làm hồng, đều màu da vùng bikini và vùng kín.',
    price: 'Từ 3.000.000đ',
    features: ['Laser + Sinh học', 'An toàn cho da nhạy cảm', 'Kết quả tự nhiên'],
    duration: '30 phút',
  },
  {
    id: 4,
    documentId: '4',
    title: 'Tạo hình môi bé',
    slug: 'tao-hinh-moi-be',
    description: 'Phẫu thuật thẩm mỹ chỉnh hình môi bé với kỹ thuật tiên tiến, giúp cải thiện thẩm mỹ và chức năng.',
    price: 'Từ 15.000.000đ',
    features: ['Bác sĩ nữ chuyên khoa', 'Kỹ thuật vi phẫu', 'Bảo hành trọn đời'],
    duration: '60-90 phút',
  },
  {
    id: 5,
    documentId: '5',
    title: 'Căng da vùng kín bằng chỉ',
    slug: 'cang-da-vung-kin-chi',
    description: 'Sử dụng chỉ sinh học tự tiêu giúp nâng đỡ, căng da vùng kín, mang lại vẻ trẻ trung tự nhiên.',
    price: 'Từ 10.000.000đ',
    features: ['Chỉ sinh học Hàn Quốc', 'Tự tiêu sau 6-12 tháng', 'Không để lại sẹo'],
    duration: '45 phút',
  },
  {
    id: 6,
    documentId: '6',
    title: 'Điều trị khô âm đạo',
    slug: 'dieu-tri-kho-am-dao',
    description: 'Liệu trình điều trị khô âm đạo bằng công nghệ Laser và liệu pháp hormone tại chỗ, cải thiện chất lượng cuộc sống.',
    price: 'Từ 4.000.000đ',
    features: ['Laser + Hormone', 'Cải thiện ngay', 'An toàn, không tác dụng phụ'],
    duration: '30 phút',
  },
];

const technologies = [
  { name: 'Laser CO2 Fractional', country: 'Mỹ', desc: 'Công nghệ laser tiên tiến nhất' },
  { name: 'HIFU Ultracel', country: 'Hàn Quốc', desc: 'Sóng siêu âm hội tụ' },
  { name: 'PRP Therapy', country: 'Châu Âu', desc: 'Liệu pháp huyết tương giàu tiểu cầu' },
  { name: 'Thermiva RF', country: 'Mỹ', desc: 'Sóng cao tần không xâm lấn' },
];

const process = [
  { step: 1, title: 'Đặt lịch kín đáo', desc: 'Đặt lịch qua hotline hoặc form, thông tin bảo mật' },
  { step: 2, title: 'Tư vấn riêng tư', desc: 'Gặp bác sĩ nữ trong phòng riêng biệt' },
  { step: 3, title: 'Thăm khám đánh giá', desc: 'Thăm khám kỹ lưỡng và đề xuất phương án' },
  { step: 4, title: 'Thực hiện thủ thuật', desc: 'Tiến hành với công nghệ hiện đại' },
  { step: 5, title: 'Chăm sóc sau', desc: 'Hướng dẫn và theo dõi kết quả' },
];

export default async function ServicesPage() {
  // Fetch services from Strapi, fallback to mock data
  let services: Service[] = await getServices();
  
  if (services.length === 0) {
    services = fallbackServices;
  }

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur text-pink-600 rounded-full text-sm font-medium mb-6 shadow-lg">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            100% Bảo mật thông tin
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Dịch vụ thẩm mỹ <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">vùng kín</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Các dịch vụ chuyên sâu được thực hiện bởi đội ngũ 100% bác sĩ nữ chuyên khoa, 
            công nghệ tiên tiến từ Mỹ - Hàn Quốc, cam kết bảo mật tuyệt đối
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/lien-he"
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full shadow-lg shadow-pink-500/30 hover:shadow-xl transition-all"
            >
              Đặt lịch tư vấn kín đáo
            </Link>
            <a
              href="tel:0123456789"
              className="px-8 py-4 bg-white text-pink-600 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Hotline: 0123 456 789
            </a>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: '🩺', text: '100% Bác sĩ nữ' },
              { icon: '🔒', text: 'Bảo mật tuyệt đối' },
              { icon: '🏥', text: 'Phòng VIP riêng biệt' },
              { icon: '✨', text: 'Công nghệ Mỹ - Hàn' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center gap-3">
                <span className="text-3xl">{item.icon}</span>
                <span className="font-medium text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dịch vụ <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">chuyên sâu</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mỗi dịch vụ được thực hiện trong không gian riêng tư, bởi bác sĩ nữ chuyên khoa
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/dich-vu/${service.slug}`}
                className="group"
              >
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:-translate-y-2 h-full border border-pink-100">
                  <div className="aspect-[16/10] bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200 relative">
                    {service.image ? (
                      <img 
                        src={getStrapiImageUrl(service.image)} 
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/30 backdrop-blur rounded-full flex items-center justify-center">
                          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full">
                      <span className="text-pink-600 font-bold text-sm">{service.price}</span>
                    </div>
                    {service.duration && (
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full">
                        <span className="text-gray-600 text-sm">⏱️ {service.duration}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    {service.features && (
                      <ul className="space-y-2 mb-4">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 text-green-500 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    <span className="inline-flex items-center text-pink-600 font-medium group-hover:translate-x-2 transition-transform">
                      Tìm hiểu thêm
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-pink-900 to-rose-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Công nghệ <span className="text-pink-400">tiên tiến</span>
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Chúng tôi sử dụng các công nghệ thẩm mỹ hiện đại nhất từ Mỹ, Hàn Quốc và Châu Âu
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-white/10 backdrop-blur rounded-3xl p-6 text-center hover:bg-white/15 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-1">{tech.name}</h3>
                <p className="text-pink-400 text-sm mb-2">{tech.country}</p>
                <p className="text-white/60 text-sm">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-4">
              Quy trình làm việc
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quy trình <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">kín đáo & chuyên nghiệp</span>
            </h2>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 -translate-y-1/2"></div>
            
            <div className="grid md:grid-cols-5 gap-8 relative">
              {process.map((item) => (
                <div key={item.step} className="text-center relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 shadow-lg relative z-10">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
                Cam kết bảo mật
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Sự riêng tư là <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">ưu tiên hàng đầu</span>
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Chúng tôi hiểu rằng thẩm mỹ vùng kín là dịch vụ nhạy cảm. Vì vậy, chúng tôi cam kết 
                mang đến sự riêng tư và bảo mật tuyệt đối cho khách hàng.
              </p>
              <ul className="space-y-4">
                {[
                  'Đội ngũ 100% bác sĩ nữ chuyên khoa',
                  'Mỗi khách hàng có phòng riêng VIP',
                  'Thông tin được mã hóa và bảo mật',
                  'Cam kết không tiết lộ cho bên thứ 3',
                  'Hồ sơ được lưu trữ an toàn',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-24 h-24 text-white/60 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/60">Bảo mật tuyệt đối</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tự tin tận hưởng cuộc sống
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Đặt lịch tư vấn kín đáo với bác sĩ nữ chuyên khoa ngay hôm nay
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/lien-he"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-pink-600 font-bold rounded-full hover:shadow-xl transition-all"
            >
              Đặt lịch tư vấn kín đáo
            </Link>
            <a
              href="tel:0123456789"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all"
            >
              Hotline: 0123 456 789
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
