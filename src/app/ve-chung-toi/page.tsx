import Link from 'next/link';
import { Metadata } from 'next';
import { getTeamMembers, getAbout, getStrapiImageUrl, TeamMember } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout();
  
  return {
    title: about?.seo?.metaTitle || 'Về chúng tôi | Thẩm Mỹ Hà Nội',
    description: about?.seo?.metaDescription || 'Thẩm Mỹ Hà Nội - Chuyên gia thẩm mỹ vùng kín hàng đầu với đội ngũ 100% bác sĩ nữ, công nghệ hiện đại, bảo mật tuyệt đối.',
    keywords: about?.seo?.keywords,
    openGraph: {
      title: about?.seo?.metaTitle || 'Về chúng tôi | Thẩm Mỹ Hà Nội',
      description: about?.seo?.metaDescription || 'Thẩm Mỹ Hà Nội - Chuyên gia thẩm mỹ vùng kín hàng đầu.',
      url: 'https://dichvuthammyhanoi.com/ve-chung-toi',
      images: about?.seo?.metaImage ? [getStrapiImageUrl(about.seo.metaImage)] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: about?.seo?.metaTitle || 'Về chúng tôi | Thẩm Mỹ Hà Nội',
      description: about?.seo?.metaDescription || 'Thẩm Mỹ Hà Nội - Chuyên gia thẩm mỹ vùng kín hàng đầu.',
    },
    alternates: {
      canonical: 'https://dichvuthammyhanoi.com/ve-chung-toi',
    },
  };
}

const fallbackTeam: TeamMember[] = [
  { id: 1, documentId: '1', name: 'BS. Nguyễn Thị An', position: 'Giám đốc chuyên môn', experience: '15 năm kinh nghiệm', specialty: 'Phẫu thuật thẩm mỹ phụ khoa' },
  { id: 2, documentId: '2', name: 'BS. Trần Thị Bình', position: 'Trưởng khoa', experience: '12 năm kinh nghiệm', specialty: 'Laser & công nghệ cao' },
  { id: 3, documentId: '3', name: 'BS. Lê Thị Cúc', position: 'Bác sĩ chuyên khoa', experience: '10 năm kinh nghiệm', specialty: 'Trẻ hóa vùng kín' },
  { id: 4, documentId: '4', name: 'BS. Phạm Thị Dung', position: 'Bác sĩ chuyên khoa', experience: '8 năm kinh nghiệm', specialty: 'Điều trị rối loạn chức năng' },
];

const milestones = [
  { year: '2014', title: 'Thành lập', desc: 'Ra đời với sứ mệnh chăm sóc sức khỏe phụ nữ' },
  { year: '2016', title: 'Chuyên sâu', desc: 'Tập trung phát triển mảng thẩm mỹ vùng kín' },
  { year: '2018', title: 'Công nghệ', desc: 'Đầu tư thiết bị Laser từ Mỹ, HIFU từ Hàn Quốc' },
  { year: '2020', title: 'Mở rộng', desc: 'Khai trương cơ sở mới với phòng VIP riêng biệt' },
  { year: '2024', title: 'Phát triển', desc: 'Đã phục vụ hơn 5000+ khách hàng hài lòng' },
];

const values = [
  { icon: '🩺', title: '100% Bác sĩ nữ', desc: 'Đội ngũ toàn bác sĩ nữ chuyên khoa, giúp khách hàng thoải mái hơn' },
  { icon: '🔒', title: 'Bảo mật tuyệt đối', desc: 'Thông tin khách hàng được bảo mật nghiêm ngặt theo tiêu chuẩn' },
  { icon: '💝', title: 'Tận tâm', desc: 'Luôn lắng nghe và thấu hiểu nhu cầu của từng khách hàng' },
  { icon: '✨', title: 'Chất lượng', desc: 'Cam kết sử dụng công nghệ và vật liệu cao cấp nhất' },
];

