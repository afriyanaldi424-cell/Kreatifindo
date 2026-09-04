import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Clock, Check, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatRupiah } from '../../lib/utils';

export const ProjectCalculator: React.FC = () => {
  const { navigate, addToEstimateCart, products } = useApp();

  const [furnitureType, setFurnitureType] = useState('Lemari Wardrobe Custom');
  const [lengthMeters, setLengthMeters] = useState(3.0);
  const [heightMeters, setHeightMeters] = useState(2.8);
  const [materialKey, setMaterialKey] = useState('multiplek_hpl_taco');
  const [hardwareKey, setHardwareKey] = useState('blum_motion');
  const [includeLed, setIncludeLed] = useState(true);

  const materials = [
    {
      id: 'multiplek_hpl_taco',
      name: 'Multiplek 18mm + HPL Taco Tekstur',
      baseRatePerMeter: 2600000,
      desc: 'Tahan air ringan, anti gores, pilihan motif serat kayu & solid.',
    },
    {
      id: 'multiplek_hpl_aica',
      name: 'Multiplek 18mm + HPL AICA Japan Anti-Fingerprint',
      baseRatePerMeter: 3100000,
      desc: 'Finishing ultra-matte tanpa bekas sidik jari, higienis grade A.',
    },
    {
      id: 'veneer_walnut',
      name: 'Multiplek 18mm + Natural American Walnut Veneer',
      baseRatePerMeter: 3800000,
      desc: 'Sentuhan serat kayu alami asli dengan pelapis PU satin clear.',
    },
    {
      id: 'solid_teak',
      name: 'Kayu Jati Solid Grade A Perhutani',
      baseRatePerMeter: 5400000,
      desc: 'Kekuatan legendaris tahan puluhan tahun dengan finishing melamine.',
    },
  ];

  const hardwares = [
    { id: 'standard', name: 'Engsel Soft-Close Standard Ekspor', addPerMeter: 0 },
    { id: 'blum_motion', name: 'Hardware Hidrolik Blumotion Austria', addPerMeter: 450000 },
    { id: 'hafele_germany', name: 'Hardware Hafele Silent Soft-Close', addPerMeter: 380000 },
  ];

  // Calculation logic
  const selectedMaterial = materials.find((m) => m.id === materialKey) || materials[0];
  const selectedHardware = hardwares.find((h) => h.id === hardwareKey) || hardwares[0];

  // If height > 2.4m, factor ceiling extension
  const heightMultiplier = heightMeters > 2.4 ? 1 + (heightMeters - 2.4) * 0.35 : 1.0;
  const ledCost = includeLed ? lengthMeters * 350000 : 0;

  const baseMeterCost = selectedMaterial.baseRatePerMeter + selectedHardware.addPerMeter;
  const totalEstimatedCost = Math.round(lengthMeters * baseMeterCost * heightMultiplier + ledCost);

  const handleApplyToQuotation = () => {
    // Find closest custom product or create item in cart
    const customProd = products.find((p) => p.category === 'Furniture Custom') || products[0];
    const specNotes = `Kalkulator Custom: ${furnitureType} (${lengthMeters}m x ${heightMeters}m). Material: ${selectedMaterial.name}, Hardware: ${selectedHardware.name}${includeLed ? ', Termasuk LED Profile Strip' : ''}.`;

    addToEstimateCart(customProd, 1, specNotes);
    navigate('#/penawaran');
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-5xl mx-auto bg-stone-900 text-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden border border-stone-800">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#B88E2F]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-8 border-b border-stone-800">
            <div>
              <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-1.5 font-sans">
                <Calculator className="w-4 h-4" />
                <span>Simulasi Anggaran Transparan</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Kalkulator Estimasi Biaya Custom Furniture
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 font-sans max-w-md">
              Kalkulasi anggaran real-time berdasarkan meter lari, spesifikasi bahan baku, dan hardware hidrolik pilihan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Options Controls */}
            <div className="lg:col-span-7 space-y-6 font-sans">
              {/* Type Selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                  1. Jenis Perabot Custom
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    'Lemari Wardrobe Custom',
                    'Kitchen Set Minimalis',
                    'Meja Meeting Korporat',
                    'Credenza & TV Console',
                    'Partisi Display & Rak',
                    'Workstation Kantor',
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFurnitureType(type)}
                      className={`p-2.5 rounded-xl border text-left font-medium transition-all cursor-pointer ${
                        furnitureType === type
                          ? 'border-[#B88E2F] bg-[#B88E2F]/15 text-white font-bold'
                          : 'border-stone-800 bg-stone-800/60 text-stone-400 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                    Panjang Ruang (Meter): {lengthMeters} m
                  </label>
                  <input
                    type="range"
                    min="1.0"
                    max="10.0"
                    step="0.5"
                    value={lengthMeters}
                    onChange={(e) => setLengthMeters(parseFloat(e.target.value))}
                    className="w-full accent-[#B88E2F] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                    <span>1.0 m</span>
                    <span>5.0 m</span>
                    <span>10.0 m</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                    Tinggi Perabot: {heightMeters} m
                  </label>
                  <input
                    type="range"
                    min="1.5"
                    max="3.5"
                    step="0.1"
                    value={heightMeters}
                    onChange={(e) => setHeightMeters(parseFloat(e.target.value))}
                    className="w-full accent-[#B88E2F] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                    <span>1.5 m</span>
                    <span>2.4 m (Standard)</span>
                    <span>3.5 m (Full Plafon)</span>
                  </div>
                </div>
              </div>

              {/* Material Choice */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                  2. Material Bodi & Pelapis
                </label>
                <div className="space-y-2">
                  {materials.map((mat) => (
                    <div
                      key={mat.id}
                      onClick={() => setMaterialKey(mat.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        materialKey === mat.id
                          ? 'border-[#B88E2F] bg-stone-800 text-white'
                          : 'border-stone-800 bg-stone-800/40 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-semibold block text-white">{mat.name}</span>
                        <span className="text-[11px] text-stone-400 block mt-0.5">{mat.desc}</span>
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#D4AF37] shrink-0 ml-3">
                        {formatRupiah(mat.baseRatePerMeter)}/m
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware & Lighting */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                    3. Fitting & Engsel
                  </label>
                  <select
                    value={hardwareKey}
                    onChange={(e) => setHardwareKey(e.target.value)}
                    className="w-full p-2.5 bg-stone-800 border border-stone-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#B88E2F]"
                  >
                    {hardwares.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} {h.addPerMeter > 0 ? `(+${formatRupiah(h.addPerMeter)}/m)` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2.5 text-xs text-stone-300 cursor-pointer pt-6">
                    <input
                      type="checkbox"
                      checked={includeLed}
                      onChange={(e) => setIncludeLed(e.target.checked)}
                      className="w-4 h-4 accent-[#B88E2F] rounded"
                    />
                    <span>Sertakan Profil LED Warm Light Tersembunyi</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Output Summary Card */}
            <div className="lg:col-span-5 bg-stone-800/90 rounded-2xl p-6 sm:p-8 border border-stone-700 space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block font-sans">
                  Estimasi Total Anggaran Proyek
                </span>
                <span className="text-3xl sm:text-4xl font-serif font-bold text-white block mt-2 font-sans">
                  {formatRupiah(totalEstimatedCost)}
                </span>
                <span className="text-xs text-stone-400 block mt-1">
                  *Kisaran estimasi perabot {lengthMeters} m lari x {heightMeters} m tinggi
                </span>
              </div>

              <div className="space-y-3 pt-4 border-t border-stone-700 text-xs text-stone-300 font-sans">
                <div className="flex justify-between">
                  <span className="text-stone-400">Tipe Pengerjaan:</span>
                  <span className="font-semibold text-white">{furnitureType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Material Terpilih:</span>
                  <span className="font-semibold text-white text-right max-w-[180px] truncate">
                    {(selectedMaterial?.name || '').split('+')[0]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Estimasi Durasi Produksi:</span>
                  <span className="font-semibold text-emerald-400">14 - 21 Hari Kerja</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Jaminan Garansi:</span>
                  <span className="font-semibold text-white">1 Tahun Resmi Tertulis</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 text-[11px] text-stone-400 leading-relaxed font-sans">
                Angka kalkulasi di atas mencakup material, pengerjaan di workshop, dan konsultasi 3D. Survey lokasi akhir akan mengunci ukuran pasti.
              </div>

              <button
                onClick={handleApplyToQuotation}
                className="w-full bg-[#B88E2F] hover:bg-[#A17A24] text-white py-3.5 px-5 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-98"
              >
                <span>Ajukan Penawaran Sesuai Spek Ini</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
