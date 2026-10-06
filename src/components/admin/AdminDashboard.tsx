import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  Check, 
  X, 
  ExternalLink, 
  LogOut, 
  Eye, 
  EyeOff, 
  DollarSign, 
  AlertCircle, 
  CheckCircle2, 
  Edit3,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { BrandLogo } from '../BrandLogo';
import { Product } from '../../types';
import { useServices } from '../../context/ServicesContext';

interface AdminDashboardProps {
  token: string;
  user: any;
  onLogout: () => void;
  onViewSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  token,
  user,
  onLogout,
  onViewSite
}) => {
  const { refreshServices } = useServices();
  const [services, setServices] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Add Service Form Toggle
  const [showAddForm, setShowAddForm] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('academic_services');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServiceUnit, setNewServiceUnit] = useState('خدمة');
  const [addingService, setAddingService] = useState(false);

  // Edit Service State (inline or modal)
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);

  // Delete Confirmation
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch all services including hidden ones for admin
  const loadServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/services?all=true', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.data)) {
        setServices(data.data);
      } else {
        throw new Error(data.error || 'فشل في تحميل الخدمات');
      }
    } catch (err: any) {
      showToast(err.message || 'حدث خطأ في جلب البيانات', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, [token]);

  // Start Editing a service
  const handleStartEdit = (service: Product) => {
    setEditingServiceId(service.id);
    setEditName(service.name);
    setEditPrice(String(service.price));
    setEditDesc(service.description);
  };

  const handleCancelEdit = () => {
    setEditingServiceId(null);
    setEditName('');
    setEditPrice('');
    setEditDesc('');
  };

  // Save Service Changes (Name, Price, Description)
  const handleSaveEdit = async (id: string) => {
    const numPrice = Number(editPrice);
    if (isNaN(numPrice) || numPrice < 0) {
      showToast('يرجى إدخال سعر صحيح', 'error');
      return;
    }

    try {
      setSavingId(id);
      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: editName.trim(),
          price: numPrice,
          description: editDesc.trim()
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'فشل في حفظ التعديلات');
      }

      setServices(prev => prev.map(s => s.id === id ? { ...s, ...data.data } : s));
      setEditingServiceId(null);
      await refreshServices(); // Update public site context immediately
      showToast('تم حفظ التعديلات وتحديث السعر بنجاح');
    } catch (err: any) {
      showToast(err.message || 'فشل الحفظ', 'error');
    } finally {
      setSavingId(null);
    }
  };

  // Toggle Service Visibility (Hide / Show)
  const handleToggleActive = async (service: Product) => {
    const currentActive = service.is_active !== undefined ? service.is_active : service.available;
    const nextActive = !currentActive;

    try {
      const res = await fetch(`/api/services/${service.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          is_active: nextActive,
          available: nextActive
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'فشل في تحديث حالة الخدمة');
      }

      setServices(prev => prev.map(s => s.id === service.id ? { ...s, is_active: nextActive, available: nextActive } : s));
      await refreshServices();
      showToast(nextActive ? 'الخدمة الآن ظاهرة للزوار في الموقع' : 'تم إخفاء الخدمة عن الزوار');
    } catch (err: any) {
      showToast(err.message || 'فشل في تحديث الحالة', 'error');
    }
  };

  // Delete Service
  const handleDeleteService = async (id: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه الخدمة نهائياً؟')) {
      return;
    }

    try {
      setDeletingId(id);
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'فشل في حذف الخدمة');
      }

      setServices(prev => prev.filter(s => s.id !== id));
      await refreshServices();
      showToast('تم حذف الخدمة بنجاح');
    } catch (err: any) {
      showToast(err.message || 'فشل في حذف الخدمة', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  // Add New Service
  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim()) {
      showToast('يرجى كتابة اسم الخدمة', 'error');
      return;
    }

    const priceNum = Number(newServicePrice);
    if (isNaN(priceNum) || priceNum < 0) {
      showToast('يرجى تحديد سعر صحيح', 'error');
      return;
    }

    try {
      setAddingService(true);
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newServiceName.trim(),
          price: priceNum,
          description: newServiceDesc.trim(),
          category: newServiceCategory,
          unitLabel: newServiceUnit.trim() || 'خدمة',
          is_active: true
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'فشل في إضافة الخدمة');
      }

      setServices(prev => [data.data, ...prev]);
      setShowAddForm(false);
      setNewServiceName('');
      setNewServicePrice('');
      setNewServiceDesc('');
      setNewServiceUnit('خدمة');
      await refreshServices();
      showToast('تمت إضافة الخدمة الجديدة بنجاح');
    } catch (err: any) {
      showToast(err.message || 'فشل إضافة الخدمة', 'error');
    } finally {
      setAddingService(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#102235]" dir="rtl">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-sm font-bold animate-in fade-in slide-in-from-bottom-4 duration-200 ${
          toast.type === 'success' 
            ? 'bg-[#102235] text-[#E6C27A] border border-[#C58A24]/40' 
            : 'bg-rose-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5" />}
          <span>{toast.text}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="bg-[#102235] text-white border-b-2 border-[#C58A24]/40 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <BrandLogo size="md" variant="light" />
            <div className="border-r border-white/20 pr-4">
              <h1 className="text-base sm:text-lg font-black text-white">
                لوحة إدارة الخدمات والأسعار
              </h1>
              <p className="text-xs text-slate-300">
                حساب المالك: <span className="font-mono text-[#E6C27A]">{user?.email || 'admin'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onViewSite}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-[#E6C27A]" />
              <span>معاينة الموقع العام</span>
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-[#102235]">قائمة الخدمات المعروضة</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              يمكنك تعديل الأسعار، تعديل الأسماء والأوصاف، إخفاء أو إظهار الخدمات، أو إضافة وحذف الخدمات فورياً.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadServices}
              title="تحديث القائمة"
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-[#C58A24] hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C58A24] hover:bg-[#a6721b] text-white text-xs font-bold shadow-md shadow-amber-900/10 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddForm ? 'إلغاء الإضافة' : 'إضافة خدمة جديدة'}</span>
            </button>
          </div>
        </div>

        {/* Collapsible Add Service Form */}
        {showAddForm && (
          <div className="mb-8 bg-white p-6 rounded-2xl shadow-md border-2 border-[#C58A24]/40 animate-in fade-in duration-200">
            <h3 className="text-base font-bold text-[#102235] mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#C58A24]" />
              <span>إضافة خدمة جديدة إلى المنصة</span>
            </h3>

            <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اسم الخدمة *</label>
                <input
                  type="text"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="مثال: إعداد رسائل الماجستير والبحوث"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#C58A24] focus:ring-1 focus:ring-[#C58A24] outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">السعر بالريال السعودي (ر.س) *</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={newServicePrice}
                  onChange={(e) => setNewServicePrice(e.target.value)}
                  placeholder="100"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#C58A24] focus:ring-1 focus:ring-[#C58A24] outline-none text-sm font-bold font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">التصنيف الأكاديمي</label>
                <select
                  value={newServiceCategory}
                  onChange={(e) => setNewServiceCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#C58A24] focus:ring-1 focus:ring-[#C58A24] outline-none text-sm bg-white"
                >
                  <option value="exams_homework">الاختبارات والواجبات</option>
                  <option value="research_reports">البحوث والتقارير الأكاديمية</option>
                  <option value="presentations_design">العروض والتصاميم</option>
                  <option value="data_tech">تحليل البيانات والبرمجة</option>
                  <option value="translation_editing">الترجمة والتدقيق</option>
                  <option value="academic_services">الخدمات الأكاديمية العامة</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">وحدة القياس</label>
                <input
                  type="text"
                  value={newServiceUnit}
                  onChange={(e) => setNewServiceUnit(e.target.value)}
                  placeholder="مثال: بحث / واجب / صفحة"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#C58A24] focus:ring-1 focus:ring-[#C58A24] outline-none text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">وصف الخدمة ومميزاتها</label>
                <textarea
                  rows={3}
                  value={newServiceDesc}
                  onChange={(e) => setNewServiceDesc(e.target.value)}
                  placeholder="اكتب شرحاً واضحاً عما يقدمه هذا العمل للطالب..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#C58A24] focus:ring-1 focus:ring-[#C58A24] outline-none text-sm"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={addingService}
                  className="px-6 py-2.5 rounded-xl bg-[#102235] hover:bg-[#1A3654] text-[#E6C27A] text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
                >
                  {addingService ? 'جارٍ الحفظ...' : 'حفظ الخدمة ونشرها'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Services List */}
        {loading ? (
          <div className="py-20 text-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#C58A24] mb-3" />
            <p className="text-sm font-bold">جارٍ تحميل قائمة الخدمات...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">لا توجد خدمات حالياً.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {services.map((service) => {
              const isEditing = editingServiceId === service.id;
              const isSaving = savingId === service.id;
              const isDeleting = deletingId === service.id;
              const isActive = service.is_active !== undefined ? service.is_active : service.available;

              return (
                <div
                  key={service.id}
                  className={`bg-white rounded-2xl p-5 border transition-all shadow-sm ${
                    isActive ? 'border-slate-200 hover:border-slate-300' : 'border-slate-300 bg-slate-50/60 opacity-80'
                  }`}
                >
                  {isEditing ? (
                    // Editing Mode
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-600 mb-1">اسم الخدمة</label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-[#C58A24] focus:ring-1 focus:ring-[#C58A24] outline-none text-sm font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">السعر (ر.س)</label>
                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                              className="w-full pl-3 pr-8 py-2 rounded-xl border border-slate-200 focus:border-[#C58A24] focus:ring-1 focus:ring-[#C58A24] outline-none text-sm font-bold font-mono text-[#C58A24]"
                            />
                            <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">ر.س</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">وصف الخدمة</label>
                        <textarea
                          rows={2}
                          value={editDesc}
                          onChange={(e) => setEditDesc(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-[#C58A24] focus:ring-1 focus:ring-[#C58A24] outline-none text-xs leading-relaxed"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          onClick={handleCancelEdit}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>إلغاء</span>
                        </button>
                        <button
                          onClick={() => handleSaveEdit(service.id)}
                          disabled={isSaving}
                          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow cursor-pointer disabled:opacity-50"
                        >
                          {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                          <span>حفظ التعديلات</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                      
                      {/* Service Details */}
                      <div className="flex-1 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-[#102235]">
                            {service.name}
                          </h3>
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                            isActive 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : 'bg-slate-100 text-slate-600 border border-slate-300'
                          }`}>
                            {isActive ? 'ظاهر للزوار' : 'مخفي'}
                          </span>
                          {service.categoryNameAr && (
                            <span className="text-[11px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                              {service.categoryNameAr}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl line-clamp-2">
                          {service.description}
                        </p>
                      </div>

                      {/* Price & Actions */}
                      <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                        {/* Price Badge */}
                        <div className="flex items-center gap-1.5 bg-[#FAF8F3] px-3.5 py-2 rounded-xl border border-amber-900/10">
                          <span className="text-xs text-slate-500 font-bold">السعر:</span>
                          <span className="text-base font-black text-[#C58A24] font-mono">
                            {service.price}
                          </span>
                          <span className="text-xs text-slate-600 font-bold">ر.س</span>
                          {service.unitLabel && (
                            <span className="text-[10px] text-slate-400">/ {service.unitLabel}</span>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2">
                          {/* Quick Edit */}
                          <button
                            onClick={() => handleStartEdit(service)}
                            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-[#102235] text-slate-700 hover:text-white text-xs font-bold transition-all cursor-pointer"
                            title="تعديل السعر أو الاسم أو الوصف"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>تعديل</span>
                          </button>

                          {/* Toggle Active */}
                          <button
                            onClick={() => handleToggleActive(service)}
                            className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isActive
                                ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200'
                                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}
                            title={isActive ? 'إخفاء الخدمة عن الزوار' : 'إظهار الخدمة للزوار'}
                          >
                            {isActive ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            <span>{isActive ? 'إخفاء' : 'إظهار'}</span>
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            disabled={isDeleting}
                            className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer disabled:opacity-50"
                            title="حذف الخدمة"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </main>
    </div>
  );
};
