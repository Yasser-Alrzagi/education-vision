import { Product } from '../types';

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-exams',
    name: 'المساعدة في الاختبارات والتقييمات الأكاديمية',
    category: 'exams_homework',
    categoryNameAr: 'الاختبارات والواجبات',
    image: '/assets/images/service_exams_homework_1791032152040.jpg',
    description: 'مراجعة وتدريب شامل على نماذج الاختبارات، حل أسئلة النماذج السابقة، وتلخيص أهم النقاط المتوقعة في الاختبار بأعلى درجات الدقة والالتزام بالوقت.',
    details: [
      'حل نماذج سابقة وشرح طريقة الحل خطوة بخطوة',
      'تدريب مركز على أهم التمارين والمعادلات',
      'دقة عالية ومراجعة أكاديمية متخصصة',
      'تسليم فوري ومتابعة مستمرة حتى وقت الاختبار'
    ],
    price: 90,
    oldPrice: 120,
    available: true,
    featured: true,
    badge: 'الأكثر طلباً',
    unitLabel: 'اختبار / نموذج'
  },
  {
    id: 'prod-homework',
    name: 'حل الواجبات والتكاليف الدراسية',
    category: 'exams_homework',
    categoryNameAr: 'الاختبارات والواجبات',
    image: '/assets/images/service_exams_homework_1791032152040.jpg',
    description: 'حل الواجبات الجامعية والمدرسية لجميع المراحل والتخصصات بدقة تامة وشرح مفصل مع الالتزام بتعليمات الأستاذ الجامعي والمراجع المطلوبة.',
    details: [
      'حل نموذجي خالٍ من الأخطاء مع شرح خطوات الحل',
      'توافق كامل مع تعليمات ومعايير المادة',
      'تسليم في الموعد المحدد دون أي تأخير',
      'إمكانية إجراء التعديلات مجاناً عند الحاجة'
    ],
    price: 50,
    oldPrice: 70,
    available: true,
    featured: true,
    badge: 'تسليم سريع',
    unitLabel: 'واجب / تكليف'
  },
  {
    id: 'prod-research',
    name: 'إعداد بحوث وتقارير أكاديمية موثقة',
    category: 'research_reports',
    categoryNameAr: 'البحوث والتقارير',
    image: '/assets/images/service_academic_research_1791032124280.jpg',
    description: 'كتابة وإعداد الأبحاث وأوراق العمل والتقارير الجامعية وفق المنهجيات العلمية المعتمدة، مع توثيق المراجع بالأساليب العالمية (APA, Harvard, MLA) ونسبة اقتباس منخفضة.',
    details: [
      'كتابة أكاديمية متخصصة خالية من الانتحال والذكاء الاصطناعي الرديء',
      'توثيق مراجع حديثة من دوريات وقواعد بيانات معتمدة',
      'تنسيق متكامل للغلاف، الفهرس، الجداول، والمراجع',
      'تقرير فحص الاقتباس والاستلال عند الطلب'
    ],
    price: 150,
    oldPrice: 200,
    available: true,
    featured: true,
    badge: 'جودة أكاديمية',
    unitLabel: 'بحث / تقرير'
  },
  {
    id: 'prod-presentation',
    name: 'تصميم عروض بوربوينت PowerPoint احترافية',
    category: 'presentations_design',
    categoryNameAr: 'العروض والتصاميم',
    image: '/assets/images/service_powerpoint_presentation_1791032135270.jpg',
    description: 'تصميم عروض تقديمية بصرية جذابة تعكس هويتك وتلفت أنظار الأساتذة والجمهور، مع رسوم بيانية تفاعلية وتأثيرات مدروسة وصياغة موجزة.',
    details: [
      'تصميم مخصص يتناسب مع تخصصك وموضوع العرض',
      'إدراج إنفوجرافيك وأيقونات وجداول بصرية احترافية',
      'تسليم الملف بصيغة PPT قابلة للتعديل + PDF عالي الجودة',
      'إضافة ملاحظات المتحدث (Speaker Notes) عند الطلب'
    ],
    price: 75,
    oldPrice: 100,
    available: true,
    featured: true,
    badge: 'تصميم مميز',
    unitLabel: 'عرض تقديمي'
  },
  {
    id: 'prod-data-analysis',
    name: 'إدخال وتحليل البيانات الإحصائية (Excel / SPSS / R)',
    category: 'data_tech',
    categoryNameAr: 'تحليل البيانات والبرمجة',
    image: '/assets/images/service_data_analysis_1791032112064.jpg',
    description: 'تنظيف وتفريغ البيانات الإحصائية، إجراء الاختبارات الفرضية، الانحدار، الارتباط، وتحليل الاستبانات مع استخراج الجداول وتفسير النتائج علمياً.',
    details: [
      'تفريغ الاستبيانات والبيانات الخام في قوالب منظمة',
      'تطبيق الاختبارات الإحصائية المناسبة لفرضيات البحث',
      'رسوم بيانية ومخططات إيضاحية جاهزة للإدراج في البحث',
      'تقرير تفسير ومناقشة النتائج باللغة العربية أو الإنجليزية'
    ],
    price: 180,
    oldPrice: 240,
    available: true,
    featured: true,
    badge: 'دقة واحتراف',
    unitLabel: 'تحليل إحصائي'
  },
  {
    id: 'prod-word-formatting',
    name: 'تنسيق الأبحاث والرسائل وملفات Word',
    category: 'academic_services',
    categoryNameAr: 'الخدمات الأكاديمية',
    image: '/assets/images/service_academic_research_1791032124280.jpg',
    description: 'تنسيق متقن للرسائل العلمية وأبحاث التخرج وفق دليل الجامعة المعتمد: الخطوط، الهوامش، ترقيم الصفحات، الفهارس التلقائية، والجداول.',
    details: [
      'تطبيق دليل كتابة الرسائل الخاص بجامعتك بدقة 100%',
      'إنشاء فهارس آلية للمحتويات، الجداول، والأشكال',
      'ضبط الهوامش والمسافات البادئة والترقيم الروماني والعربي',
      'مراجعة وتدقيق علامات الترقيم والتنسيق العام'
    ],
    price: 60,
    oldPrice: 85,
    available: true,
    unitLabel: 'ملف / رسالة'
  },
  {
    id: 'prod-translation',
    name: 'ترجمة أكاديمية وتدقيق لغوي',
    category: 'academic_services',
    categoryNameAr: 'الخدمات الأكاديمية',
    image: '/assets/images/service_translation_academic_1791032179398.jpg',
    description: 'ترجمة بشرية دقيقة للأوراق العلمية والملخصات من الإنجليزية إلى العربية وبالعكس، مع الحفاظ على المصطلحات التخصصية والأسلوب العلمي الرصين.',
    details: [
      'ترجمة دقيقة تراعي المصطلحات الطبية، الهندسية، الإدارية، وغيرها',
      'تدقيق نحوي ولغوي يضمن سلاسة القراءة',
      'تنسيق مطابق تماماً للمستند الأصلي',
      'تسليم المستند باللغتين جنباً إلى جنب أو منفصلين'
    ],
    price: 45,
    oldPrice: 65,
    available: true,
    unitLabel: 'مستند / صفحة'
  },
  {
    id: 'prod-ats-resume',
    name: 'تصميم سيرة ذاتية احترافية متوافقة مع ATS',
    category: 'presentations_design',
    categoryNameAr: 'العروض والتصاميم',
    image: '/assets/images/service_ats_resume_1791032166989.jpg',
    description: 'صياغة وتصميم سيرة ذاتية حديثة تبرز مهاراتك وخبراتك وتجتاز أنظمة الفرز الآلي للموارد البشرية (ATS)، مع ملف PDF قابل للتعديل.',
    details: [
      'تصميم أنيق متوافق بنسبة 100% مع أنظمة ATS للتوظيف',
      'صياغة احترافية للأهداف والمهام بكلمات مفتاحية قوية',
      'توفير نسختين باللغة العربية والإنجليزية حسب الرغبة',
      'إمكانية إضافة خطاب تقديم (Cover Letter) عند الطلب'
    ],
    price: 70,
    oldPrice: 95,
    available: true,
    featured: true,
    badge: 'للباحثين عن عمل',
    unitLabel: 'سيرة ذاتية'
  },
  {
    id: 'prod-book-summary',
    name: 'تلخيص الكتب والمقررات الأكاديمية',
    category: 'academic_services',
    categoryNameAr: 'الخدمات الأكاديمية',
    image: '/assets/images/service_academic_research_1791032124280.jpg',
    description: 'تلخيص مركز للمراجع والمقررات الدراسية الطويلة، مع إبراز المفاهيم الأساسية، التعاريف، والأسئلة الشائعة لتسهيل الحفظ والمراجعة السريعة.',
    details: [
      'استخلاص أهم الأفكار والنظريات بأسلوب موجز وواضح',
      'إعداد أسئلة تدريبية واختبارات ذاتية في نهاية كل فصل',
      'تنسيق بصري مريح للقراءة مع تظليل المصطلحات الهامة',
      'ملف PDF جاهز للطباعة أو القراءة الرقمية'
    ],
    price: 80,
    oldPrice: 110,
    available: true,
    unitLabel: 'مقرر / كتاب'
  },
  {
    id: 'prod-website-dev',
    name: 'تصميم وبرمجة مواقع إلكترونية ومتاجر للطلاب',
    category: 'data_tech',
    categoryNameAr: 'تحليل البيانات والبرمجة',
    image: '/assets/images/service_website_dev_1791032193441.jpg',
    description: 'بناء مواقع تعريفية، متاجر رقمية، أو مشاريع تخرج برمجية باستخدام أحدث التقنيات مع لوحة تحكم سهلة وتصميم متجاوب تماماً مع الهواتف.',
    details: [
      'برمجة وتصميم موقع متكامل متجاوب وسريع',
      'شرح وتدريب على الكود البرمجي لمناقشة مشروع التخرج',
      'ربط بوابات الدفع أو قنوات التواصل والمستودعات',
      'دعم فني واستضافة مجانية وتعديلات حسب رغبة المشرف'
    ],
    price: 350,
    oldPrice: 500,
    available: true,
    badge: 'مشاريع تخرج',
    unitLabel: 'مشروع / موقع'
  },
  {
    id: 'prod-mind-maps',
    name: 'تصميم خرائط ذهنية ورسوم توضيحية',
    category: 'presentations_design',
    categoryNameAr: 'العروض والتصاميم',
    image: '/assets/images/service_powerpoint_presentation_1791032135270.jpg',
    description: 'تحويل المعلومات النظرية المعقدة إلى خرائط مفاهيمية وذهنية منظمة بصرية تساعد على الربط المنطقي وسرعة التذكر والاستيعاب.',
    details: [
      'تصميم خرائط ذهنية جذابة وملونة بدقة عالية',
      'ترتيب هرمي وتسلسلي للمفاهيم والعلاقات',
      'صيغ قابلة للطباعة بدقة عالية Vector / PDF',
      'تصاميم مناسبة للعروض والمذكرات الدراسية'
    ],
    price: 40,
    oldPrice: 60,
    available: true,
    unitLabel: 'خريطة ذهنية'
  },
  {
    id: 'prod-audio-transcription',
    name: 'تفريغ وتحويل الصوت والفيديو إلى نصوص',
    category: 'academic_services',
    categoryNameAr: 'الخدمات الأكاديمية',
    image: '/assets/images/service_translation_academic_1791032179398.jpg',
    description: 'تفريغ دقيق للمحاضرات الصوتية، الندوات، والمقابلات البحثية مع التشكيل والتدقيق اللغوي وتنسيق الحوار بين المتحدثين.',
    details: [
      'تفريغ يدوي دقيق مع تصحيح العبارات الشفهية',
      'ترقيم زمني (Timecode) للأجزاء الهامة عند الطلب',
      'تنسيق ملف Word أنيق وجاهز للطباعة',
      'ضمان سرية التسجيلات والملفات بنسبة 100%'
    ],
    price: 35,
    oldPrice: 50,
    available: true,
    unitLabel: 'ساعة صوتية'
  }
];

export const CATEGORIES_LIST = [
  { id: 'all', nameAr: 'جميع الخدمات', count: 12 },
  { id: 'exams_homework', nameAr: 'الاختبارات والواجبات', count: 2 },
  { id: 'research_reports', nameAr: 'البحوث والتقارير', count: 2 },
  { id: 'presentations_design', nameAr: 'العروض والتصاميم', count: 2 },
  { id: 'data_tech', nameAr: 'تحليل البيانات والبرمجة', count: 2 },
  { id: 'translation_editing', nameAr: 'الترجمة والتدقيق', count: 2 },
  { id: 'academic_services', nameAr: 'الخدمات الأكاديمية', count: 2 },
];
