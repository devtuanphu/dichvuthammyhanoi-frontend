import { Metadata } from 'next';
import { getContact, getSiteSettings, getStrapiImageUrl } from '@/lib/strapi';
import ContactForm from '@/components/ContactForm';

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContact();
  
  return {
    title: contact?.seo?.metaTitle || 'Liên hệ tư vấn kín đáo | Thẩm Mỹ Hà Nội',
    description: contact?.seo?.metaDescription || 'Liên hệ với Thẩm Mỹ Hà Nội để được tư vấn miễn phí và kín đáo. Đội ngũ bác sĩ nữ chuyên khoa luôn sẵn sàng hỗ trợ.',
    keywords: contact?.seo?.keywords,
    openGraph: {
      title: contact?.seo?.metaTitle || 'Liên hệ tư vấn kín đáo | Thẩm Mỹ Hà Nội',
      description: contact?.seo?.metaDescription || 'Liên hệ với Thẩm Mỹ Hà Nội để được tư vấn miễn phí và kín đáo.',
      url: 'https://dichvuthammyhanoi.com/lien-he',
      images: contact?.seo?.metaImage ? [getStrapiImageUrl(contact.seo.metaImage)] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: contact?.seo?.metaTitle || 'Liên hệ tư vấn kín đáo | Thẩm Mỹ Hà Nội',
      description: contact?.seo?.metaDescription || 'Liên hệ với Thẩm Mỹ Hà Nội để được tư vấn miễn phí và kín đáo.',
    },
    alternates: {
      canonical: 'https://dichvuthammyhanoi.com/lien-he',
    },
  };
}

const faqs = [
  {
    question: 'Thông tin của tôi có được bảo mật không?',
    answer: 'Hoàn toàn bảo mật. Mọi thông tin cá nhân được mã hóa và lưu trữ an toàn theo tiêu chuẩn quốc tế. Chúng tôi cam kết không tiết lộ cho bất kỳ bên thứ 3 nào.',
  },
  {
    question: 'Tôi có được bác sĩ nữ tư vấn không?',
    answer: 'Có, tất cả dịch vụ đều được thực hiện bởi đội ngũ 100% bác sĩ nữ chuyên khoa. Bạn sẽ được tư vấn trong phòng riêng VIP.',
  },
  {
    question: 'Sau thủ thuật có cần nghỉ dưỡng lâu không?',
    answer: 'Phần lớn các thủ thuật của chúng tôi sử dụng công nghệ không xâm lấn, thời gian hồi phục ngắn. Nhiều dịch vụ có thể trở lại sinh hoạt bình thường ngay sau đó.',
  },
  {
    question: 'Tôi có thể thanh toán như thế nào?',
    answer: 'Chúng tôi chấp nhận thanh toán tiền mặt, chuyển khoản ngân hàng, và các hình thức trả góp 0% lãi suất qua thẻ tín dụng.',
  },
];

export default async function ContactPage() {
  const [contactData, siteSettings] = await Promise.all([
    getContact(),
    getSiteSettings(),
  ]);

  // Prioritize site-setting data over contact data
  const phone = siteSettings?.phone || contactData?.phone || '0123 456 789';
  const email = siteSettings?.email || contactData?.email || 'info@dichvuthammyhanoi.com';
  const address = siteSettings?.address || contactData?.address || '123 Đường ABC, Quận Hoàn Kiếm, Hà Nội';
  const workingHours = contactData?.workingHours || 'Thứ 2 - Chủ nhật: 8:00 - 20:00';

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-3 mb-6">
            {[
              { icon: '🔒', text: 'Bảo mật' },
              { icon: '🩺', text: 'Bác sĩ nữ' },
              { icon: '🏥', text: 'Phòng VIP' },
            ].map((item, index) => (
              <span key={index} className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur text-gray-700 rounded-full text-sm font-medium shadow">
                <span>{item.icon}</span>
                {item.text}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Liên hệ <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">tư vấn kín đáo</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Đội ngũ tư vấn viên nữ sẵn sàng hỗ trợ bạn 24/7. 
            Mọi thông tin đều được bảo mật tuyệt đối.
          </p>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <a 
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="flex items-center gap-6 p-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-3xl shadow-lg hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center shrink-0">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">Hotline tư vấn (24/7)</p>
                <p className="text-2xl font-bold group-hover:underline">{phone}</p>
              </div>
            </a>

            <a 
              href="https://zalo.me/0123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-3xl shadow-lg hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center shrink-0">
                <span className="text-2xl font-bold">Zalo</span>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">Nhắn tin qua Zalo</p>
                <p className="text-2xl font-bold group-hover:underline">Chat ngay</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Đặt lịch tư vấn <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">miễn phí</span>
                </h2>
                <p className="text-gray-600">
                  Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại trong vòng 30 phút.
                </p>
              </div>

              <ContactForm />

              <div className="mt-6 flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-green-800 font-medium">Cam kết bảo mật 100%</p>
                  <p className="text-sm text-green-700">Thông tin của bạn được mã hóa và không chia sẻ với bên thứ 3</p>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-8">
              {/* Contact Info */}
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Thông tin liên hệ</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Địa chỉ</p>
                      <p className="text-gray-900 font-medium">{address}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Điện thoại</p>
                      <p className="text-gray-900 font-medium">{phone}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900 font-medium">{email}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Giờ làm việc</p>
                      <p className="text-gray-900 font-medium">{workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
                <div className="aspect-[4/3] bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-pink-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-pink-400">Bản đồ sẽ hiển thị ở đây</span>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Kết nối với chúng tôi</h3>
                <div className="flex gap-3">
                  {[
                    { name: 'Facebook', color: 'from-blue-500 to-blue-600' },
                    { name: 'Zalo', color: 'from-blue-400 to-blue-500' },
                    { name: 'Instagram', color: 'from-pink-500 to-purple-500' },
                    { name: 'Youtube', color: 'from-red-500 to-red-600' },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center text-white font-bold text-xs hover:opacity-90 transition-opacity`}
                    >
                      {social.name.charAt(0)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-4">
              Câu hỏi thường gặp
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Giải đáp <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">thắc mắc</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <svg className="w-5 h-5 text-pink-500 shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Còn băn khoăn?</h2>
          <p className="text-white/90 mb-8">
            Gọi ngay hotline để được tư vấn trực tiếp với bác sĩ nữ chuyên khoa
          </p>
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="inline-flex items-center px-8 py-4 bg-white text-pink-600 font-bold rounded-full hover:shadow-xl transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Gọi ngay: {phone}
          </a>
        </div>
      </section>
    </>
  );
}
