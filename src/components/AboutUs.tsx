import React from 'react';
import { Target, Award, CheckCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-white scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Right Column: Mission and Identity */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FAF3E5] border border-[#E6C27A]/50 text-[#C58A24] text-xs font-bold">
              <div className="w-5 h-5 rounded-full overflow-hidden border border-[#C58A24] shrink-0">
                <img
                  src={SITE_CONFIG.logoPath}
                  alt="شعار المنصة"
                  className="w-full h-full object-cover"
                />
              </div>
              <span>نبذة عن منصة رؤية التعليم</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-[#102235] tracking-tight leading-snug">
              من نحن في <span className="text-[#C58A24]">رؤية التعليم</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              منصة <strong className="text-[#102235]">رؤية التعليم (Education Vision)</strong> متخصصة في تقديم حلول متكاملة لخدمات الطلاب والأكاديمية عبر موقعنا <span className="font-mono text-[#C58A24] font-bold" dir="ltr">{SITE_CONFIG.shortDomain}</span>، بهدف مساندة الطلاب والباحثين في مختلف التخصصات والمراحل الجامعية لتحقيق أعلى مستويات التميز الأكاديمي.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              نعمل بفريق متخصص في التحليل الإحصائي، صياغة الأبحاث، التدقيق اللغوي، تصميم العروض والمحتوى الرقمي، ملتزمين بالسرية التامة والمواعيد المحددة وفق المعايير والضوابط الأكاديمية المعتمدة.
            </p>

            {/* Core Values Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-slate-200">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#102235] text-[#C58A24] flex items-center justify-center font-bold">
                    <Target className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-[#102235]">رؤيتنا الأكاديمية</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  أن نكون الشريك الموثوق الأول لكل طالب وباحث يسعى للتميز والتفوق الأكاديمي بأعلى معايير الجودة والإتقان.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-slate-200">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#102235] text-[#C58A24] flex items-center justify-center font-bold">
                    <Award className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-[#102235]">التزامنا بالجودة</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  التدقيق العلمي واللغوي لكل عمل قبل تسليمه للعميل مع قابلية المراجعة والتعديل الفوري لضمان الرضا الكامل.
                </p>
              </div>

            </div>

          </div>

          {/* Left Column: Visual Card Featuring Official Logo */}
          <div className="lg:col-span-5">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#102235] to-[#1c3959] text-white shadow-xl border border-[#C58A24]/30 overflow-hidden text-center sm:text-right">
              <div className="absolute top-0 left-0 w-48 h-48 bg-[#C58A24]/20 rounded-full blur-2xl pointer-events-none" />

              {/* Official Brand Logo Box */}
              <div className="flex items-center justify-center sm:justify-start mb-6">
                <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-lg border-2 border-[#C58A24] overflow-hidden">
                  <img
                    src={SITE_CONFIG.logoPath}
                    alt="شعار Education Vision الرسمي"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h3 className="text-xl font-black mb-3">لماذا يختارنا الطلاب؟</h3>
              
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200 text-right">
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#E6C27A] shrink-0" />
                  <span>حلول أكاديمية متكاملة لجميع التخصصات</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#E6C27A] shrink-0" />
                  <span>دقة في المواعيد وتسليم قبل الموعد النهائي</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#E6C27A] shrink-0" />
                  <span>حماية كاملة للخصوصية والبيانات الأكاديمية</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#E6C27A] shrink-0" />
                  <span>تواصل فوري ومباشر ومتابعة مستمرة عبر WhatsApp</span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-300">الرابط المباشر:</span>
                <span className="font-bold text-[#E6C27A] font-mono" dir="ltr">
                  {SITE_CONFIG.shortDomain}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
