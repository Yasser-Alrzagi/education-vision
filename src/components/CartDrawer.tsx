import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowLeft, 
  Sparkles 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    subtotal, 
    totalItems,
    setIsCheckoutOpen 
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-start animate-in fade-in duration-200">
      
      {/* Backdrop overlay click to close */}
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={() => setIsCartOpen(false)} 
      />

      {/* Drawer Container (Side in RTL is Left/Right) */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-[#FAF8F3]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#102235] text-[#C58A24] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#102235]">سلة المشتريات</h3>
              <span className="text-xs text-slate-500 font-medium">
                {totalItems} {totalItems === 1 ? 'خدمة مختارة' : 'خدمات مختارة'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="إغلاق السلة"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-[#102235] mb-1">
                سلة طلباتك فارغة حالياً
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xs mb-6">
                استكشف خدماتنا الأكاديمية والطلابية وأضف ما يناسبك إلى السلة.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-[#102235] text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-[#1b3654] transition-colors"
              >
                تصفح الخدمات الآن
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => {
                const itemTotal = item.product.price * item.quantity;
                return (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-2xl border border-slate-200/90 bg-white hover:border-[#C58A24]/40 transition-all flex gap-3"
                  >
                    {/* Thumbnail */}
                    <div className="w-18 h-18 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-[#C58A24]">
                            {item.product.categoryNameAr}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-[#102235] leading-snug line-clamp-1">
                            {item.product.name}
                          </h4>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          aria-label="حذف من السلة"
                          className="text-slate-300 hover:text-red-500 p-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity Controls & Math */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-[#C58A24] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-black text-[#102235] w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-[#C58A24] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-left">
                          <span className="text-[10px] text-slate-400 block">
                            {item.product.price} × {item.quantity}
                          </span>
                          <span className="text-sm font-black text-[#102235]">
                            {itemTotal} <span className="text-[11px] font-bold text-[#C58A24]">ر.س</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Clear Cart Link */}
              <div className="text-center pt-2">
                <button
                  onClick={clearCart}
                  className="text-xs font-semibold text-slate-400 hover:text-red-600 transition-colors"
                >
                  تفريغ السلة بالكامل
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-[#FAF8F3] space-y-3">
            
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span className="font-bold text-[#102235]">{subtotal} ر.س</span>
              </div>
              <div className="flex justify-between">
                <span>رسوم الخدمة والضريبة:</span>
                <span className="font-bold text-emerald-600">شاملة ومجانية</span>
              </div>
              <div className="flex justify-between text-base font-black text-[#102235] pt-2 border-t border-slate-200/80">
                <span>إجمالي الطلب:</span>
                <span className="text-[#102235]">
                  {subtotal} <span className="text-xs font-bold text-[#C58A24]">ر.س</span>
                </span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-[#102235] hover:bg-[#1a3552] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <span>المتابعة إلى إتمام الطلب</span>
              <ArrowLeft className="w-4 h-4 text-[#C58A24]" />
            </button>

            <p className="text-[11px] text-center text-slate-500 font-medium flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C58A24]" />
              <span>سيتم تأكيد تفاصيل التسليم والموعد بدقة عبر واتساب</span>
            </p>

          </div>
        )}

      </div>
    </div>
  );
};
