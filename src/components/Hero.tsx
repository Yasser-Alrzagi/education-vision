import React from 'react';
import { 
  FileText, 
  Headphones, 
  Sparkles, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLinkWithMessage } from '../config/siteConfig';
import { WhatsAppIcon } from './WhatsAppIcon';
import { openExternalUrl } from '../utils/navigation';

interface HeroProps {
  onExploreServices: () => void;
  onExploreStore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreServices, onExploreStore }) => {
  const handleOrderNow = () => {
    const link = getWhatsAppLinkWithMessage(SITE_CONFIG.messages.newOrder);
    openExternalUrl(link);
  };

  const handleTrackOrder = () => {
    const link = getWhatsAppLinkWithMessage(SITE_CONFIG.messages.trackOrder);
    openExternalUrl(link);
  };

  return (
    <section id="hero" className="relative pt-4 pb-8 sm:pt-10 sm:pb-16 overflow-hidden scroll-mt-16 sm:scroll-mt-20">
      {/* Subtle background ambient glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#E6C27A]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#102235]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Right Column: Hero Content & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-right z-10">
            
            {/* Clean Welcome Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF3E5] border border-[#E6C27A]/70 text-[#102235] text-xs font-bold mb-4 shadow-2xs">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full overflow-hidden border border-[#C58A24] shrink-0">
                <img
                  src={SITE_CONFIG.logoPath}
                  alt="شعار المنصة"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[#C58A24]">منصة رؤية التعليم الأكاديمية والطلابية</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-[50px] font-black text-[#102235] tracking-tight leading-[1.3] mb-4">
              نجعل رحلتك الأكاديمية
              <span className="block text-[#C58A24] mt-1">
                أسهل وأكثر نجاحاً
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mb-6">
              نقدم لك مجموعة متكاملة من الخدمات التعليمية والطلابية: أبحاث، حل واجبات، تحليل إحصائي، ومشاريع تخرج باحترافية وجودة عالية وسرية تامة.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-6">
              {/* Authentic WhatsApp CTA */}
              <button
                onClick={handleOrderNow}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#102235] text-white text-sm sm:text-base font-bold shadow-md hover:bg-[#183452] hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center p-0.5 group-hover:scale-110 transition-transform shrink-0">
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                </div>
                <span>اطلب خدمتك الآن عبر WhatsApp</span>
              </button>

              <button
                onClick={onExploreStore}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border-2 border-[#C58A24] text-[#C58A24] text-sm sm:text-base font-bold hover:bg-[#FAF3E5] transition-all cursor-pointer"
              >
                <span>تصفح الخدمات والأسعار</span>
              </button>
            </div>

            {/* Micro Social Proof Strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <span className="text-amber-500">★★★★★</span>
                <span className="text-[#102235] font-bold">4.9/5</span> تقييم الطلاب
              </span>
              <span>•</span>
              <span className="text-[#102235] font-bold">+5000 عمل منجز</span>
              <span>•</span>
              <span className="text-emerald-700 font-bold">100% سرية وضمان</span>
            </div>

          </div>

          {/* Left Column: Clean Academic Visual */}
          <div className="lg:col-span-6 relative flex justify-center items-center w-full">
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Outer decorative border box */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 sm:border-4 border-white bg-white">
                <img
                  src="/assets/images/hero_academic_desk_1791032093898.jpg"
                  alt="منصة رؤية التعليم لخدمات الطلاب والأكاديمية"
                  className="w-full h-[220px] sm:h-[340px] lg:h-[400px] object-cover object-center transform hover:scale-102 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Strip: 4 Trust Pillars */}
        <div className="mt-8 sm:mt-14 pt-6 sm:pt-8 border-t border-slate-200/70">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            
            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-slate-700">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#C58A24]">
                <Headphones className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#102235]">
                دعم مستمر
              </span>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-slate-700">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#C58A24]">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#102235]">
                دقة في العمل
              </span>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-slate-700">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#C58A24]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#102235]">
                سرية مستمرة
              </span>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-slate-700">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#C58A24]">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#102235]">
                تسليم في الوقت المحدد
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
