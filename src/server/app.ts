import express, { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { db } from './db.js';

// Load environment variables
dotenv.config();

export const app = express();
app.use(express.json({ limit: '1mb' }));

// Determine environment
const isProd = process.env.NODE_ENV === 'production';

// Admin credentials and JWT configuration from environment variables
const getAdminConfig = () => {
  const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || '';
  const name = (process.env.ADMIN_NAME || 'مالك المنصة').trim();
  const jwtSecret = process.env.JWT_SECRET || '';

  return { email, password, name, jwtSecret };
};

// Valid categories matching ProductCategory type
const VALID_CATEGORIES = new Set([
  'exams_homework',
  'research_reports',
  'presentations_design',
  'data_tech',
  'translation_editing',
  'academic_services',
  'digital_products'
]);

// Category Arabic names mapping
const CATEGORY_NAMES_AR: Record<string, string> = {
  exams_homework: 'الاختبارات والواجبات',
  research_reports: 'البحوث والتقارير',
  presentations_design: 'العروض والتصاميم',
  data_tech: 'تحليل البيانات والبرمجة',
  translation_editing: 'الترجمة والتدقيق',
  academic_services: 'الخدمات الأكاديمية',
  digital_products: 'المنتجات الرقمية'
};

// Constant-time string comparison to prevent timing attacks
const safeStringCompare = (a: string, b: string): boolean => {
  if (!a || !b) return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Perform dummy timing safe compare to maintain consistent time
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
};

// Brute-force protection: in-memory tracking of failed attempts per IP
interface RateLimitRecord {
  attempts: number;
  lockedUntil: number;
}
const loginAttempts = new Map<string, RateLimitRecord>();
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes lockout

const checkRateLimit = (ip: string): { allowed: boolean; remainingMs?: number } => {
  const record = loginAttempts.get(ip);
  if (!record) return { allowed: true };

  const now = Date.now();
  if (record.lockedUntil > now) {
    return { allowed: false, remainingMs: record.lockedUntil - now };
  }

  if (record.lockedUntil <= now && record.attempts >= MAX_LOGIN_ATTEMPTS) {
    loginAttempts.delete(ip);
  }

  return { allowed: true };
};

const recordFailedAttempt = (ip: string) => {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { attempts: 0, lockedUntil: 0 };
  record.attempts += 1;
  if (record.attempts >= MAX_LOGIN_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_WINDOW_MS;
  }
  loginAttempts.set(ip, record);
};

const clearFailedAttempts = (ip: string) => {
  loginAttempts.delete(ip);
};

// Verify credentials safely
const checkCredentials = (email?: string, password?: string): boolean => {
  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return false;
  }

  const { email: adminEmail, password: adminPassword } = getAdminConfig();
  if (!adminEmail || !adminPassword) {
    return false;
  }

  const cleanEmail = email.trim().toLowerCase();
  const emailValid = safeStringCompare(cleanEmail, adminEmail);
  const passValid = safeStringCompare(password, adminPassword);

  return Boolean(emailValid && passValid);
};

// Verify JWT token from request header
const verifyAdminToken = (req: Request): { valid: boolean; user?: { email: string; name: string } } => {
  const authHeader = req.headers.authorization;
  if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
    return { valid: false };
  }

  const token = authHeader.substring(7).trim();
  if (!token) return { valid: false };

  const { email: adminEmail, name: adminName, jwtSecret } = getAdminConfig();
  if (!jwtSecret || !adminEmail) return { valid: false };

  try {
    const decoded = jwt.verify(token, jwtSecret, { algorithms: ['HS256'] }) as any;
    if (decoded && decoded.role === 'admin' && decoded.email === adminEmail) {
      return {
        valid: true,
        user: { email: adminEmail, name: adminName }
      };
    }
  } catch {
    // Token expired or invalid signature
  }

  return { valid: false };
};

// Admin authentication middleware
const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { valid } = verifyAdminToken(req);
  if (!valid) {
    return res.status(401).json({
      success: false,
      error: 'غير مصرح: جلسة العمل غير صالحة أو منتهية، يرجى تسجيل الدخول مجدداً'
    });
  }
  next();
};

