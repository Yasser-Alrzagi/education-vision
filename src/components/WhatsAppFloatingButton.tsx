import React, { useState } from 'react';
import { X } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLinkWithMessage } from '../config/siteConfig';
import { WhatsAppIcon } from './WhatsAppIcon';
import { openExternalUrl } from '../utils/navigation';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    const link = getWhatsAppLinkWithMessage(SITE_CONFIG.messages.generalInquiry);
    openExternalUrl(link);
  };

  return (
    <div className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-30 flex items-center gap-3">
      
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-[#102235] px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200 text-xs font-bold animate-in fade-in duration-200">
          <span>تواصل مباشرة عبر واتساب</span>
          <button 
            onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Official WhatsApp Floating Action Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        aria-label="تواصل عبر واتساب"
        className="group relative w-15 h-15 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl hover:scale-108 transition-all duration-300 cursor-pointer focus:outline-hidden"
      >
        {/* Pulsing ring in WhatsApp green */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping" />
        
        {/* Authentic WhatsApp Icon */}
        <WhatsAppIcon className="w-9 h-9 text-white relative z-10 drop-shadow-xs" />
      </button>

    </div>
  );
};
