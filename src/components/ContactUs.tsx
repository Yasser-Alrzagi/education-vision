import React from 'react';
import { 
  ExternalLink, 
  Phone 
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLinkWithMessage } from '../config/siteConfig';
import { WhatsAppIcon } from './WhatsAppIcon';
import { openExternalUrl } from '../utils/navigation';

export const ContactUs: React.FC = () => {
  const socialCards = [
    {
      name: 'واتساب الرسمي المعتمد',
      handle: '+966541867974',
      url: SITE_CONFIG.whatsappUrl,
      color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700',
      actionText: 'محادثة فورية على WhatsApp',
      isWhatsApp: true
    },
    {
      name: 'سناب شات الرسمي',
      handle: '@education_visio',
      url: SITE_CONFIG.social.snapchat,
      color: 'bg-amber-500/10 border-amber-500/20 text-[#C58A24]',
      actionText: 'إضافة الحساب',
      icon: ExternalLink
    },
    {
      name: 'إنستغرام الرسمي',
      handle: '@educ.ationvision',
      url: SITE_CONFIG.social.instagram,
      color: 'bg-pink-500/10 border-pink-500/20 text-pink-700',
      actionText: 'متابعة الحساب',
      icon: ExternalLink
    },
    {
      name: 'تيك توك',
      handle: '@education_vision_1',
      url: SITE_CONFIG.social.tiktok,
      color: 'bg-slate-900/10 border-slate-900/20 text-slate-800',
      actionText: 'مشاهدة الفيديوهات',
      icon: ExternalLink
    }
  ];

  const handleCustomInquiry = () => {
    const link = getWhatsAppLinkWithMessage(SITE_CONFIG.messages.generalInquiry);
    openExternalUrl(link);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#FAF8F3] border-t border-slate-200/80 scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF3E5] text-[#C58A24] text-xs font-bold mb-3">
            <Phone className="w-3.5 h-3.5" />
            <span>قنوات التواصل الرسمية</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#102235] tracking-tight">
            تواصل معنا مباشرة
          </h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            فريق خدمة العملاء متاح للرد على استفساراتكم واستقبال طلباتكم الأكاديمية على مدار الساعة عبر <span className="font-mono text-[#C58A24] font-bold" dir="ltr">{SITE_CONFIG.shortDomain}</span> أو واتساب.
          </p>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {socialCards.map((card, idx) => {
            const Icon = card.icon || ExternalLink;
            return (
              <a
                key={idx}
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-5 rounded-2xl border transition-all hover:scale-102 hover:shadow-md bg-white flex flex-col justify-between ${card.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold">{card.name}</span>
                    {card.isWhatsApp ? (
                      <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <span className="text-sm sm:text-base font-black tracking-tight text-[#102235] block truncate" dir="ltr">
                    {card.handle}
                  </span>
                </div>
                <span className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold flex items-center justify-between text-[#C58A24]">
                  <span>{card.actionText}</span>
                  <span>←</span>
                </span>
              </a>
            );
          })}
        </div>

        {/* Direct WhatsApp Callout Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-right">
            <h3 className="text-lg sm:text-xl font-bold text-[#102235]">
              لديك استفسار خاص أو ملف ترغب في تسعيره فوراً؟
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              أرسل لنا متطلبات واجبك، بحثك، أو مشروعك عبر واتساب واحصل على تقييم فوري للوقت والتكلفة.
            </p>
          </div>

          <div className="flex items-center shrink-0 w-full md:w-auto">
            <button
              onClick={handleCustomInquiry}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold shadow-md transition-all cursor-pointer group"
            >
              <WhatsAppIcon className="w-5 h-5 text-white" />
              <span>محادثة واتساب الآن</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
