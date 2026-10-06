import { ServiceItem } from '../types';

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'data-analysis',
    title: 'إدخال وتحليل البيانات',
    subtitle: 'Excel / SPSS / R',
    iconName: 'BarChart3',
    category: 'data_tech',
    productId: 'prod-data-analysis'
  },
  {
    id: 'word-formatting',
    title: 'تنسيق الأبحاث',
    subtitle: 'وملفات Word',
    iconName: 'FileText',
    category: 'academic_services',
    productId: 'prod-word-formatting'
  },
  {
    id: 'translation',
    title: 'ترجمة أكاديمية',
    subtitle: 'معتمدة وتدقيق',
    iconName: 'Languages',
    category: 'translation_editing',
    productId: 'prod-translation'
  },
  {
    id: 'research',
    title: 'إعداد بحوث وتقارير',
    subtitle: 'أكاديمية',
    iconName: 'GraduationCap',
    category: 'research_reports',
    productId: 'prod-research'
  },
  {
    id: 'presentations',
    title: 'تصميم عروض',
    subtitle: 'بوربوينت احترافية',
    iconName: 'Presentation',
    category: 'presentations_design',
    productId: 'prod-presentations'
  },
  {
    id: 'book-summary',
    title: 'تلخيص الكتب',
    subtitle: 'والمقررات',
    iconName: 'BookOpen',
    category: 'academic_services',
    productId: 'prod-book-summary'
  },
  {
    id: 'resume',
    title: 'تصميم سيرة ذاتية',
    subtitle: 'احترافية ATS',
    iconName: 'FileBadge',
    category: 'translation_editing',
    productId: 'prod-ats-resume'
  },
  {
    id: 'web-dev',
    title: 'تصميم مواقع إلكترونية',
    subtitle: 'ومتاجر',
    iconName: 'Globe',
    category: 'data_tech',
    productId: 'prod-website-dev'
  },
  {
    id: 'study-plans',
    title: 'إعداد خطط دراسية',
    subtitle: 'وجداول متابعة',
    iconName: 'CalendarCheck',
    category: 'academic_services',
    productId: 'prod-exams'
  },
  {
    id: 'transcription',
    title: 'تحويل الصوت والفيديو',
    subtitle: 'إلى نصوص',
    iconName: 'Mic',
    category: 'academic_services',
    productId: 'prod-audio-transcription'
  },
  {
    id: 'book-design',
    title: 'تصميم كتب ومجلات',
    subtitle: 'وملفات تفاعلية',
    iconName: 'BookMarked',
    category: 'presentations_design',
    productId: 'prod-presentation'
  },
  {
    id: 'mind-maps',
    title: 'تصميم خرائط',
    subtitle: 'ذهنية',
    iconName: 'GitFork',
    category: 'presentations_design',
    productId: 'prod-mind-maps'
  }
];
