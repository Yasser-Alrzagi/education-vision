import React, { useState, useEffect } from 'react';
import { 
  X, 
  Minus, 
  Plus, 
  ShoppingBag, 
  CheckCircle2, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG, getWhatsAppLinkWithMessage } from '../config/siteConfig';
import { WhatsAppIcon } from './WhatsAppIcon';
import { openExternalUrl } from '../utils/navigation';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    setQuantity(1);
    setNotes('');
    setIsAdded(false);
  }, [product]);

  if (!product) return null;

  const unitPrice = product.price;
  const totalPrice = unitPrice * quantity;

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity, notes.trim());
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  const handleDirectWhatsAppOrder = () => {
    const message = `السلام عليكم،
أرغب في طلب الخدمة التالية من منصة رؤية التعليم (${SITE_CONFIG.shortDomain}):

• الخدمة: ${product.name}
• التصنيف: ${product.categoryNameAr}
• الكمية المطلوبة: ${quantity}
• سعر الوحدة: ${unitPrice} ر.س
• الإجمالي: ${totalPrice} ر.س
${notes.trim() ? `• ملاحظات وتفاصيل إضافية: ${notes.trim()}\n` : ''}
أرجو التواصل معي لتأكيد استلام الطلب والبدء بالتنفيذ.`;

    const link = getWhatsAppLinkWithMessage(message);
    openExternalUrl(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      
      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="إغلاق النافذة"
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/90 text-slate-700 hover:text-red-600 hover:bg-white shadow-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Media Header */}
        <div className="relative h-56 sm:h-72 w-full bg-slate-900 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute bottom-4 right-4 left-4 text-right">
            <span className="inline-block px-3 py-1 rounded-full bg-[#C58A24] text-white text-xs font-bold mb-2 shadow-xs">
              {product.categoryNameAr}
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-white leading-tight">
              {product.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-6 max-h-[60vh] overflow-y-auto text-right">
          
          {/* Price & Unit Details */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF8F3] border border-amber-900/10">
            <div>
              <span className="text-xs text-slate-500 block font-medium">سعر الوحدة</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-black text-[#102235]">
                  {unitPrice}
                </span>
                <span className="text-sm font-bold text-[#C58A24]">
                  ر.س
                </span>
                {product.oldPrice && (
                  <span className="text-xs text-slate-400 line-through mr-1">
                    {product.oldPrice} ر.س
                  </span>
                )}
              </div>
            </div>

            {product.unitLabel && (
              <span className="text-xs font-bold text-[#102235] bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                لكل {product.unitLabel}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              وصف الخدمة ومميزاتها
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {product.description}
            </p>
          </div>

          {/* Deliverables Checklist */}
          {product.details && product.details.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                ما ستحصل عليه مع هذا الطلب
              </h4>
              <ul className="space-y-2">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#C58A24] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity Selector with Live Calculation */}
          <div className="pt-4 border-t border-slate-200/80">
            <label className="block text-xs font-bold text-[#102235] mb-2.5">
              تحديد الكمية المطلوبة:
            </label>
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200">
              
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDecrement}
                  aria-label="إنقاص الكمية"
                  className="w-9 h-9 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:border-[#C58A24] hover:text-[#C58A24] active:scale-95 transition-all cursor-pointer font-bold"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-lg font-black text-[#102235]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  aria-label="زيادة الكمية"
                  className="w-9 h-9 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:border-[#C58A24] hover:text-[#C58A24] active:scale-95 transition-all cursor-pointer font-bold"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Real-time Math Display */}
              <div className="text-left">
                <span className="text-[11px] text-slate-400 block font-medium">
                  {unitPrice} × {quantity} =
                </span>
                <span className="text-lg font-black text-[#102235]">
                  {totalPrice} <span className="text-xs font-bold text-[#C58A24]">ر.س</span>
                </span>
              </div>

            </div>
          </div>

          {/* Notes Input */}
          <div>
            <label htmlFor="service-notes" className="block text-xs font-bold text-[#102235] mb-1.5">
              ملاحظات أو مواصفات خاصة بالطلب (اختياري):
            </label>
            <textarea
              id="service-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="اكتب هنا أي تفاصيل، عنوان البحث، موعد التسليم المطلوب، أو رابط الملفات..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-[#C58A24] transition-all"
            />
          </div>

          {/* Trust Guarantees */}
          <div className="flex items-center justify-around py-3 px-4 rounded-xl bg-amber-50/50 border border-amber-900/5 text-slate-600 text-xs">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#C58A24]" />
              سرية بيانات تامة
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-[#C58A24]" />
              التزام دقيق بالموعد
            </span>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
          
          <button
            onClick={handleAddToCart}
            className={`w-full sm:flex-1 py-3.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#102235] text-white hover:bg-[#1a3552]'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#C58A24]" />
            <span>
              {isAdded ? 'تمت الإضافة بنجاح!' : `أضف إلى السلة (${totalPrice} ر.س)`}
            </span>
          </button>

          <button
            onClick={handleDirectWhatsAppOrder}
            className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>طلب فوري عبر واتساب</span>
          </button>

        </div>

      </div>
    </div>
  );
};
