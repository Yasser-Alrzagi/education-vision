import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG, getWhatsAppLinkWithMessage } from '../config/siteConfig';
import { WhatsAppIcon } from './WhatsAppIcon';
import { openExternalUrl } from '../utils/navigation';

export const CheckoutModal: React.FC = () => {
  const { 
    cart, 
    subtotal, 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    setIsCartOpen,
    clearCart 
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    whatsappNumber: '',
    email: '',
    major: '',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const errors: Record<string, string> = {};
    if (cart.length === 0) {
      errors.cart = 'السلة فارغة، يرجى اختيار خدمات أولاً للمتابعة';
    }
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'يرجى كتابة الاسم الكريم (حرفين على الأقل)';
    }
    const phoneDigits = formData.whatsappNumber.replace(/\D/g, '');
    if (!formData.whatsappNumber.trim() || phoneDigits.length < 7) {
      errors.whatsappNumber = 'يرجى كتابة رقم واتساب صحيح للتواصل (7 أرقام على الأقل)';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'يرجى إدخال بريد إلكتروني صحيح أو ترك الحقل فارغاً';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate formatted WhatsApp message matching prompt requirements
    const itemsText = cart.map((item, idx) => {
      const itemTotal = item.product.price * item.quantity;
      return `${idx + 1}. المنتج: ${item.product.name}
   • الكمية: ${item.quantity}
   • سعر الوحدة: ${item.product.price} ر.س
   • الإجمالي: ${itemTotal} ر.س${item.customNotes ? `\n   • مواصفات: ${item.customNotes}` : ''}`;
    }).join('\n\n');

    const whatsappMessage = `السلام عليكم ورحمة الله وبركاته،
أرغب في طلب الخدمات التالية من منصة رؤية التعليم (${SITE_CONFIG.shortDomain}):

${itemsText}

=========================
إجمالي الطلب: ${subtotal} ر.س
=========================

بيانات العميل:
• الاسم: ${formData.fullName.trim()}
• رقم التواصل: ${formData.whatsappNumber.trim()}
${formData.email.trim() ? `• البريد الإلكتروني: ${formData.email.trim()}\n` : ''}${formData.major.trim() ? `• التخصص / الجامعة: ${formData.major.trim()}\n` : ''}${formData.notes.trim() ? `• ملاحظات إضافية: ${formData.notes.trim()}\n` : ''}
أرجو تأكيد استلام الطلب وتزويدي بالخطوات وموعد التسليم.`;

    const whatsappLink = getWhatsAppLinkWithMessage(whatsappMessage);
    openExternalUrl(whatsappLink);

    setIsSubmitted(true);
  };

  const handleFinish = () => {
    clearCart();
    setIsSubmitted(false);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#FAF8F3] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setIsCheckoutOpen(false); setIsCartOpen(true); }}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-white transition-colors"
              title="العودة للسلة"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-[#102235]">إتمام الطلب</h3>
              <span className="text-xs text-slate-500 font-medium">
                تأكيد تفاصيل الخدمة وإرسالها لمستشاري رؤية التعليم ({SITE_CONFIG.shortDomain})
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="إغلاق"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-black text-[#102235]">
              تم تجهيز رسالة طلبك بنجاح!
            </h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              تم تحويلك إلى محادثة واتساب الرسمية مع منصة رؤية التعليم (+966541867974). سيقوم فريقنا بمراجعة تفاصيل طلبك والرد عليك فوراً لتأكيد الاستلام.
            </p>
            <div className="pt-4">
              <button
                onClick={handleFinish}
                className="px-6 py-3 bg-[#102235] text-white text-sm font-bold rounded-xl hover:bg-[#1a3552] transition-colors"
              >
                العودة للصفحة الرئيسية
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleConfirmOrder} className="p-5 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto text-right">
            
            {/* Order Items Review */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                ملخص الخدمات المطلوبة ({cart.length})
              </h4>
              <div className="space-y-2 bg-[#FAF8F3] p-3.5 rounded-2xl border border-slate-200">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60 last:border-none">
                    <span className="font-bold text-[#102235]">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-black text-[#C58A24]">
                      {item.product.price * item.quantity} ر.س
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 text-sm font-black text-[#102235]">
                  <span>إجمالي الحساب:</span>
                  <span className="text-base text-[#102235]">
                    {subtotal} <span className="text-xs text-[#C58A24]">ر.س</span>
                  </span>
                </div>
              </div>
              {formErrors.cart && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold mt-2">
                  {formErrors.cart}
                </div>
              )}
            </div>

            {/* Customer Information Form */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                بيانات التواصل للتسليم
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="customer-name" className="block text-xs font-bold text-[#102235] mb-1">
                    الاسم الكامل <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="مثال: عبد الله محمد"
                    className={`w-full p-3 bg-slate-50 border rounded-xl text-sm ${
                      formErrors.fullName ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:border-[#C58A24]'
                    }`}
                  />
                  {formErrors.fullName && (
                    <span className="text-[11px] text-red-500 mt-1 block">
                      {formErrors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="customer-whatsapp" className="block text-xs font-bold text-[#102235] mb-1">
                    رقم الواتساب <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="customer-whatsapp"
                    type="tel"
                    dir="ltr"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    placeholder="+966 5X XXX XXXX"
                    className={`w-full p-3 bg-slate-50 border rounded-xl text-sm text-right ${
                      formErrors.whatsappNumber ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:border-[#C58A24]'
                    }`}
                  />
                  {formErrors.whatsappNumber && (
                    <span className="text-[11px] text-red-500 mt-1 block">
                      {formErrors.whatsappNumber}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="customer-email" className="block text-xs font-bold text-[#102235] mb-1">
                    البريد الإلكتروني (اختياري)
                  </label>
                  <input
                    id="customer-email"
                    type="email"
                    dir="ltr"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@university.edu"
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-[#C58A24]"
                  />
                  {formErrors.email && (
                    <span className="text-[11px] text-red-500 mt-1 block">
                      {formErrors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="customer-major" className="block text-xs font-bold text-[#102235] mb-1">
                    الجامعة أو التخصص الأكاديمي (اختياري)
                  </label>
                  <input
                    id="customer-major"
                    type="text"
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    placeholder="مثال: جامعة الملك سعود - إدارة أعمال"
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-[#C58A24]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="customer-notes" className="block text-xs font-bold text-[#102235] mb-1">
                  ملاحظات أو مواعيد محددة للتسليم (اختياري):
                </label>
                <textarea
                  id="customer-notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={2}
                  placeholder="اكتب هنا أي تفاصيل تخص الملفات، عدد الصفحات، الموعد النهائي..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-[#C58A24]"
                />
              </div>

            </div>

            {/* Privacy notice */}
            <div className="flex items-center gap-2 p-3 bg-amber-50/60 rounded-xl border border-amber-900/10 text-xs text-slate-700">
              <ShieldCheck className="w-4 h-4 text-[#C58A24] shrink-0" />
              <span>نلتزم بأعلى معايير السرية والأمان وحماية الملفات والبيانات الأكاديمية بنسبة 100%.</span>
            </div>

            {/* Submit Action with Authentic WhatsApp Icon */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-base font-bold flex items-center justify-center gap-3 shadow-lg shadow-emerald-700/20 hover:shadow-xl transition-all cursor-pointer group"
              >
                <WhatsAppIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                <span>تأكيد الطلب وإرسال التفاصيل عبر WhatsApp</span>
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2">
                سيتم فتح تطبيق WhatsApp الرسمي لإرسال ملخص الطلب والبدء بالتنفيذ.
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
