import React from 'react';
import { Hammer, Award, ShieldCheck, Factory, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutPage: React.FC = () => {
  const { navigate, homepageCMS } = useApp();

  return (
    <div className="bg-[#FBFBF9] min-h-screen py-12 sm:py-16 border-b border-stone-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16 sm:space-y-24">
        {/* Story Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#B88E2F]">
              Profil Perusahaan
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
              Dedikasi Pengrajin & Presisi Arsitektur Modern
            </h1>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Berdiri sejak tahun 2012, <strong>KREATIFINDO</strong> tumbuh dari sebuah atelier perabot kecil menjadi kontraktor interior dan manufaktur perabot terpercaya di Indonesia. Kami menjembatani kebutuhan estetika tinggi dengan ketahanan fisik yang nyata.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">
              Kami percaya bahwa perabot terbaik bukanlah yang paling rumit, melainkan yang paling jujur pada fungsi, presisi terhadap ukuran ruangan, dan ramah terhadap pengguna sehari-hari.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-stone-200">
              <div>
                <span className="block text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  {homepageCMS.experienceYears}+ Tahun
                </span>
                <span className="text-xs text-stone-500">Berpengalaman</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  1.500 m²
                </span>
                <span className="text-xs text-stone-500">Fasilitas Workshop</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-serif font-bold text-stone-900 text-[#B88E2F]">
                  45+ Ahli
                </span>
                <span className="text-xs text-stone-500">Pengrajin & Drafter</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                alt="Workshop Manufaktur Kreatifindo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-stone-900 text-white p-5 rounded-2xl shadow-xl max-w-xs hidden sm:block border border-stone-800">
              <span className="text-xs font-serif font-bold text-[#D4AF37] block">
                Standard Standar Industri
              </span>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                Pengerjaan dengan mesin potong panel saw digital dan finishing spray booth kedap debu.
              </p>
            </div>
          </div>
        </div>

        {/* Workshop Facilities Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-stone-200 shadow-xs space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase font-bold tracking-widest text-[#B88E2F]">
              Kapasitas Produksi
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900">
              Fasilitas Workshop Mandiri
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Kami memegang kontrol penuh 100% atas proses pembuatan tanpa melempar proyek ke sub-kontraktor pihak ketiga.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-900 text-[#B88E2F] flex items-center justify-center">
                <Factory className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Lantai Produksi 1.500 m²
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Terbagi dalam divisi pemotongan presisi, perakitan rangka, laminasi HPL vakum, dan spray booth finishing cat duco kedap debu.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-900 text-[#B88E2F] flex items-center justify-center">
                <Hammer className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Peralatan Mesin Presisi
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Dilengkapi dengan Automatic Edge Bander mesin lem PUR bertekanan tinggi, Spindle Moulder, Multi-boring machine, dan CNC Router arsitektur.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-900 text-[#B88E2F] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                3 Tahap Quality Control
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Pemeriksaan kadar air kayu oven, pengujian beban rel laci 50.000 siklus, dan pre-assembly uji pasang di workshop sebelum dikirim ke lokasi klien.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Presisi Ukuran',
              desc: 'Toleransi potongan di bawah 1mm dengan gambar kerja 3D mendetail.',
            },
            {
              title: 'Material Terverifikasi',
              desc: 'Hanya Multiplek Meranti pilihan, Kayu Solid Oven, dan HPL sertifikasi resmi.',
            },
            {
              title: 'Komitmen Waktu',
              desc: 'Penyelesaian sesuai jadwal kontrak dengan laporan berkala mingguan.',
            },
            {
              title: 'Garansi Tertulis',
              desc: 'Perlindungan resmi 1-2 tahun untuk kekuatan konstruksi dan fitting bergerak.',
            },
          ].map((val, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between"
            >
              <CheckCircle2 className="w-6 h-6 text-[#B88E2F] mb-4" />
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-base mb-1.5">{val.title}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-[#18181B] text-white p-8 sm:p-12 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-serif font-bold text-white">
              Ingin Meninjau Workshop Kami Langsung?
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Kami menyambut arsitek, desainer interior, dan perwakilan pengadaan untuk melihat langsung proses pembuatan.
            </p>
          </div>
          <button
            onClick={() => navigate('#/kontak')}
            className="bg-[#B88E2F] hover:bg-[#A17A24] text-white px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Jadwalkan Kunjungan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
