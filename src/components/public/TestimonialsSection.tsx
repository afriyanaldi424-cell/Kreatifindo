import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useApp();
  const publishedTestimonials = testimonials.filter((t) => t.published);

  return (
    <section className="py-16 sm:py-24 bg-[#FBFBF9] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#B88E2F] font-sans">
            Testimoni & Reputasi
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Kepercayaan Klien & Rekanan Arsitek
          </h2>
          <p className="text-sm text-stone-600 font-sans leading-relaxed">
            Pengalaman nyata pemilik hunian, arsitek profesional, dan pimpinan procurement korporat bermitra dengan workshop Kreatifindo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publishedTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-8 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between relative hover:shadow-lg transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-stone-100 -z-0" />

              <div className="space-y-4 relative z-10">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-stone-100 flex items-center gap-3.5 relative z-10">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-stone-200 shrink-0"
                />
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-sm">{t.name}</h4>
                  <p className="text-xs text-stone-500 font-sans">
                    {t.role} • {t.company}
                  </p>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-[#B88E2F] bg-[#B88E2F]/10 px-2 py-0.5 rounded">
                    {t.projectType}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
