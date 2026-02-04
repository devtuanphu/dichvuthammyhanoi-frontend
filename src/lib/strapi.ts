const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
}

export interface SEO {
  metaTitle: string;
  metaDescription: string;
  metaImage?: StrapiImage;
  keywords?: string;
}

export interface Service {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  price?: string;
  duration?: string;
  features?: string[];
  technology?: string;
  image?: StrapiImage;
  seo?: SEO;
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  category?: string;
  author?: string;
  readTime?: number;
  image?: StrapiImage;
  publishedAt?: string;
  seo?: SEO;
}

export interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  position?: string;
  bio?: string;
  experience?: string;
  specialty?: string;
  image?: StrapiImage;
}

export interface Homepage {
  heroTitle: string;
  heroSubtitle?: string;
  heroImage?: StrapiImage;
  ctaText?: string;
  ctaLink?: string;
  featuredServices?: Service[];
  seo?: SEO;
}

export interface About {
  title: string;
  content?: string;
  image?: StrapiImage;
  mission?: string;
  vision?: string;
  seo?: SEO;
}

export interface Contact {
  title: string;
  address?: string;
  phone?: string;
  email?: string;
  mapEmbed?: string;
  workingHours?: string;
  seo?: SEO;
}

export interface SiteSettings {
  siteName: string;
  logo?: StrapiImage;
  phone?: string;
  email?: string;
  address?: string;
  facebook?: string;
  zalo?: string;
  instagram?: string;
  footerText?: string;
}

async function fetchAPI<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${STRAPI_URL}/api${path}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  // Add Authorization header if token is available
  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }
  
  const res = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
    next: { revalidate: 60 },
  });


  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }

  return res.json();
}

export function getStrapiImageUrl(image?: StrapiImage): string {
  if (!image?.url) return '/placeholder.jpg';
  if (image.url.startsWith('http')) return image.url;
  return `${STRAPI_URL}${image.url}`;
}

// API Functions
export async function getHomepage(): Promise<Homepage | null> {
  try {
    const res = await fetchAPI<StrapiResponse<Homepage>>('/homepage?populate=*');
    return res.data;
  } catch {
    return null;
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const res = await fetchAPI<StrapiResponse<Service[]>>('/services?populate=*&status=published');
    return res.data || [];
  } catch {
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const res = await fetchAPI<StrapiResponse<Service[]>>(`/services?filters[slug][$eq]=${slug}&populate=*&status=published`);
    return res.data?.[0] || null;
  } catch {
    return null;
  }
}

export async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetchAPI<StrapiResponse<Article[]>>('/articles?populate=*&status=published&sort=publishedAt:desc');
    return res.data || [];
  } catch {
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const res = await fetchAPI<StrapiResponse<Article[]>>(`/articles?filters[slug][$eq]=${slug}&populate=*&status=published`);
    return res.data?.[0] || null;
  } catch {
    return null;
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const res = await fetchAPI<StrapiResponse<TeamMember[]>>('/team-members?populate=*&status=published');
    return res.data || [];
  } catch {
    return [];
  }
}

export async function getAbout(): Promise<About | null> {
  try {
    const res = await fetchAPI<StrapiResponse<About>>('/about?populate=*');
    return res.data;
  } catch {
    return null;
  }
}

export async function getContact(): Promise<Contact | null> {
  try {
    const res = await fetchAPI<StrapiResponse<Contact>>('/contact?populate=*');
    return res.data;
  } catch {
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const res = await fetchAPI<StrapiResponse<SiteSettings>>('/site-setting?populate=*');
    return res.data;
  } catch {
    return null;
  }
}

export async function submitContactForm(data: {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
}): Promise<boolean> {
  try {
    await fetchAPI('/submissions', {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
    return true;
  } catch {
    return false;
  }
}
