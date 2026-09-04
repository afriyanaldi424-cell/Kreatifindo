import React, { useState } from 'react';
import { ArrowRight, MapPin, Building, Calendar, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProjectShowcase: React.FC = () => {
  const { projects, navigate } = useApp();
  const [activeBeforeAfterId, setActiveBeforeAfterId] = useState<string | null>(null);

  return (
    <section className="py-16 sm:py-24 bg-stone-900 text-white border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#B88E2F] font-sans">
              Rekam Jejak Eksekusi
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Proyek & Instalasi Terbaru
            </h2>
            <p className="text-sm text-stone-400 font-sans max-w-lg">
              Dokumentasi nyata instalasi furniture presisi kami pada perkantoran multinasional, hunian privat mewah, dan ruang komersial.
            </p>
          </div>

          <button
            onClick={() => navigate('#/project')}
            className="inline-flex items-center gap-2 text-sm text-[#CBB279] hover:text-white font-semibold transition-colors cursor-pointer"
          >
            <span>Lihat Semua Portofolio Proyek</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3-Column Architectural Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj) => {
            const isShowingBefore = activeBeforeAfterId === proj.id;
            const currentImg =
              proj.beforeAfter && isShowingBefore
                ? proj.beforeAfter.before
                : proj.mainImage;

            return (
              <div
                key={proj.id}
                className="group bg-stone-800/60 rounded-2xl overflow-hidden border border-stone-700/80 hover:border-stone-500 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Image */}
                <div className="relative aspect-4/3 overflow-hidden bg-stone-800">
                  <img
                    src={currentImg}
                    alt={proj.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Category Pill */}
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 bg-black/70 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] rounded-md">
                    {proj.category}
                  </span>

                  {/* Before / After toggle button if available */}
                  {proj.beforeAfter && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveBeforeAfterId(isShowingBefore ? null : proj.id);
                      }}
                      className="absolute bottom-3.5 right-3.5 px-2.5 py-1 bg-black/80 hover:bg-[#B88E2F] text-white text-[11px] font-semibold rounded-md backdrop-blur-md transition-colors cursor-pointer"
                    >
                      {isShowingBefore ? 'Tampilkan Hasil (After)' : 'Lihat Ruang Sebelum (Before)'}
                    </button>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      {proj.name}
                    </h3>
                    <p className="text-xs text-stone-300 line-clamp-3 mt-2 font-sans leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-700/60 space-y-1.5 text-xs text-stone-400 font-sans">
                    <div className="flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-[#B88E2F] shrink-0" />
                      <span className="truncate text-stone-300">Klien: {proj.client}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#B88E2F] shrink-0" />
                      <span className="truncate">{proj.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#B88E2F] shrink-0" />
                      <span>Selesai: {proj.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
