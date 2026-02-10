import Link from 'next/link';
import { Metadata } from 'next';
import { getArticles, getSiteSettings, getStrapiImageUrl, Article } from '@/lib/strapi';
import { SITE_URL } from '@/lib/constants';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings?.siteName || 'Thẩm Mỹ Hà Nội';
  const title = `Tin tức & Kiến thức sức khỏe phụ nữ | ${siteName}`;
  const description = 'Cập nhật tin tức, kiến thức về chăm sóc sức khỏe phụ nữ và thẩm mỹ vùng kín từ các bác sĩ chuyên khoa. Tư vấn miễn phí, bảo mật tuyệt đối.';
  
  return {
    title,
    description,
    keywords: ['tin tức thẩm mỹ', 'kiến thức sức khỏe phụ nữ', 'thẩm mỹ vùng kín', 'bác sĩ tư vấn', siteName.toLowerCase()],
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/tin-tuc`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/tin-tuc`,
    },
  };
}

const fallbackArticles: Article[] = [
  {
    id: 1,
    documentId: '1',
    title: 'Những điều cần biết về trẻ hóa vùng kín bằng Laser',
    slug: 'tre-hoa-vung-kin-bang-laser',
    excerpt: 'Công nghệ Laser CO2 Fractional đang trở thành giải pháp được nhiều chị em lựa chọn để cải thiện chất lượng cuộc sống.',
    publishedAt: '2024-01-20',
    category: 'Kiến thức',
  },
  {
    id: 2,
    documentId: '2',
    title: 'Sau sinh có nên thu hẹp âm đạo không?',
    slug: 'sau-sinh-thu-hep-am-dao',
    excerpt: 'Giải đáp thắc mắc của nhiều chị em về thời điểm phù hợp để thực hiện thu hẹp âm đạo sau sinh.',
    publishedAt: '2024-01-15',
    category: 'Hỏi đáp',
  },
  {
    id: 3,
    documentId: '3',
    title: 'Phân biệt các phương pháp làm hồng vùng kín',
    slug: 'phan-biet-phuong-phap-lam-hong',
    excerpt: 'So sánh chi tiết giữa công nghệ Laser, tinh chất sinh học và các phương pháp làm hồng vùng kín phổ biến.',
    publishedAt: '2024-01-10',
    category: 'Kiến thức',
  },
  {
    id: 4,
    documentId: '4',
    title: 'Chăm sóc vùng kín đúng cách sau thủ thuật',
    slug: 'cham-soc-sau-thu-thuat',
    excerpt: 'Hướng dẫn chi tiết cách chăm sóc vùng kín sau khi thực hiện các thủ thuật thẩm mỹ.',
    publishedAt: '2024-01-05',
    category: 'Hướng dẫn',
  },
  {
    id: 5,
    documentId: '5',
    title: 'Công nghệ HIFU trong trẻ hóa vùng kín',
    slug: 'cong-nghe-hifu-tre-hoa',
    excerpt: 'Tìm hiểu về công nghệ HIFU không xâm lấn và những lợi ích mà nó mang lại.',
    publishedAt: '2024-01-01',
    category: 'Công nghệ',
  },
];

const popularTags = ['Trẻ hóa', 'Laser', 'HIFU', 'Thu hẹp', 'Làm hồng', 'Sau sinh'];

