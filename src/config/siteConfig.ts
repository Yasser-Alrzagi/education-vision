/**
 * Official Site Configuration for رؤية التعليم | Education Visio
 * Official sources and verified contact links only.
 */

export const SITE_CONFIG = {
  brandNameAr: 'رؤية التعليم',
  brandNameEn: 'Education Vision',
  brandFullName: 'رؤية التعليم | Education Vision',
  brandSubtitle: 'خدمات الطلاب والأكاديمية',
  logoPath: '/assets/images/brand_logo_education_vision_1791033694890.jpg',
  
  // Official domains
  shortDomain: 'educationvision.com',
  shortDomainUrl: 'https://educationvision.com',
  officialStoreDomain: 'educationvision.b3na.com',
  officialStoreUrl: 'https://educationvision.b3na.com/',
  officialBioLink: 'https://rbt.bio/educationvisiogmailcom',
  
  // Contact details
  phoneRaw: '+966541867974',
  whatsappNumber: '966541867974',
  whatsappUrl: 'https://wa.me/966541867974',
  
  // Social media official links
  social: {
    instagram: 'https://www.instagram.com/educ.ationvision/',
    snapchat: 'https://www.snapchat.com/add/education_visio',
    tiktok: 'https://www.tiktok.com/@education_vision_1',
  },
  
  // Standard WhatsApp prefilled messages
  messages: {
    newOrder: 'السلام عليكم، أود الاستفسار وطلب خدمة من منصة رؤية التعليم.',
    trackOrder: 'السلام عليكم، أريد متابعة حالة طلبي في رؤية التعليم.',
    generalInquiry: 'السلام عليكم ورحمة الله وبركاته، أود معرفة تفاصيل أكثر عن خدماتكم الطلابية والأكاديمية.',
  },
  
  // Theme colors
  colors: {
    gold: '#C58A24',
    goldLight: '#E6C27A',
    navy: '#102235',
    navyDark: '#0D1B2A',
    cream: '#FAF8F3',
    white: '#FFFFFF',
    whatsappGreen: '#25D366',
  }
};

export const getWhatsAppLinkWithMessage = (message: string): string => {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
};
