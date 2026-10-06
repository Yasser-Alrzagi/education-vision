import React, { useState } from 'react';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { BrandLogo } from '../BrandLogo';

interface AdminLoginProps {
  onLoginSuccess: (token: string, user: any) => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToSite }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'فشل تسجيل الدخول، يرجى التأكد من البيانات');
      }

      onLoginSuccess(data.token, data.user);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ في الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#102235] flex items-center justify-center p-4 sm:p-6" dir="rtl">
      <div className="w-full max-w-md relative z-10">
        
        {/* Back button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-[#E6C27A] transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى الموقع العام</span>
          </button>
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/10 text-amber-300 font-mono">
            نظام إدارة آمن
          </span>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-900/10">
          
          <div className="text-center mb-8">
            <div className="inline-block mb-3">
              <BrandLogo size="lg" />
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-2 text-[#C58A24]">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">لوحة تحكم مالك المنصة</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#102235] mt-1">
              تسجيل الدخول للإدارة
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              أدخل بيانات حساب المالك لإدارة الخدمات والأسعار
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#102235] mb-1.5 text-right">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  dir="ltr"
                  className="w-full pl-3 pr-10 py-3 rounded-xl border border-slate-200 focus:border-[#C58A24] focus:ring-2 focus:ring-[#C58A24]/20 outline-none text-sm transition-all text-left font-mono"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102235] mb-1.5 text-right">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  dir="ltr"
                  className="w-full pl-3 pr-10 py-3 rounded-xl border border-slate-200 focus:border-[#C58A24] focus:ring-2 focus:ring-[#C58A24]/20 outline-none text-sm transition-all text-left font-mono"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#102235] to-[#1A3654] hover:from-[#0B1826] hover:to-[#132A42] text-white text-sm font-bold shadow-lg shadow-slate-900/10 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#E6C27A]" />
                  <span>جارٍ تسجيل الدخول...</span>
                </>
              ) : (
                <span>دخول لوحة التحكم</span>
              )}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
