import React from 'react';
import { HeroSection } from '../components/public/HeroSection';
import { CategoryGrid } from '../components/public/CategoryGrid';
import { FeaturedProducts } from '../components/public/FeaturedProducts';
import { ProjectShowcase } from '../components/public/ProjectShowcase';
import { WhyUsSection } from '../components/public/WhyUsSection';
import { ProjectCalculator } from '../components/public/ProjectCalculator';
import { OrderProcessSection } from '../components/public/OrderProcessSection';
import { TestimonialsSection } from '../components/public/TestimonialsSection';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { cleanPhone } from '../lib/utils';

export const HomePage: React.FC = () => {
  const { navigate, settings, setIsCsWidgetOpen } = useApp();

  return (
    <div className="min-w-0">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Category Grid */}
      <CategoryGrid />

      {/* 3. Featured Products */}
      <FeaturedProducts />

      {/* 4. Latest Projects Showcase */}
      <ProjectShowcase />

      {/* 5. Why Choose Kreatifindo */}
      <WhyUsSection />

      {/* 6. Interactive Project Calculator */}
      <ProjectCalculator />

      {/* 7. Structured Ordering Process */}
      <OrderProcessSection />

      {/* 8. Testimonials */}
      <TestimonialsSection />

      {/* 9. Final Corporate CTA Banner */}
      <section className="py-16 sm:py-20 bg-[#18181B] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B88E2F]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="bg-stone-900/90 rounded-3xl p-8 sm:p-14 border border-stone-800 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs uppercase font-bold tracking-widest text-[#D4AF37] font-sans">
                Konsultasi & Penawaran Proyek
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                Wujudkan Perabot Sempurna untuk Ruang Bisnis & Hunian Anda
              </h2>
              <p className="text-sm text-stone-400 font-sans leading-relaxed">
                Diskusikan denah ruangan, kebutuhan unit perabot, atau jadwal survey lokasi bersama tim konsultan interior Kreatifindo sekarang.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
              <button
                onClick={() => navigate('#/penawaran')}
                className="bg-[#B88E2F] hover:bg-[#A17A24] text-white px-7 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-98"
              >
                <span>Minta Penawaran Resmi</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${cleanPhone(settings.whatsapp)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white border border-stone-700 px-6 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Hotline</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
