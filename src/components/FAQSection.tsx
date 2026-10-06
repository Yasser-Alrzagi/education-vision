import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLinkWithMessage } from '../config/siteConfig';
import { openExternalUrl } from '../utils/navigation';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'كيف يمكنني طلب خدمة أكاديمية أو الاستفسار؟',
      a: 'يمكنك اختيار الخدمة المطلوبة من الموقع وإضافتها إلى السلة، أو الضغط مباشرة على زر "اطلب عبر WhatsApp" وسيقوم فريقنا الأكاديمي بالرد عليك فوراً لتحديد التفاصيل وموعد التسليم.'
    },
    {
      q: 'هل تضمنون سرية الأبحاث والمعلومات الخاصة بي؟',
      a: 'نعم وبشكل قطعي 100%. نلتزم بأعلى معايير السرية والأمان الأكاديمي، ولا يتم مشاركة أي ملفات أو بيانات شخصية مع أي جهة خارجية تحت أي ظرف.'
    },
    {
      q: 'هل يمكن طلب تعديلات بعد استلام العمل؟',
      a: 'بالتأكيد، تشمل جميع خدماتنا مراجعات وتعديلات مجانية لضمان مطابقة العمل للمتطلبات والمعايير التي حددتها مع المشرف أو الجامعة.'
    },
    {
      q: 'ما هي التخصصات التي تدعمونها في رؤية التعليم؟',
      a: 'ندعم كافة التخصصات الجامعية: إدارة الأعمال، الهندسة، علوم الحاسب والبرمجة، القانون، العلوم الطبية والصحية، الآداب، والعلوم الإنسانية والتربوية.'
    },
    {
      q: 'ما هي طرق الدفع المتاحة وسرعة التسليم؟',
      a: 'نوفر طرق دفع آمنة ومعتمدة في المملكة والخليج، وتُحدد مدة التسليم حسب حجم العمل مع إمكانية التنفيذ العاجل للواجبات والاختبارات.'
    }
  ];

  const handleAskUs = () => {
    const link = getWhatsAppLinkWithMessage(SITE_CONFIG.messages.generalInquiry);
    openExternalUrl(link);
  };

  return (
    <section id="faq" className="py-14 sm:py-20 bg-white border-t border-slate-200/70 scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF3E5] text-[#C58A24] text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>إجابات واضحة ومباشرة</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#102235] tracking-tight">
            الأسئلة الشائعة
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 font-medium">
            كل ما يهمك معرفته حول خدماتنا الأكاديمية وضمانات العمل
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200/90 overflow-hidden bg-[#FAF8F3]/60 transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF3E5]/40 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-[#102235] leading-snug">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#C58A24] text-white border-[#C58A24]' : 'text-slate-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/40 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-10 p-5 rounded-2xl bg-[#102235] text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div>
            <h4 className="text-sm sm:text-base font-bold">لديك استفسار خاص لم تجده هنا؟</h4>
            <p className="text-xs text-slate-300 mt-1">تواصل مباشرة مع المشرف الأكاديمي عبر الواتساب</p>
          </div>
          <button
            onClick={handleAskUs}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>اسألنا عبر واتساب</span>
          </button>
        </div>

      </div>
    </section>
  );
};