// Check if request is authenticated as admin (for conditional queries)
const isAdmin = (req: Request): boolean => {
  return verifyAdminToken(req).valid;
};

// --- AUTH ROUTES ---

const handleLogin = (req: Request, res: Response) => {
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip || 'unknown';
  const { allowed, remainingMs } = checkRateLimit(clientIp);

  if (!allowed && remainingMs) {
    const remainingMinutes = Math.ceil(remainingMs / 60000);
    return res.status(429).json({
      success: false,
      error: `تم تجاوز الحد المسموح به لمحاولات الدخول الخاطئة. يرجى المحاولة بعد ${remainingMinutes} دقيقة.`
    });
  }

  const { email, password } = req.body || {};
  const { email: configuredEmail, password: configuredPassword, name: adminName, jwtSecret } = getAdminConfig();

  // In production, ensure security variables are set; fail securely if missing
  if (isProd && (!configuredEmail || !configuredPassword || !jwtSecret)) {
    console.error('[SECURITY ERROR] Admin credentials or JWT_SECRET are not configured in production environment.');
    return res.status(500).json({
      success: false,
      error: 'نظام المصادقة غير مهيأ بشكل آمن على الخادم. يرجى التواصل مع الدعم الفني.'
    });
  }

  if (checkCredentials(email, password)) {
    clearFailedAttempts(clientIp);

    // Generate real secure JWT token with 24-hour expiration
    const token = jwt.sign(
      {
        email: configuredEmail,
        role: 'admin'
      },
      jwtSecret,
      {
        expiresIn: '24h',
        algorithm: 'HS256'
      }
    );

    return res.json({
      success: true,
      token,
      user: {
        email: configuredEmail,
        name: adminName
      }
    });
  }

  recordFailedAttempt(clientIp);

  return res.status(401).json({
    success: false,
    error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
  });
};

// Mount login on both standard and netlify paths
app.post(['/api/login', '/api/auth/login', '/.netlify/functions/api/login', '/.netlify/functions/api/auth/login'], handleLogin);

// Verify current session
app.get(['/api/auth/me', '/.netlify/functions/api/auth/me'], (req, res) => {
  const { valid, user } = verifyAdminToken(req);
  if (valid && user) {
    return res.json({
      success: true,
      user
    });
  }
  return res.status(401).json({ success: false, error: 'غير مسجل أو انتهت صلاحية الجلسة' });
});

// --- SERVICES ROUTES ---

// 1. GET /api/services
app.get(['/api/services', '/.netlify/functions/api/services'], (req, res) => {
  try {
    const wantAll = req.query.all === 'true' && isAdmin(req);
    const services = db.getServices(wantAll);
    return res.json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'فشل في جلب الخدمات' });
  }
});

