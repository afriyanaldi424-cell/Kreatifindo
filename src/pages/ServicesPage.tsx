import React from 'react';
import { Home, Briefcase, Store, Compass, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ServicesPage: React.FC = () => {
  const { navigate } = useApp();

  const services = [
    {
      icon: Home,
      title: 'Custom Furniture Residensial & Hunian Mewah',
      desc: 'Solusi perabot built-in yang menyatu sempurna dengan denah arsitektur rumah atau apartemen Anda. Mengoptimalkan setiap sudut menjadi ruang penyimpanan estetis.',
      deliverables: [
        'Kitchen Set Minimalis & Wet/Dry Kitchen',
        'Walk-In Closet & Lemari Pakaian Full Ceiling',
        'Backdrop TV Marmer & Acoustic Wood Wall Slat',
        'Set Kamar Tidur & Dipan Headboard Fabric Custom',
      ],
      leadTime: '14 - 25 Hari Kerja',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      icon: Briefcase,
      title: 'Fit-Out & Furniture Perkantoran Korporat',
      desc: 'Pengadaan furnitur kerja berdaya tahan tinggi yang meningkatkan produktivitas dan mencerminkan citra profesional perusahaan Anda.',
      deliverables: [
        'Modular Workstation & Partisi Meja Karyawan',
        'Meja Rapat / Conference Boardroom Table dengan Jalur Kabel',
        'Meja Resepsionis & Backdrop Lobby Korporat',
        'Executive Director Suite & Lemari Arsip Terkunci',
      ],
      leadTime: '15 - 30 Hari Kerja',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    },
    {
      icon: Store,
      title: 'Commercial Counters, Cafe & Retail Display',
      desc: 'Fabrikasi display komersial yang menarik perhatian pelanggan, tahan aus terhadap lalu lintas pengunjung tinggi, dan mudah dibersihkan.',
      deliverables: [
        'Counter Barista, Meja Kasir & Display Showcase',
        'Booth Pameran & Retail Pop-Up Store',
        'Banquette Seating & Sofa Booth Restoran Custom',
        'Gondola & Rak Display Produk Butik',
      ],
      leadTime: '10 - 20 Hari Kerja',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    },
    {
      icon: Compass,
      title: 'Konsultasi Desain & 3D Drafting Millimeter',
      desc: 'Layanan terintegrasi mulai dari survey lokasi, pengukuran akurat digital, hingga penyajian shop drawing untuk persetujuan klien sebelum pemotongan bahan.',
      deliverables: [
        'Survey Lokasi & Pengukuran Laser Digital',
        '3D Photorealistic Architectural Rendering',
        'Shop Drawing Detail (Ukuran Millimeter & Detail Sambungan)',
        'Sampel Material Fisik (Katalog HPL, Marmer, Kayu Oven)',
      ],
      leadTime: '3 - 5 Hari Kerja',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="bg-[#FBFBF9] min-h-screen py-12 sm:py-16 border-b border-stone-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#B88E2F]">
            Layanan Utama
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Layanan Fabrikasi & Kontraktor Interior
          </h1>
          <p className="text-sm text-stone-600 font-sans leading-relaxed">
            Menghadirkan pengerjaan menyeluruh dengan standar mutu tinggi untuk pemilik hunian privat, pengembang properti, dan korporasi.
          </p>
        </div>

        {/* 4 Services Showcase */}
        <div className="space-y-12">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={idx}
                className={`bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`lg:col-span-6 space-y-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-stone-900 text-[#B88E2F] flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      Lead Time: {svc.leadTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
                    {svc.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {svc.desc}
                  </p>

                  <div className="space-y-2 pt-2">
                    <h4 className="font-semibold text-xs text-stone-900 uppercase tracking-wider">
                      Cakupan Produksi:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                      {svc.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#B88E2F] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <button
                      onClick={() => navigate('#/penawaran')}
                      className="bg-[#18181B] hover:bg-stone-800 text-white px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Minta Penawaran Layanan Ini</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B88E2F]" />
                    </button>
                  </div>
                </div>

                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="rounded-2xl overflow-hidden aspect-4/3 bg-stone-100 shadow-md">
                    <img src={svc.image} alt={svc.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commitment Badge Box */}
        <div className="bg-stone-900 text-white p-8 sm:p-12 rounded-3xl border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-serif font-bold text-white">
              Siap Memulai Konsultasi Ruangan Anda?
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Tim drafter dan konsultan kami siap membantu menyusun estimasi kebutuhan ruang Anda tanpa komitmen awal yang rumit.
            </p>
          </div>
          <button
            onClick={() => navigate('#/penawaran')}
            className="bg-[#B88E2F] hover:bg-[#A17A24] text-white px-7 py-3.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors shrink-0 cursor-pointer shadow-lg"
          >
            <span>Buat Lembar Penawaran</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
