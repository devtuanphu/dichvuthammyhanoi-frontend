'use client';

interface JsonLdProps {
  type: 'LocalBusiness' | 'MedicalBusiness' | 'Service' | 'Article';
  data?: Record<string, unknown>;
}

export default function JsonLd({ type, data }: JsonLdProps) {
  const baseOrganization = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Thẩm Mỹ Hà Nội",
    "description": "Dịch vụ thẩm mỹ vùng kín chuyên nghiệp tại Hà Nội. Đội ngũ 100% bác sĩ nữ chuyên khoa, công nghệ hiện đại, bảo mật tuyệt đối.",
    "url": "https://dichvuthammyhanoi.com",
    "telephone": "+84123456789",
    "email": "info@dichvuthammyhanoi.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Đường ABC",
      "addressLocality": "Quận Hoàn Kiếm",
      "addressRegion": "Hà Nội",
      "postalCode": "100000",
      "addressCountry": "VN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "21.0285",
      "longitude": "105.8542"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "20:00"
      }
    ],
    "priceRange": "$$",
    "medicalSpecialty": "Gynecologic",
    "availableService": [
      {
        "@type": "MedicalProcedure",
        "name": "Trẻ hóa vùng kín bằng Laser",
        "description": "Công nghệ Laser CO2 Fractional tiên tiến giúp trẻ hóa và se khít vùng kín"
      },
      {
        "@type": "MedicalProcedure", 
        "name": "Thu hẹp âm đạo HIFU",
        "description": "Công nghệ HIFU không xâm lấn giúp se khít, tăng cường độ đàn hồi"
      },
      {
        "@type": "MedicalProcedure",
        "name": "Làm hồng vùng kín",
        "description": "Công nghệ Laser kết hợp tinh chất sinh học giúp làm hồng, đều màu da"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500",
      "bestRating": "5"
    }
  };

  let jsonLdData;
  
  switch (type) {
    case 'LocalBusiness':
    case 'MedicalBusiness':
      jsonLdData = baseOrganization;
      break;
    case 'Service':
      jsonLdData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "provider": {
          "@type": "MedicalBusiness",
          "name": "Thẩm Mỹ Hà Nội"
        },
        ...data
      };
      break;
    case 'Article':
      jsonLdData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "publisher": {
          "@type": "Organization",
          "name": "Thẩm Mỹ Hà Nội",
          "url": "https://dichvuthammyhanoi.com"
        },
        ...data
      };
      break;
    default:
      jsonLdData = baseOrganization;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
