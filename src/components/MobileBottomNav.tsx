import React from 'react';
import { Home, Layers, ShoppingBag, ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG, getWhatsAppLinkWithMessage } from '../config/siteConfig';
import { openExternalUrl } from '../utils/navigation';

interface MobileBottomNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeSection,
  onNavigate
}) => {
  const { totalItems, setIsCartOpen } = useCart();

  const handleWhatsApp = () => {
    const link = getWhatsAppLinkWithMessage(SITE_CONFIG.messages.generalInquiry);
    openExternalUrl(link);
  };

  const navItems = [
    { id: 'hero', label: 'الرئيسية', icon: Home },
    { id: 'services', label: 'الخدمات', icon: Layers },
    { id: 'store', label: 'المتجر', icon: ShoppingBag },
  ];

  return (
    <nav 
      aria-label="شريط التنقل السفلي للهاتف"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(16,34,53,0.08)] py-1.5 px-3 transition-transform"
    >
      <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-colors cursor-pointer ${
                isActive ? 'text-[#C58A24]' : 'text-slate-500 hover:text-[#102235]'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-[#FAF3E5]' : 'bg-transparent'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-bold mt-0.5 ${isActive ? 'text-[#C58A24]' : 'text-slate-600'}`}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Cart Item */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-500 hover:text-[#102235] transition-colors cursor-pointer"
        >
          <div className="p-1 relative">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -left-1 min-w-[18px] h-[18px] px-1 bg-[#C58A24] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-0.5 text-slate-600">
            السلة
          </span>
        </button>

        {/* WhatsApp Quick Action */}
        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer"
        >
          <div className="p-1 rounded-lg bg-emerald-50 text-emerald-600">
            <MessageCircle className="w-5 h-5 fill-emerald-600/20" />
          </div>
          <span className="text-[10px] font-bold mt-0.5 text-emerald-700">
            واتساب
          </span>
        </button>
      </div>
    </nav>
  );
};
