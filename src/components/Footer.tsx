import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Trang chủ' },
  { href: '/dich-vu', label: 'Dịch vụ' },
  { href: '/ve-chung-toi', label: 'Về chúng tôi' },
  { href: '/tin-tuc', label: 'Tin tức' },
  { href: '/lien-he', label: 'Liên hệ' },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Sẵn sàng trở nên xinh đẹp hơn?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng tư vấn và đồng hành cùng bạn
          </p>
          <Link
            href="/lien-he"
            className="inline-block px-8 py-3 bg-white text-pink-600 font-bold rounded-full hover:shadow-xl transition-all duration-300"
          >
            Đặt lịch tư vấn miễn phí
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Image
                src="/logo-hanoi.png"
                alt="Thẩm Mỹ Hà Nội"
                width={40}
                height={40}
                className="w-auto h-10"
              />
              <span className="text-xl font-bold">Thẩm Mỹ Hà Nội</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Chúng tôi cam kết mang đến cho bạn những dịch vụ thẩm mỹ chất lượng cao với đội ngũ bác sĩ giàu kinh nghiệm.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Liên kết nhanh</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-pink-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Dịch vụ</h4>
            <ul className="space-y-3 text-gray-400">
              <li>Nâng mũi Hàn Quốc</li>
              <li>Cắt mí mắt</li>
              <li>Tiêm filler</li>
              <li>Trẻ hóa da</li>
              <li>Hút mỡ bụng</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Liên hệ</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 mt-1 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>123 Đường ABC, Quận Hoàn Kiếm, Hà Nội</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>0123 456 789</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>info@thammyhanoi.vn</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
          <p>© 2024 Thẩm Mỹ Hà Nội. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-pink-400 transition-colors">Facebook</a>
            <a href="#" className="hover:text-pink-400 transition-colors">Instagram</a>
            <a href="#" className="hover:text-pink-400 transition-colors">Zalo</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
