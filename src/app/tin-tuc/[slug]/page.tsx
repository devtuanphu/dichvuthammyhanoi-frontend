import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles, getStrapiImageUrl } from '@/lib/strapi';
import JsonLd from '@/components/JsonLd';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Bài viết không tồn tại',
    };
  }

  const title = article.seo?.metaTitle || `${article.title} | Thẩm Mỹ Hà Nội`;
  const description = article.seo?.metaDescription || article.excerpt || `Đọc bài viết ${article.title} tại Thẩm Mỹ Hà Nội`;
  
  return {
    title,
    description,
    keywords: article.seo?.keywords || `${article.title}, thẩm mỹ vùng kín, kiến thức`,
    authors: article.author ? [{ name: article.author }] : [{ name: 'Thẩm Mỹ Hà Nội' }],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://thammyhanoi.vn/tin-tuc/${slug}`,
      publishedTime: article.publishedAt,
      images: article.image ? [getStrapiImageUrl(article.image)] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://thammyhanoi.vn/tin-tuc/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Fallback articles
const fallbackArticles: Record<string, { title: string; excerpt: string; content: string; publishedAt: string; author: string }> = {
  'nhung-dieu-can-biet-ve-tre-hoa-vung-kin': {
    title: 'Những điều cần biết về trẻ hóa vùng kín bằng Laser',
    excerpt: 'Công nghệ Laser CO2 Fractional đang là xu hướng được nhiều chị em tin dùng. Hãy tìm hiểu kỹ trước khi quyết định.',
    author: 'BS. Nguyễn Thị An',
    publishedAt: '2024-01-15',
    content: `
      <p>Trẻ hóa vùng kín bằng Laser CO2 Fractional là phương pháp không xâm lấn, sử dụng năng lượng laser để kích thích sản sinh collagen và elastin, giúp cải thiện độ đàn hồi và săn chắc vùng kín.</p>
      
      <h2>Công nghệ Laser CO2 Fractional hoạt động như thế nào?</h2>
      <p>Laser tạo ra các vi điểm nhiệt trên bề mặt mô, kích thích quá trình tái tạo tự nhiên của cơ thể. Collagen mới được sản sinh giúp làm săn chắc và trẻ hóa mô.</p>
      
      <h2>Ai nên thực hiện?</h2>
      <ul>
        <li>Phụ nữ sau sinh muốn cải thiện độ săn chắc</li>
        <li>Phụ nữ có dấu hiệu lão hóa vùng kín</li>
        <li>Phụ nữ muốn cải thiện chất lượng cuộc sống</li>
      </ul>
      
      <h2>Quy trình điều trị</h2>
      <p>Quy trình điều trị hoàn toàn không đau, chỉ mất khoảng 15-30 phút. Hầu hết khách hàng có thể quay lại sinh hoạt bình thường ngay sau điều trị.</p>
    `,
  },
};

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  
  // Fetch article from Strapi
  let article = await getArticleBySlug(slug);
  
  // Fallback to mock data if not found
  if (!article) {
    const fallback = fallbackArticles[slug];
    if (!fallback) {
      notFound();
    }
    article = {
      id: 0,
      documentId: slug,
      slug,
      ...fallback,
    };
  }

  const publishDate = article.publishedAt 
    ? new Date(article.publishedAt).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <>
      {/* JSON-LD for Article */}
      <JsonLd 
        type="Article" 
        data={{
          headline: article.title,
          description: article.excerpt,
          datePublished: article.publishedAt,
          author: {
            "@type": "Person",
            name: article.author || "Thẩm Mỹ Hà Nội",
          },
          image: article.image ? getStrapiImageUrl(article.image) : undefined,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://thammyhanoi.vn/tin-tuc/${slug}`,
          },
        }} 
      />

      {/* Breadcrumb */}
      <div className="bg-pink-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-pink-600">Trang chủ</Link>
            <span className="mx-2">/</span>
            <Link href="/tin-tuc" className="hover:text-pink-600">Tin tức</Link>
            <span className="mx-2">/</span>
            <span className="text-pink-600 truncate max-w-[200px]">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Article */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              {publishDate && (
                <time dateTime={article.publishedAt}>{publishDate}</time>
              )}
              {article.author && (
                <>
                  <span>•</span>
                  <span>Bởi {article.author}</span>
                </>
              )}
              {article.readTime && (
                <>
                  <span>•</span>
                  <span>📖 {article.readTime} phút đọc</span>
                </>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed">{article.excerpt}</p>
            )}
          </header>

          {/* Featured Image */}
          {article.image ? (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={getStrapiImageUrl(article.image)} 
                alt={article.title}
                className="w-full aspect-video object-cover"
              />
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl mb-8 flex items-center justify-center">
              <span className="text-pink-300 text-lg">Hình ảnh bài viết</span>
            </div>
          )}

          {/* Content */}
          {article.content && (
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-pink-600 prose-li:text-gray-600 prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Chia sẻ bài viết:</p>
              <div className="flex gap-3">
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://thammyhanoi.vn/tin-tuc/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=https://thammyhanoi.vn/tin-tuc/${slug}&text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Bạn có thắc mắc về thẩm mỹ vùng kín?</h3>
            <p className="mb-6 text-white/90">Liên hệ với bác sĩ nữ chuyên khoa để được tư vấn miễn phí và kín đáo</p>
            <Link
              href="/lien-he"
              className="inline-block px-8 py-3 bg-white text-pink-600 font-bold rounded-full hover:shadow-xl transition-all"
            >
              Tư vấn miễn phí
            </Link>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Bài viết liên quan</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* These would be fetched from Strapi */}
            <Link href="/tin-tuc" className="block p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow">
              <p className="text-gray-600">Xem thêm bài viết →</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