// Helper function to calculate categories from articles
function getCategoriesFromArticles(articles: Article[]) {
  const categoryCount: Record<string, number> = {};
  
  articles.forEach(article => {
    const cat = article.category || 'Tin tức';
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  });
  
  const categories = Object.entries(categoryCount).map(([name, count]) => ({
    name,
    count,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
  }));
  
  // Add "Tất cả" at the beginning
  return [
    { name: 'Tất cả', count: articles.length, slug: '' },
    ...categories.sort((a, b) => b.count - a.count),
  ];
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const selectedCategory = params.category || '';
  
  let articles = await getArticles();
  
  if (articles.length === 0) {
    articles = fallbackArticles;
  }
  
  // Calculate categories from all articles
  const categories = getCategoriesFromArticles(articles);
  
  // Filter articles by category if selected
  const filteredArticles = selectedCategory
    ? articles.filter(a => (a.category || 'Tin tức').toLowerCase().replace(/\s+/g, '-') === selectedCategory)
    : articles;

  const featuredArticle = filteredArticles[0];
  const otherArticles = filteredArticles.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/80 backdrop-blur text-pink-600 rounded-full text-sm font-medium mb-4 shadow">
            Tin tức & Kiến thức
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Kiến thức <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">sức khỏe phụ nữ</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cập nhật những thông tin hữu ích về chăm sóc sức khỏe vùng kín và các dịch vụ thẩm mỹ 
            từ đội ngũ bác sĩ chuyên khoa
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href={`/tin-tuc/${featuredArticle.slug}`} className="block group">
              <div className="grid lg:grid-cols-2 gap-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-[16/10] lg:aspect-auto bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200 flex items-center justify-center min-h-[300px]">
                  {featuredArticle.image ? (
                    <img 
                      src={getStrapiImageUrl(featuredArticle.image)} 
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg className="w-20 h-20 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="p-8 lg:py-12 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 bg-pink-500 text-white text-sm font-medium rounded-full w-fit mb-4">
                    {featuredArticle.category || 'Kiến thức'}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <time className="text-sm text-gray-400">
                      {featuredArticle.publishedAt ? new Date(featuredArticle.publishedAt).toLocaleDateString('vi-VN') : ''}
                    </time>
                    <span className="inline-flex items-center text-pink-600 font-medium group-hover:translate-x-2 transition-transform">
                      Đọc thêm →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Articles Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Bài viết mới</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {otherArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/tin-tuc/${article.slug}`}
                    className="group"
                  >
                    <article className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:-translate-y-1 h-full border border-pink-50">
                      <div className="aspect-[16/9] bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 relative">
                        {article.image ? (
                          <img 
                            src={getStrapiImageUrl(article.image)} 
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-12 h-12 text-pink-300" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                        <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur text-pink-600 text-xs font-medium rounded-full">
                          {article.category || 'Tin tức'}
                        </span>
                      </div>
                      <div className="p-6">
                        <time className="text-sm text-gray-400">
                          {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('vi-VN') : ''}
                        </time>
                        <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-3 group-hover:text-pink-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {article.excerpt}
                        </p>
                        <span className="inline-flex items-center text-pink-600 text-sm font-medium group-hover:translate-x-2 transition-transform">
                          Đọc thêm →
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12 gap-2">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 rounded-full font-medium ${
                      page === 1
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-600 shadow'
                    } transition-colors`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Search */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Tìm kiếm</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm bài viết..."
                    className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Danh mục</h3>
                <ul className="space-y-3">
                  {categories.map((cat) => (
                    <li key={cat.name}>
                      <Link 
                        href={cat.slug ? `/tin-tuc?category=${cat.slug}` : '/tin-tuc'}
                        className={`flex items-center justify-between transition-colors ${
                          selectedCategory === cat.slug 
                            ? 'text-pink-600 font-medium' 
                            : 'text-gray-600 hover:text-pink-600'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          selectedCategory === cat.slug 
                            ? 'bg-pink-600 text-white' 
                            : 'bg-pink-50 text-pink-600'
                        }`}>{cat.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Tags phổ biến</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <a
                      key={tag}
                      href="#"
                      className="px-3 py-1 bg-gradient-to-r from-pink-50 to-purple-50 text-pink-600 text-sm rounded-full hover:from-pink-100 hover:to-purple-100 transition-colors"
                    >
                      #{tag}
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-purple-500 rounded-3xl p-6 text-white">
                <div className="text-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Đăng ký nhận tin</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Nhận kiến thức chăm sóc sức khỏe và ưu đãi
                  </p>
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/60 text-white border border-white/30 focus:bg-white/30 outline-none mb-3"
                  />
                  <button className="w-full py-3 bg-white text-pink-600 font-semibold rounded-xl hover:shadow-lg transition-all">
                    Đăng ký
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Có thắc mắc cần giải đáp?</h2>
          <p className="text-white/90 mb-8">
            Đặt lịch tư vấn kín đáo với bác sĩ nữ chuyên khoa để được giải đáp mọi thắc mắc
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
