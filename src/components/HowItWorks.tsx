import React from 'react';
import { 
  FileText, 
  MessageCircle, 
  Cog, 
  CheckCircle, 
  ShieldCheck, 
  Clock, 
  Star, 
  Users, 
  ArrowLeft 
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 bg-[#FAF8F3] scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navy Process & Trust Banner (Directly Matching image.png) */}
        <div className="bg-[#102235] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden border border-amber-500/20">
          
          {/* Subtle Ambient Background Flare */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#C58A24]/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Top Title */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              كيف نعمل؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              أربع خطوات بسيطة وسريعة لإنجاز متطلباتك الأكاديمية والطلابية
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Right: 4-Step Process Pipeline */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-3 text-center">
                
                {/* Step 1 */}
                <div className="flex flex-col items-center relative group">
                  <div className="w-13 h-13 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-3 group-hover:border-[#C58A24] group-hover:bg-[#C58A24] transition-all">
                    <FileText className="w-6 h-6 text-[#E6C27A] group-hover:text-white" />
                  </div>
                  <span className="text-xs font-black text-[#C58A24] mb-1">الخطوة 1</span>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    اختر الخدمة
                  </h4>
                  <span className="text-[11px] text-slate-300 mt-1">التي تحتاجها</span>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center relative group">
                  <div className="w-13 h-13 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-3 group-hover:border-[#C58A24] group-hover:bg-[#C58A24] transition-all">
                    <MessageCircle className="w-6 h-6 text-[#E6C27A] group-hover:text-white" />
                  </div>
                  <span className="text-xs font-black text-[#C58A24] mb-1">الخطوة 2</span>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    أرسل التفاصيل
                  </h4>
                  <span className="text-[11px] text-slate-300 mt-1">عبر واتساب</span>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center relative group">
                  <div className="w-13 h-13 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-3 group-hover:border-[#C58A24] group-hover:bg-[#C58A24] transition-all">
                    <Cog className="w-6 h-6 text-[#E6C27A] group-hover:text-white" />
                  </div>
                  <span className="text-xs font-black text-[#C58A24] mb-1">الخطوة 3</span>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    نبدأ التنفيذ
                  </h4>
                  <span className="text-[11px] text-slate-300 mt-1">باحترافية وجودة</span>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center relative group">
                  <div className="w-13 h-13 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-3 group-hover:border-[#C58A24] group-hover:bg-[#C58A24] transition-all">
                    <CheckCircle className="w-6 h-6 text-[#E6C27A] group-hover:text-white" />
                  </div>
                  <span className="text-xs font-black text-[#C58A24] mb-1">الخطوة 4</span>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    استلم عملك
                  </h4>
                  <span className="text-[11px] text-slate-300 mt-1">في الوقت المحدد</span>
                </div>

              </div>
            </div>

            {/* Left: 4 Trust Metrics (Matching Image) */}
            <div className="lg:col-span-4 lg:border-r lg:border-white/15 lg:pr-8">
              <div className="grid grid-cols-2 gap-4 text-center">
                
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-center gap-1 text-[#E6C27A] mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xl font-black text-white">100%</span>
                  </div>
                  <span className="text-[11px] text-slate-300 font-medium">
                    خصوصية مضمونة
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-center gap-1 text-[#E6C27A] mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xl font-black text-white">95%</span>
                  </div>
                  <span className="text-[11px] text-slate-300 font-medium">
                    نسبة الإنجاز
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-center gap-1 text-[#E6C27A] mb-1">
                    <Star className="w-4 h-4" />
                    <span className="text-xl font-black text-white">+12</span>
                  </div>
                  <span className="text-[11px] text-slate-300 font-medium">
                    خدمة مميزة
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-center gap-1 text-[#E6C27A] mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xl font-black text-white">+5,000</span>
                  </div>
                  <span className="text-[11px] text-slate-300 font-medium">
                    عميل سعيد
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
