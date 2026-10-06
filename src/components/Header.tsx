import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  FileText,
  Lock
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLinkWithMessage } from '../config/siteConfig';
import { useCart } from '../context/CartContext';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { openExternalUrl } from '../utils/navigation';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  const navLinks = [
    { id: 'hero', label: 'الرئيسية' },
    { id: 'services', label: 'الخدمات' },
    { id: 'store', label: 'المتجر' },
    { id: 'how-it-works', label: 'كيف نعمل' },
    { id: 'faq', label: 'الأسئلة الشائعة' },
    { id: 'about', label: 'من نحن' },
    { id: 'contact', label: 'تواصل معنا' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleAdminClick = () => {
    setMobileMenuOpen(false);
    window.history.pushState({}, '', '/admin');
  };

  const handleTrackOrder = () => {
    const link = getWhatsAppLinkWithMessage(SITE_CONFIG.messages.trackOrder);
    openExternalUrl(link);
  };

  const handleNewOrder = () => {
    const link = getWhatsAppLinkWithMessage(SITE_CONFIG.messages.newOrder);
    openExternalUrl(link);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-amber-900/10 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Brand Logo with Official Monogram (Right side in RTL) */}
            <div 
              onClick={() => handleLinkClick('hero')}
              className="cursor-pointer group"
            >
              <BrandLogo size="md" />
            </div>

            {/* Desktop Navigation Links (Center) */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-sm font-semibold transition-all relative py-1 cursor-pointer ${
                      isActive 
                        ? 'text-[#C58A24]' 
                        : 'text-[#102235]/80 hover:text-[#C58A24]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C58A24] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons & Cart (Left side in RTL) */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Cart Icon Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="سلة المشتريات"
                className="relative p-2.5 rounded-xl border border-slate-200 hover:border-[#C58A24] text-[#102235] hover:text-[#C58A24] hover:bg-amber-50/50 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -left-1.5 min-w-[20px] h-5 px-1.5 bg-[#C58A24] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-75 duration-200">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Track Order Button */}
              <button
                onClick={handleTrackOrder}
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-[#C58A24] border border-[#C58A24] rounded-xl hover:bg-amber-500/10 transition-colors whitespace-nowrap cursor-pointer shadow-2xs"
              >
                <FileText className="w-4 h-4" />
                <span>تابع طلبك</span>
              </button>

              {/* Real WhatsApp Icon "طلب جديد" Button */}
              <button
                onClick={handleNewOrder}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#102235] hover:bg-[#1f3f63] border border-[#102235] rounded-xl shadow-xs transition-all whitespace-nowrap cursor-pointer group"
              >
                <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center p-0.5 group-hover:scale-110 transition-transform">
                  <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <span>طلب جديد</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="القائمة الرئيسية"
                className="p-2 sm:p-2.5 rounded-xl border border-slate-200 text-[#102235] lg:hidden hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Dropdown with Backdrop */}
          {mobileMenuOpen && (
            <>
              <div 
                className="lg:hidden fixed inset-0 top-16 sm:top-20 z-30 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
                onClick={() => setMobileMenuOpen(false)}
              />
              <div className="lg:hidden relative z-40 border-t border-slate-100 py-4 px-2 space-y-2 bg-white rounded-b-2xl shadow-xl animate-in slide-in-from-top-2 duration-200">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`w-full text-right px-4 py-3 rounded-xl text-sm font-bold transition-colors cursor-pointer flex items-center justify-between ${
                      activeSection === link.id
                        ? 'bg-amber-50 text-[#C58A24]'
                        : 'text-[#102235] hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-slate-300">←</span>
                  </button>
                ))}

                {/* Administration Link (Simple access to /admin with lock icon) */}
                <button
                  onClick={handleAdminClick}
                  className="w-full text-right px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-[#102235] hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between group border-t border-slate-100 mt-1"
                >
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#C58A24] transition-colors" />
                    <span>الإدارة</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">لوحة التحكم</span>
                </button>

                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { handleTrackOrder(); setMobileMenuOpen(false); }}
                    className="flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-[#C58A24] border border-[#C58A24] rounded-xl hover:bg-amber-50 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>تابع طلبك</span>
                  </button>
                  <button
                    onClick={() => { handleNewOrder(); setMobileMenuOpen(false); }}
                    className="flex items-center justify-center gap-2 py-3 text-xs font-bold text-white bg-[#102235] rounded-xl hover:bg-[#1a3450] transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    <span>طلب جديد</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </header>
  );
};
