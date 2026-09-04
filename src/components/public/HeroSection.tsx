import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Sparkles, Award, Hammer, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { isBusinessOpen, cleanPhone } from '../../lib/utils';

export const HeroSection: React.FC = () => {
  const { homepageCMS, settings, navigate, setIsCsWidgetOpen } = useApp();
  const isOpen = isBusinessOpen(settings.openingHoursWeekday);

  return (
    <section className="relative overflow-hidden bg-[#FBFBF9] pt-6 pb-16 sm:pb-24 border-b border-stone-200">
      {/* Subtle Background Architectural Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-amber-100/40 via-stone-100/20 to-transparent rounded-full blur-3xl -z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 z-10">
            {/* Live Business Status Pill & Brand Eyebrow */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 bg-stone-900 text-white rounded-full text-xs font-bold tracking-widest uppercase font-sans">
                {homepageCMS.heroBrand || 'KREATIFINDO'}
              </span>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs shadow-2xs">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'
                  }`}
                />
                <span className="font-semibold text-stone-700">
                  {isOpen ? 'Konsultasi Tersedia' : 'Di Luar Jam Pelayanan'}
                </span>
                <span className="text-stone-400 text-[10px]">
                  ({(settings?.openingHoursWeekday || 'Senin - Jumat: 08:30 - 18:00 WIB').split(':')[0]})
                </span>
              </div>
            </div>

            {/* Editorial Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#18181B] tracking-tight leading-[1.12]">
                Furniture & Perabot <br />
                <span className="text-stone-500 italic font-normal">yang Dibuat untuk</span>{' '}
                <span className="text-[#18181B] underline decoration-[#B88E2F] decoration-2 underline-offset-8">
                  Ruang Anda.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed max-w-xl">
                {homepageCMS.heroSubtitle}
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => navigate('#/katalog')}
                className="bg-[#18181B] text-white hover:bg-stone-800 px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base flex items-center gap-2.5 shadow-lg shadow-stone-900/10 hover:shadow-xl transition-all cursor-pointer active:scale-98 group"
              >
                <span>{homepageCMS.heroCtaCatalog || 'Lihat Katalog'}</span>
                <ArrowRight className="w-4 h-4 text-[#B88E2F] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsCsWidgetOpen(true)}
                className="bg-white text-stone-900 hover:bg-stone-50 border border-stone-300 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
              >
                <MessageCircle className="w-4 h-4 text-[#B88E2F]" />
                <span>{homepageCMS.heroCtaConsult || 'Konsultasi Desain'}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4">
              <div>
                <span className="block text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  {homepageCMS.experienceYears}+
                </span>
                <span className="text-xs text-stone-500 font-sans">Tahun Pengalaman</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  {homepageCMS.completedProjects}+
                </span>
                <span className="text-xs text-stone-500 font-sans">Proyek Terpasang</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-serif font-bold text-stone-900 text-[#B88E2F]">
                  {homepageCMS.clientSatisfaction}
                </span>
                <span className="text-xs text-stone-500 font-sans">Kepuasan Klien</span>
              </div>
            </div>
          </div>

          {/* Right Column: Grand Furniture Visual Showcase */}
          <div className="lg:col-span-6 relative">
            {/* Main Stage Image */}
            <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 aspect-4/3 sm:aspect-5/4">
              <img
                src={homepageCMS.heroImage}
                alt="Kreatifindo Luxury Living & Office Interior"
                className="w-full h-full object-cover transform hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Image Overlay Tag */}
              <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] block">
                    Portfolio Highlight
                  </span>
                  <span className="text-sm sm:text-base font-serif font-bold">
                    The Dharmawangsa Penthouse Suite
                  </span>
                </div>
                <button
                  onClick={() => navigate('#/project')}
                  className="text-xs bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-stone-900 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer"
                >
                  Lihat Proyek
                </button>
              </div>
            </div>

            {/* Floating Floating Craftsmanship Card 1 */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-stone-200 items-center gap-3.5 max-w-xs animate-fadeIn">
              <div className="w-11 h-11 rounded-xl bg-stone-900 text-[#B88E2F] flex items-center justify-center shrink-0">
                <Hammer className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900 font-sans">Workshop In-House</h4>
                <p className="text-[11px] text-stone-500 leading-tight mt-0.5">
                  Diproduksi mandiri oleh pengrajin ahli dengan kontrol presisi tinggi.
                </p>
              </div>
            </div>

            {/* Floating Guarantee Card 2 */}
            <div className="hidden sm:flex absolute -top-4 -right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-stone-200 items-center gap-3 animate-fadeIn">
              <ShieldCheck className="w-6 h-6 text-[#B88E2F]" />
              <div>
                <span className="text-xs font-bold text-stone-900 block font-sans">Garansi Konstruksi</span>
                <span className="text-[10px] text-stone-500 font-medium">1-2 Tahun Resmi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