// 2. PUT /api/services/:id - Edit service (Admin only)
app.put(['/api/services/:id', '/.netlify/functions/api/services/:id'], requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ success: false, error: 'معرّف الخدمة غير صالح' });
    }

    const body = req.body || {};
    const updates: any = {};

    // Validate name
    if (body.name !== undefined) {
      if (typeof body.name !== 'string' || body.name.trim().length < 2 || body.name.trim().length > 200) {
        return res.status(400).json({ success: false, error: 'اسم الخدمة يجب أن يكون نصاً بين حرفين و 200 حرف' });
      }
      updates.name = body.name.trim();
    }

    // Validate price
    if (body.price !== undefined) {
      const priceNum = Number(body.price);
      if (!Number.isFinite(priceNum) || isNaN(priceNum) || priceNum < 0 || priceNum > 1000000) {
        return res.status(400).json({ success: false, error: 'السعر يجب أن يكون رقماً صحيحاً أو عشرياً موجباً لا يتجاوز 1,000,000' });
      }
      updates.price = priceNum;
    }

    // Validate oldPrice
    if (body.oldPrice !== undefined && body.oldPrice !== null) {
      const oldPriceNum = Number(body.oldPrice);
      if (!Number.isFinite(oldPriceNum) || isNaN(oldPriceNum) || oldPriceNum < 0) {
        return res.status(400).json({ success: false, error: 'السعر القديم يجب أن يكون رقماً موجباً' });
      }
      updates.oldPrice = oldPriceNum;
    }

    // Validate description
    if (body.description !== undefined) {
      if (typeof body.description !== 'string' || body.description.length > 3000) {
        return res.status(400).json({ success: false, error: 'الوصف يجب أن يكون نصاً لا يتجاوز 3000 حرف' });
      }
      updates.description = body.description.trim();
    }

    // Validate category
    if (body.category !== undefined) {
      if (typeof body.category !== 'string' || !VALID_CATEGORIES.has(body.category)) {
        return res.status(400).json({ success: false, error: 'التصنيف المحدد غير مدعوم' });
      }
      updates.category = body.category;
      updates.categoryNameAr = CATEGORY_NAMES_AR[body.category] || body.category;
    }

    // Validate is_active / available
    if (body.is_active !== undefined || body.available !== undefined) {
      const activeVal = body.is_active !== undefined ? Boolean(body.is_active) : Boolean(body.available);
      updates.is_active = activeVal;
      updates.available = activeVal;
    }

    // Validate unitLabel
    if (body.unitLabel !== undefined) {
      updates.unitLabel = String(body.unitLabel).trim().slice(0, 100);
    }

    const updated = await db.updateService(id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'الخدمة غير موجودة' });
    }

    return res.json({
      success: true,
      message: 'تم تحديث الخدمة بنجاح',
      data: updated
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'فشل في تحديث الخدمة' });
  }
});

// 3. POST /api/services - Add service (Admin only)
app.post(['/api/services', '/.netlify/functions/api/services'], requireAdmin, async (req, res) => {
  try {
    const body = req.body || {};

    // Validate name
    if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2 || body.name.trim().length > 200) {
      return res.status(400).json({ success: false, error: 'يرجى إدخال اسم صحيح للخدمة (بين حرفين و 200 حرف)' });
    }

    // Validate price
    const priceNum = Number(body.price);
    if (!Number.isFinite(priceNum) || isNaN(priceNum) || priceNum < 0 || priceNum > 1000000) {
      return res.status(400).json({ success: false, error: 'يرجى إدخال سعر صحيح موجب لا يتجاوز 1,000,000' });
    }

    // Validate category
    const category = typeof body.category === 'string' && VALID_CATEGORIES.has(body.category)
      ? body.category
      : 'academic_services';
    const categoryNameAr = CATEGORY_NAMES_AR[category] || 'الخدمات الأكاديمية';

    // Validate description
    const description = typeof body.description === 'string' ? body.description.trim().slice(0, 3000) : '';

    const newServiceData = {
      name: body.name.trim(),
      price: priceNum,
      oldPrice: body.oldPrice ? Number(body.oldPrice) : undefined,
      category,
      categoryNameAr,
      description,
      unitLabel: body.unitLabel ? String(body.unitLabel).trim().slice(0, 100) : 'خدمة',
      details: Array.isArray(body.details) ? body.details.map(String) : [],
      is_active: body.is_active !== undefined ? Boolean(body.is_active) : true,
      featured: Boolean(body.featured),
      badge: body.badge ? String(body.badge).trim().slice(0, 50) : undefined,
      image: body.image ? String(body.image).trim() : '/assets/images/service_academic_research_1791032124280.jpg'
    };

    const created = await db.addService(newServiceData);
    return res.status(201).json({
      success: true,
      message: 'تمت إضافة الخدمة بنجاح',
      data: created
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'فشل في إضافة الخدمة' });
  }
});

// 4. DELETE /api/services/:id - Delete service (Admin only)
app.delete(['/api/services/:id', '/.netlify/functions/api/services/:id'], requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ success: false, error: 'معرّف الخدمة غير صالح' });
    }

    const deleted = await db.deleteService(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'الخدمة غير موجودة' });
    }

    return res.json({
      success: true,
      message: 'تم حذف الخدمة بنجاح'
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'فشل في حذف الخدمة' });
  }
});

// Health check
app.get(['/api/health', '/.netlify/functions/api/health'], (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});
