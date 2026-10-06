import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getStore } from '@netlify/blobs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  is_active: boolean;
  available?: boolean;
  category: string;
  categoryNameAr: string;
  image?: string;
  details?: string[];
  unitLabel?: string;
  badge?: string;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Default initial 12 services matching existing products exactly
const INITIAL_SERVICES: Service[] = [
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
    is_active: true,
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
    is_active: true,
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
    is_active: true,
    available: true,
    featured: true,
    badge: 'معايير النشر العلمي',
    unitLabel: 'بحث / تقرير'
  },
  {
    id: 'prod-graduation-projects',
    name: 'مشاريع التخرج ورسائل الماجستير',
    category: 'research_reports',
    categoryNameAr: 'البحوث والتقارير',
    image: '/assets/images/service_academic_research_1791032124280.jpg',
    description: 'إشراف ومساعدة خطوة بخطوة في إعداد مقترحات البحوث (Proposals)، كتابة فصول الإطار النظري، مراجعة الدراسات السابقة، ومناقشة النتائج باحترافية كاملة.',
    details: [
      'صياغة مقترح بحثي متكامل وخطة عمل منهجية',
      'تغطية شاملة للإطار النظري والدراسات السابقة الحديثة',
      'تجهيز شرائح العرض وتدريب الطالب على المناقشة (Defense)',
      'تعديلات مستمرة حتى موافقة المشرف الأكاديمي النهائية'
    ],
    price: 450,
    oldPrice: 600,
    is_active: true,
    available: true,
    featured: true,
    badge: 'إشراف متكامل',
    unitLabel: 'مشروع / رسالة'
  },
  {
    id: 'prod-presentations',
    name: 'تصميم عروض تقديمية احترافية (PowerPoint & Canva)',
    category: 'presentations_design',
    categoryNameAr: 'العروض والتصاميم',
    image: '/assets/images/service_powerpoint_presentation_1791032135270.jpg',
    description: 'تصميم شرائح عروض تفاعلية وجذابة تناسب مشاريع التخرج، الحلقات الدراسية (Seminars)، والاجتماعات، مع إنفوجرافيك مخصص ومؤثرات بصرية أنيقة.',
    details: [
      'تصميم مخصص حسب الهوية الجامعية أو تخصص المادة',
      'تحويل النصوص الطويلة إلى مخططات وإنفوجرافيك ملهم',
      'إضافة ملاحظات للمتحدث (Speaker Notes) لتسهيل الإلقاء',
      'تسليم بصيغ PowerPoint قابلة للتعديل وملف PDF للعرض'
    ],
    price: 60,
    oldPrice: 85,
    is_active: true,
    available: true,
    featured: true,
    badge: 'تصميم حصري',
    unitLabel: 'عرض / شرائح'
  },
  {
    id: 'prod-data-analysis',
    name: 'التحليل الإحصائي للبيانات (SPSS & R & Python)',
    category: 'data_tech',
    categoryNameAr: 'تحليل البيانات والبرمجة',
    image: '/assets/images/service_data_analysis_1791032112064.jpg',
    description: 'تفريغ وتحليل الاستبانات واختبار الفرضيات الإحصائية (T-Test, ANOVA, Regression) وكتابة تقرير مفصل يفسر الجداول والرسوم البيانية بلغة أكاديمية واضحة.',
    details: [
      'فحص صدق وثبات أدوات الدراسة (معامل ألفا كرونباخ)',
      'تطبيق الاختبارات البارامترية واللابارامترية المناسبة',
      'رسوم بيانية وجداول منسقة وجاهزة للإدراج المباشر في البحث',
      'شرح مبسط لمعاني النتائج ومؤشرات الدلالة الإحصائية'
    ],
    price: 180,
    oldPrice: 240,
    is_active: true,
    available: true,
    featured: true,
    badge: 'دقة إحصائية 100%',
    unitLabel: 'تحليل / دراسة'
  },
  {
    id: 'prod-translation',
    name: 'الترجمة الأكاديمية والتدقيق اللغوي المعتمد',
    category: 'translation_editing',
    categoryNameAr: 'الترجمة والتدقيق',
    image: '/assets/images/service_translation_academic_1791032179398.jpg',
    description: 'ترجمة متخصصة للأوراق العلمية والملخصات من وإلى الإنجليزية، وتدقيق لغوي ونحوي وإملائي دقيق للرسائل والأبحاث باللغتين العربية والإنجليزية.',
    details: [
      'ترجمة بشرية دقيقة تراعي المصطلحات التخصصية في كل علم',
      'تدقيق نحوي وإملائي وتحسين جودة الصياغة والأسلوب',
      'تنسيق الفقرات وعلامات الترقيم وتصحيح الصياغات الركيكة',
      'شهادة تدقيق لغوي تفيد بسلامة النص وجودته للنشر'
    ],
    price: 45,
    oldPrice: 65,
    is_active: true,
    available: true,
    unitLabel: '1000 كلمة'
  },
  {
    id: 'prod-ats-resume',
    name: 'كتابة وتصميم السيرة الذاتية المهنية (ATS)',
    category: 'translation_editing',
    categoryNameAr: 'الترجمة والتدقيق',
    image: '/assets/images/service_ats_resume_1791032166989.jpg',
    description: 'إعداد سيرة ذاتية احترافية ثنائية اللغة متوافقة تماماً مع أنظمة تتبع المتقدمين (ATS)، مع كتابة خطاب مقدمة (Cover Letter) وبروفايل LinkedIn متميز.',
    details: [
      'هيكلة متوافقة مع أنظمة الفرز الإلكتروني ATS لضمان القبول',
      'صياغة احترافية للإنجازات والمهارات والكلمات المفتاحية',
      'تصميم أنيق ومريح للقراءة بنسختين Word و PDF',
      'تجهيز خطاب تقديم (Cover Letter) مخصص للوظيفة المستهدفة'
    ],
    price: 75,
    oldPrice: 100,
    is_active: true,
    available: true,
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
    is_active: true,
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
    is_active: true,
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
    is_active: true,
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
    is_active: true,
    available: true,
    unitLabel: 'ساعة صوتية'
  }
];

