import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  variant = 'dark'
}) => {
  const sizeMap = {
    sm: { img: 'w-9 h-9', title: 'text-base', sub: 'text-[10px]' },
    md: { img: 'w-12 h-12', title: 'text-xl sm:text-2xl', sub: 'text-xs' },
    lg: { img: 'w-16 h-16', title: 'text-2xl sm:text-3xl', sub: 'text-sm' },
    xl: { img: 'w-24 h-24', title: 'text-3xl sm:text-4xl', sub: 'text-base' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Emblem Logo Badge */}
      <div className={`relative ${currentSize.img} rounded-full overflow-hidden shrink-0 border-2 border-[#C58A24]/60 shadow-md bg-[#FAF8F3] group-hover:border-[#C58A24] transition-all`}>
        <img
          src="/assets/images/brand_logo_education_vision_1791033694890.jpg"
          alt="شعار منصة رؤية التعليم - Education Vision"
          className="w-full h-full object-cover object-center scale-105"
        />
      </div>

      {showText && (
        <div className="flex flex-col text-right">
          <div className="flex items-baseline gap-1.5">
            <span className={`font-black tracking-tight leading-tight ${currentSize.title} ${variant === 'dark' ? 'text-[#102235]' : 'text-white'}`}>
              رؤية التعليم
            </span>
            <span className="text-[11px] font-bold text-[#C58A24] hidden sm:inline" dir="ltr">
              Education Vision
            </span>
          </div>
          <span className={`font-medium leading-tight ${currentSize.sub} text-[#C58A24]`}>
            خدمات الطلاب والأكاديمية
          </span>
        </div>
      )}
    </div>
  );
};
