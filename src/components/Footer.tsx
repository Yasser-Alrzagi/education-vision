import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#102235] text-white pt-14 pb-8 border-t-2 border-[#C58A24]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Brand Column with Official Logo */}
          <div className="lg:col-span-6 text-right space-y-4">
            <BrandLogo size="lg" variant="light" />

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg pt-2">
              منصة رائدة متخصصة في توفير كافة الخدمات الأكاديمية والطلابية بجودة عالية واحترافية متناهية، لمساعدتك في إنجاز بحوثك، مشاريعك، واجباتك، وعروضك بأفضل المعايير وسرية تامة.
            </p>

            {/* Social Icons with Official WhatsApp Icon */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#25D366] text-white hover:bg-[#20bd5a] flex items-center justify-center transition-all shadow-md hover:scale-105 cursor-pointer"
                title="واتساب الرسمي"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
              </a>
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 text-slate-300 hover:bg-[#C58A24] hover:text-white border border-white/15 flex items-center justify-center transition-all cursor-pointer"
                title="إنستغرام"
              >
                <span className="text-xs font-bold">IG</span>
              </a>
              <a
                href={SITE_CONFIG.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 text-slate-300 hover:bg-[#C58A24] hover:text-white border border-white/15 flex items-center justify-center transition-all cursor-pointer"
                title="تيك توك"
              >
                <span className="text-xs font-bold">TT</span>
              </a>
              <a
                href={SITE_CONFIG.social.snapchat}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 text-slate-300 hover:bg-[#C58A24] hover:text-white border border-white/15 flex items-center justify-center transition-all cursor-pointer"
                title="سناب شات"
              >
                <span className="text-xs font-bold">SC</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column (2-Column Grid on larger screens) */}
          <div className="lg:col-span-6 text-right space-y-3">
            <h4 className="text-sm font-bold text-[#E6C27A] uppercase tracking-wider">
              روابط سريعة للتنقل
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs sm:text-sm text-slate-300 pt-1">
              <div>
                <button 
                  onClick={() => onNavigate('hero')}
                  className="hover:text-[#E6C27A] transition-colors cursor-pointer block text-right"
                >
                  الصفحة الرئيسية
                </button>
              </div>
              <div>
                <button 
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#E6C27A] transition-colors cursor-pointer block text-right"
                >
                  خدماتنا التعليمية
                </button>
              </div>
              <div>
                <button 
                  onClick={() => onNavigate('store')}
                  className="hover:text-[#E6C27A] transition-colors cursor-pointer block text-right"
                >
                  متجر الخدمات والأسعار
                </button>
              </div>
              <div>
                <button 
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-[#E6C27A] transition-colors cursor-pointer block text-right"
                >
                  كيف نعمل؟
                </button>
              </div>
              <div>
                <button 
                  onClick={() => onNavigate('testimonials')}
                  className="hover:text-[#E6C27A] transition-colors cursor-pointer block text-right"
                >
                  آراء الطلاب والباحثين
                </button>
              </div>
              <div>
                <button 
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#E6C27A] transition-colors cursor-pointer block text-right"
                >
                  من نحن
                </button>
              </div>
              <div>
                <button 
                  onClick={() => onNavigate('faq')}
                  className="hover:text-[#E6C27A] transition-colors cursor-pointer block text-right"
                >
                  الأسئلة الشائعة
                </button>
              </div>
              <div>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#E6C27A] transition-colors cursor-pointer block text-right"
                >
                  تواصل معنا
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.brandFullName}. جميع الحقوق محفوظة.
          </div>
          <div className="flex items-center gap-1">
            <span>صُنع بإتقان لخدمة الطلاب والباحثين الأكاديميين</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
