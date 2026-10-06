import React from 'react';
import { 
  BarChart3, 
  FileText, 
  Languages, 
  GraduationCap, 
  Presentation, 
  BookOpen, 
  FileBadge, 
  Globe, 
  CalendarCheck, 
  Mic, 
  BookMarked, 
  GitFork, 
  ArrowLeft 
} from 'lucide-react';
import { SERVICES_LIST } from '../data/servicesData';
import { useServices } from '../context/ServicesContext';
import { useCart } from '../context/CartContext';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onViewAllServices: () => void;
  onSelectCategory?: (categoryId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onViewAllServices, 
  onSelectCategory 
}) => {
  const { products } = useServices();
  const { setSelectedProductForDetails } = useCart();

  const getServiceIcon = (iconName: string) => {
    const props = { className: "w-7 h-7 text-[#C58A24]" };
    switch (iconName) {
      case 'BarChart3': return <BarChart3 {...props} />;
      case 'FileText': return <FileText {...props} />;
      case 'Languages': return <Languages {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'Presentation': return <Presentation {...props} />;
      case 'BookOpen': return <BookOpen {...props} />;
      case 'FileBadge': return <FileBadge {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'CalendarCheck': return <CalendarCheck {...props} />;
      case 'Mic': return <Mic {...props} />;
      case 'BookMarked': return <BookMarked {...props} />;
      case 'GitFork': return <GitFork {...props} />;
      default: return <GraduationCap {...props} />;
    }
  };

  const handleCardClick = (service: ServiceItem) => {
    if (service.productId) {
      const product = products.find(p => p.id === service.productId);
      if (product) {
        setSelectedProductForDetails(product);
        return;
      }
    }
    if (onSelectCategory) {
      onSelectCategory(service.category);
    }
    onViewAllServices();
  };

  return (
    <section id="services" className="py-14 sm:py-18 bg-[#FAF8F3] scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#102235] tracking-tight">
              خدماتنا التعليمية
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 font-medium">
              مجموعة متكاملة من الخدمات التي تلبي احتياجاتك الأكاديمية
            </p>
          </div>

          <button
            onClick={onViewAllServices}
            className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl border border-[#C58A24]/60 text-xs sm:text-sm font-bold text-[#C58A24] bg-white hover:bg-[#FAF3E5] hover:border-[#C58A24] transition-all shadow-2xs cursor-pointer group"
          >
            <span>عرض جميع الخدمات</span>
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 12-Card Grid (Exact Layout from Image) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              onClick={() => handleCardClick(service)}
              className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#C58A24]/60 transition-all duration-200 flex flex-col items-center text-center cursor-pointer min-h-[160px] justify-center"
            >
              {/* Icon Container with Subtle Gold Tint */}
              <div className="w-13 h-13 rounded-2xl bg-[#FAF3E5] border border-[#E6C27A]/40 flex items-center justify-center mb-3 group-hover:bg-[#C58A24] group-hover:border-[#C58A24] group-hover:scale-105 transition-all">
                <span className="group-hover:text-white transition-colors">
                  {getServiceIcon(service.iconName)}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xs sm:text-sm font-bold text-[#102235] leading-snug group-hover:text-[#C58A24] transition-colors">
                {service.title}
              </h3>

              {/* Subtitle */}
              {service.subtitle && (
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1 leading-tight">
                  {service.subtitle}
                </span>
              )}

              {/* Interactive prompt hover tag */}
              <span className="opacity-0 group-hover:opacity-100 text-[10px] font-bold text-[#C58A24] mt-2 transition-opacity">
                اطلب الآن ←
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
