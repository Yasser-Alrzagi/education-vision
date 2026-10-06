import React from 'react';
import { Star, Quote, Award } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'عبدالرحمن العتيبي',
      role: 'طالب ماجستير إدارة أعمال',
      university: 'جامعة الملك سعود',
      rating: 5,
      comment: 'خدمة احترافية جداً في التحليل الإحصائي بمشروع التخرج وتفسير النتائج بدقة مع التزام تام بالموعد المحدد. شكراً لفريق رؤية التعليم.'
    },
    {
      name: 'سارة الشمري',
      role: 'باحثة دكتوراه مناهج وطرق تدريس',
      university: 'جامعة الأميرة نورة',
      rating: 5,
      comment: 'تعامل راقي ودقة عالية في توثيق المراجع وصياغة الإطار النظري، مع سرية تامة وسرعة في الرد عبر الواتساب.'
    },
    {
      name: 'م. فهد الغامدي',
      role: 'خريج هندسة حاسب',
      university: 'جامعة الملك عبدالعزيز',
      rating: 5,
      comment: 'ساعدوني في إعداد العرض التقديمي وكتابة تقرير المشروع بطريقة أكاديمية مبهرة نالت إعجاب لجنة المناقشة وحصلت على تقدير ممتاز.'
    }
  ];

  return (
    <section id="testimonials" className="py-14 sm:py-20 bg-[#FAF8F3] scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF3E5] text-[#C58A24] text-xs font-bold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>ثقة ونتائج مثبتة</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#102235] tracking-tight">
            آراء وتجارب طلابنا وباحثينا
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 font-medium">
            نفخر بمساندة آلاف الطلاب والباحثين في جامعات المملكة والخليج
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#E6C27A]/40" />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#102235] text-[#C58A24] font-bold text-xs flex items-center justify-center shrink-0">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#102235]">{rev.name}</h4>
                  <span className="text-[11px] text-slate-400 block">{rev.role} · {rev.university}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
