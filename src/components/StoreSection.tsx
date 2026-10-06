import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  ShoppingBag, 
  ArrowUpDown, 
  Check, 
  Tag, 
  Eye 
} from 'lucide-react';
import { useServices } from '../context/ServicesContext';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface StoreSectionProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const StoreSection: React.FC<StoreSectionProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc'>('featured');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const { products, categories } = useServices();
  const { addToCart, setSelectedProductForDetails } = useCart();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = 
        selectedCategory === 'all' || product.category === selectedCategory;
      
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = 
        !q || 
        product.name.toLowerCase().includes(q) || 
        product.description.toLowerCase().includes(q) ||
        product.categoryNameAr.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      // Default: featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnimationId(product.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  return (
    <section id="store" className="py-16 sm:py-20 bg-white border-t border-slate-200/60 scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF3E5] text-[#C58A24] text-xs font-bold mb-3">
            <Tag className="w-3.5 h-3.5" />
            <span>المتجر الأكاديمي والطلابي</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#102235] tracking-tight">
            متجر خدمات رؤية التعليم
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 font-medium">
            اختر خدمتك الأكاديمية بالكمية المطلوبة مع أسعار واضحة ودقة تنفيذ مضمونة، واطلبها فوراً عبر السلة أو واتساب.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#FAF8F3] p-4 sm:p-5 rounded-2xl border border-slate-200/80 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن خدمة، بحث، واجب، تحليل، بوربوينت..."
                className="w-full pl-10 pr-10 py-3 bg-white border border-slate-300 rounded-xl text-sm text-[#102235] placeholder:text-slate-400 focus:outline-hidden focus:border-[#C58A24] focus:ring-2 focus:ring-[#C58A24]/20 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="مسح البحث"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto self-end md:self-auto">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#C58A24]" />
                <span>الترتيب:</span>
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full md:w-auto px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-[#102235] focus:outline-hidden focus:border-[#C58A24] transition-colors cursor-pointer"
              >
                <option value="featured">المميز والأكثر طلباً</option>
                <option value="price_asc">السعر: من الأقل للأعلى</option>
                <option value="price_desc">السعر: من الأعلى للأقل</option>
              </select>
            </div>

          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#102235] text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200/80 hover:border-[#C58A24] hover:text-[#C58A24]'
                  }`}
                >
                  {cat.nameAr}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF8F3] rounded-3xl border border-dashed border-slate-300">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#102235]">لم يتم العثور على خدمات مطابقة</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً من القائمة أعلاه.
            </p>
            <button
              onClick={() => { setSearchQuery(''); onSelectCategory('all'); }}
              className="mt-4 px-4 py-2 bg-[#C58A24] text-white text-xs font-bold rounded-xl hover:bg-[#a9751d] transition-colors"
            >
              عرض جميع الخدمات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => {
              const isAdded = addedAnimationId === product.id;
              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProductForDetails(product)}
                  className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-xl hover:border-[#C58A24]/70 transition-all duration-300 flex flex-col cursor-pointer"
                >
                  {/* Product Image Slot */}
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#102235]/90 backdrop-blur-xs text-white text-[11px] font-bold shadow-xs">
                        {product.badge}
                      </span>
                    )}

                    {/* Quick view button overlay */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <span className="px-3.5 py-1.5 rounded-xl bg-white text-[#102235] text-xs font-bold shadow-md flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-[#C58A24]" />
                        <span>تفاصيل الخدمة</span>
                      </span>
                    </div>
                  </div>

                  {/* Product Card Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category Label */}
                      <span className="text-[11px] font-semibold text-[#C58A24] block mb-1">
                        {product.categoryNameAr}
                      </span>

                      {/* Product Name */}
                      <h3 className="text-sm sm:text-base font-bold text-[#102235] group-hover:text-[#C58A24] transition-colors leading-snug line-clamp-2 mb-2">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                        {product.description}
                      </p>
                    </div>

                    {/* Price and Add to Cart */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-black text-[#102235]">
                            {product.price}
                          </span>
                          <span className="text-xs font-bold text-[#C58A24]">
                            ر.س
                          </span>
                          {product.oldPrice && (
                            <span className="text-xs text-slate-400 line-through">
                              {product.oldPrice} ر.س
                            </span>
                          )}
                        </div>
                        {product.unitLabel && (
                          <span className="text-[10px] text-slate-400 block">
                            لكل {product.unitLabel}
                          </span>
                        )}
                      </div>

                      {/* Add Button */}
                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#FAF3E5] hover:bg-[#C58A24] text-[#C58A24] hover:text-white border border-[#E6C27A]/60 hover:border-[#C58A24]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>تمت الإضافة!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>أضف للسلة</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