export default async function AboutPage() {
  const [teamMembers, aboutData] = await Promise.all([
    getTeamMembers(),
    getAbout(),
  ]);

  const team = teamMembers.length > 0 ? teamMembers : fallbackTeam;

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-white/80 backdrop-blur text-pink-600 rounded-full text-sm font-medium mb-4 shadow">
                Về Thẩm Mỹ Hà Nội
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Chuyên gia thẩm mỹ <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">vùng kín</span> hàng đầu
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {aboutData?.content ? (
                  <span dangerouslySetInnerHTML={{ __html: aboutData.content.replace(/<[^>]*>/g, '') }} />
                ) : (
                  'Với hơn 10 năm kinh nghiệm chuyên sâu trong lĩnh vực thẩm mỹ vùng kín, chúng tôi tự hào là địa chỉ uy tín được hàng nghìn phụ nữ tin tưởng lựa chọn. Đội ngũ 100% bác sĩ nữ chuyên khoa, công nghệ hiện đại và cam kết bảo mật tuyệt đối.'
                )}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { number: '10+', label: 'Năm kinh nghiệm' },
                  { number: '100%', label: 'Bác sĩ nữ' },
                  { number: '5000+', label: 'Khách hàng' },
                  { number: '98%', label: 'Hài lòng' },
                ].map((stat, index) => (
                  <div key={index} className="text-center bg-white/60 backdrop-blur rounded-2xl p-4">
                    <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">{stat.number}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200 rounded-3xl flex items-center justify-center shadow-2xl">
                <div className="text-center text-white/60">
                  <svg className="w-20 h-20 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>Hình ảnh cơ sở</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Top 10</p>
                  <p className="text-sm text-gray-500">Thẩm mỹ uy tín</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Giá trị <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">cốt lõi</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những cam kết không thay đổi của chúng tôi với mỗi khách hàng
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((item, index) => (
              <div key={index} className="text-center p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 hover:shadow-xl transition-all group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
                🎯
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Sứ mệnh</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {aboutData?.mission || 'Mang đến sự tự tin và hạnh phúc cho phụ nữ Việt Nam thông qua các dịch vụ thẩm mỹ vùng kín chất lượng cao, an toàn và bảo mật.'}
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  Chăm sóc sức khỏe sinh sản và thẩm mỹ cho phụ nữ
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  Mang lại sự tự tin trong đời sống vợ chồng
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  Nâng cao chất lượng cuộc sống cho phụ nữ
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
                ⭐
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Tầm nhìn</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {aboutData?.vision || 'Trở thành địa chỉ thẩm mỹ vùng kín uy tín và được tin tưởng nhất Việt Nam, với chất lượng dịch vụ đạt chuẩn quốc tế.'}
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Cập nhật công nghệ thẩm mỹ mới nhất thế giới
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Đào tạo đội ngũ bác sĩ nữ chất lượng cao
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Xây dựng chuẩn mực về bảo mật thông tin
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-4">
              Hành trình phát triển
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cột mốc <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">quan trọng</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-pink-300 to-purple-300 hidden md:block"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 inline-block shadow-lg">
                      <span className="text-pink-600 font-bold text-lg">{milestone.year}</span>
                      <h3 className="text-xl font-semibold text-gray-900 mt-1">{milestone.title}</h3>
                      <p className="text-gray-600 mt-2">{milestone.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full text-white font-bold z-10 shadow-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-4">
              Đội ngũ bác sĩ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              100% <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Bác sĩ nữ</span> chuyên khoa
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Đội ngũ bác sĩ nữ giàu kinh nghiệm, được đào tạo chuyên sâu về thẩm mỹ vùng kín
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.id} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center group">
                {member.image ? (
                  <img 
                    src={getStrapiImageUrl(member.image)} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold group-hover:scale-110 transition-transform">
                    {member.name.charAt(4)}
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-pink-600 font-medium mb-2">{member.position}</p>
                <p className="text-sm text-gray-500 mb-1">{member.experience}</p>
                <p className="text-sm text-gray-400">{member.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-pink-900 to-rose-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur rounded-full mb-6">
              <svg className="w-10 h-10 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cam kết <span className="text-pink-400">bảo mật</span>
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Sự riêng tư của bạn là ưu tiên hàng đầu của chúng tôi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🔐', title: 'Mã hóa thông tin', desc: 'Mọi dữ liệu khách hàng được mã hóa theo chuẩn quốc tế' },
              { icon: '🚪', title: 'Phòng riêng VIP', desc: 'Mỗi khách có phòng riêng, không gian hoàn toàn độc lập' },
              { icon: '📋', title: 'Không tiết lộ', desc: 'Cam kết tuyệt đối không tiết lộ thông tin cho bên thứ 3' },
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur rounded-3xl p-8 text-center hover:bg-white/15 transition-colors">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Hãy để chúng tôi đồng hành cùng bạn
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Đặt lịch tư vấn kín đáo với bác sĩ nữ chuyên khoa
          </p>
          <Link
            href="/lien-he"
            className="inline-flex items-center px-8 py-4 bg-white text-pink-600 font-bold rounded-full hover:shadow-xl transition-all"
          >
            Đặt lịch ngay
          </Link>
        </div>
      </section>
    </>
  );
}