// Determine serverless vs container environment
const isServerless = Boolean(process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME);
const DB_DIR = isServerless ? '/tmp' : path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DB_DIR, 'services.json');
const LEGACY_DB_FILE = path.resolve(__dirname, '../../data/database.json');

class SimpleServicesDatabase {
  private services: Service[] = [];
  private isLoaded = false;

  constructor() {
    this.load();
  }

  private load() {
    try {
      if (!fs.existsSync(DB_DIR)) {
        try { fs.mkdirSync(DB_DIR, { recursive: true }); } catch { /* ignore */ }
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.services = JSON.parse(raw);
        this.isLoaded = true;
        return;
      }

      // Check legacy file if available
      if (fs.existsSync(LEGACY_DB_FILE)) {
        try {
          const raw = fs.readFileSync(LEGACY_DB_FILE, 'utf-8');
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed.services) && parsed.services.length > 0) {
            this.services = parsed.services;
            this.save();
            this.isLoaded = true;
            return;
          }
        } catch { /* ignore */ }
      }

      // Default seed
      this.services = [...INITIAL_SERVICES];
      this.save();
      this.isLoaded = true;
    } catch (err) {
      console.error('Error loading services DB:', err);
      this.services = [...INITIAL_SERVICES];
      this.isLoaded = true;
    }
  }

  public async ensureInitialized(): Promise<void> {
    if (process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT) {
      try {
        const store = getStore({ name: 'education-vision-store', consistency: 'strong' });
        const remote = await store.get('services', { type: 'json' }) as Service[] | null;
        if (remote && Array.isArray(remote) && remote.length > 0) {
          this.services = remote;
          return;
        } else if (this.services.length > 0) {
          await store.setJSON('services', this.services);
        }
      } catch (err) {
        // Fallback to local file/memory
      }
    }
  }

  private async save(): Promise<void> {
    try {
      const tempPath = `${DB_FILE}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(this.services, null, 2), 'utf-8');
      fs.renameSync(tempPath, DB_FILE);
    } catch {
      // In read-only serverless filesystems, keep in-memory
    }

    if (process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT) {
      try {
        const store = getStore({ name: 'education-vision-store', consistency: 'strong' });
        await store.setJSON('services', this.services);
      } catch (err) {
        console.error('Failed to persist to Netlify Blobs:', err);
      }
    }
  }

  // Public/Admin getter
  public getServices(includeHidden = false): Service[] {
    const list = includeHidden ? this.services : this.services.filter(s => s.is_active);
    return list.map(s => ({
      ...s,
      available: s.is_active
    }));
  }

  public getServiceById(id: string): Service | undefined {
    const s = this.services.find(item => item.id === id);
    return s ? { ...s, available: s.is_active } : undefined;
  }

  public async updateService(id: string, updates: Partial<Service>): Promise<Service | null> {
    const index = this.services.findIndex(s => s.id === id);
    if (index === -1) return null;

    const current = this.services[index];
    const is_active = updates.is_active !== undefined 
      ? Boolean(updates.is_active) 
      : updates.available !== undefined 
        ? Boolean(updates.available) 
        : current.is_active;

    const updated: Service = {
      ...current,
      ...updates,
      price: updates.price !== undefined ? Number(updates.price) : current.price,
      is_active,
      available: is_active,
      updated_at: new Date().toISOString()
    };

    this.services[index] = updated;
    await this.save();
    return updated;
  }

  public async addService(serviceData: Partial<Service>): Promise<Service> {
    const id = `srv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const is_active = serviceData.is_active !== undefined ? Boolean(serviceData.is_active) : true;
    const now = new Date().toISOString();

    const newService: Service = {
      id,
      name: (serviceData.name || 'خدمة جديدة').trim(),
      description: (serviceData.description || '').trim(),
      price: Number(serviceData.price) || 50,
      oldPrice: serviceData.oldPrice ? Number(serviceData.oldPrice) : undefined,
      category: serviceData.category || 'academic_services',
      categoryNameAr: serviceData.categoryNameAr || 'الخدمات الأكاديمية',
      image: serviceData.image || '/assets/images/service_academic_research_1791032124280.jpg',
      details: Array.isArray(serviceData.details) ? serviceData.details : [],
      unitLabel: serviceData.unitLabel || 'خدمة',
      badge: serviceData.badge || undefined,
      featured: Boolean(serviceData.featured),
      is_active,
      available: is_active,
      created_at: now,
      updated_at: now
    };

    this.services.unshift(newService);
    await this.save();
    return newService;
  }

  public async deleteService(id: string): Promise<boolean> {
    const initialLen = this.services.length;
    this.services = this.services.filter(s => s.id !== id);
    if (this.services.length !== initialLen) {
      await this.save();
      return true;
    }
    return false;
  }
}

export const db = new SimpleServicesDatabase();
