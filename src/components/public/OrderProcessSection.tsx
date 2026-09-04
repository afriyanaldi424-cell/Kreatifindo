import React from 'react';
import { MessageSquare, Palette, Wrench, CheckCircle2 } from 'lucide-react';

export const OrderProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: MessageSquare,
      title: 'Konsultasi & Survey',
      desc: 'Diskusikan konsep interior, jumlah item, serta jadwal tim arsitek kami melakukan survey pengukuran presisi di lokasi Anda.',
    },
    {
      num: '02',
      icon: Palette,
      title: '3D Render & Material Spec',
      desc: 'Kami menyajikan visualisasi 3D, pilihan sampel HPL/veneer kayu asli, marmer, kain fabric, beserta lembar penawaran resmi transparan.',
    },
    {
      num: '03',
      icon: Wrench,
      title: 'Fabrikasi di Workshop',
      desc: 'Pengerjaan di workshop mandiri Kreatifindo oleh tukang spesialis perabot dengan inspeksi QC pada setiap sudut dan rel geser.',
    },
    {
      num: '04',
      icon: CheckCircle2,
      title: 'Instalasi & Serah Terima',
      desc: 'Pengiriman armada khusus, perakitan profesional di ruangan Anda tanpa merusak lantai/dinding, serah terima garansi resmi.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FBFBF9] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#B88E2F] font-sans">
            Alur Pengerjaan
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Proses Pemesanan Terstruktur
          </h2>
          <p className="text-sm text-stone-600 font-sans leading-relaxed">
            Transparan dari awal hingga akhir, menjamin hasil nyata sesuai dengan spesifikasi yang telah disepakati bersama.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="relative bg-white p-7 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-stone-900 text-[#B88E2F] group-hover:bg-[#B88E2F] group-hover:text-white flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-serif font-bold text-2xl text-stone-300 group-hover:text-stone-900 transition-colors">
                    {st.num}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-stone-900 text-lg mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {st.desc}
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
