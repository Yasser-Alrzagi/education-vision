import React, { useState, useEffect } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { Loader2 } from 'lucide-react';

interface AdminAppProps {
  onBackToSite: () => void;
}

export const AdminApp: React.FC<AdminAppProps> = ({ onBackToSite }) => {
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem('vision_admin_token');
    } catch {
      return null;
    }
  });
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem('vision_admin_token');
    } catch {
      return false;
    }
  });

  // Verify stored token on mount
  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem('vision_admin_token');
      if (!storedToken) {
        setToken(null);
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });

        const data = await res.json();
        if (res.ok && data.success && data.user) {
          setToken(storedToken);
          setUser(data.user);
        } else {
          // Token expired or invalid
          localStorage.removeItem('vision_admin_token');
          setToken(null);
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to verify admin token:', err);
        // Retain state or clear on error
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const handleLoginSuccess = (newToken: string, newUser: any) => {
    localStorage.setItem('vision_admin_token', newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('vision_admin_token');
    setToken(null);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#102235] flex items-center justify-center p-4" dir="rtl">
        <div className="text-center text-[#E6C27A]">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" />
          <span className="text-sm font-bold">جارٍ التحقق من صلاحيات الدخول...</span>
        </div>
      </div>
    );
  }

  if (!token || !user) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} onBackToSite={onBackToSite} />;
  }

  return (
    <AdminDashboard
      token={token}
      user={user}
      onLogout={handleLogout}
      onViewSite={onBackToSite}
    />
  );
};
