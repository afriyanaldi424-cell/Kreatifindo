import React from 'react';
import { Hammer, ShieldCheck, Ruler, Clock, Layers, Sparkles } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const pillars = [
    {
      icon: Hammer,
      title: 'Workshop Mandiri 1.500 m²',
      desc: 'Bukan calo atau makelar. Seluruh pengerjaan dikontrol langsung di pabrik kami dengan mesin edge-banding dan spray booth modern.',
    },
    {
      icon: Layers,
      title: 'Material Premium Berstandar',
      desc: 'Hanya menggunakan Multiplek Meranti pilihan, Kayu Solid Oven bersertifikat, dan fitting hardware hidrolik Blum / Hafele.',
    },
    {
      icon: Ruler,
      title: 'Presisi Custom Arsitektural',
      desc: 'Diproduksi sesuai ukuran millimeter ruang Anda dengan bantuan 3D rendering detail sebelum potong bahan.',
    },
    {
      icon: ShieldCheck,
      title: 'Garansi Konstruksi 1-2 Tahun',
      desc: 'Jaminan resmi tertulis untuk kekuatan struktur, kelurusan panel, dan mekanisme rel serta engsel perabot Anda.',
    },
    {
      icon: Clock,
      title: 'Disiplin Waktu & Instalasi Rapi',
      desc: 'Penyelesaian sesuai deadline kontrak. Pemasangan di lokasi oleh tim teknisi berseragam dengan protokol kebersihan.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#B88E2F] font-sans">
            Komitmen Kualitas
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Kenapa Memilih Kreatifindo?
          </h2>
          <p className="text-sm text-stone-600 font-sans leading-relaxed">
            Perbedaan hasil akhir terletak pada disiplin material dan keahlian tukang kayu berpengalaman. Kami menjamin investasi perabot Anda tahan lama.
          </p>
        </div>

        {/* 5-Item Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 hover:bg-white hover:border-[#B88E2F]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-stone-900 text-[#B88E2F] flex items-center justify-center mb-5 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-stone-900 text-base mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
