import React, { useState } from 'react';
import { Save, Sparkles, Image as ImageIcon, CheckCircle2, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminHomepageCMS: React.FC = () => {
  const { homepageCMS, updateHomepageCMS, navigate, addToast } = useApp();

  const [heroEyebrow, setHeroEyebrow] = useState(homepageCMS.heroEyebrow);
  const [heroTitle, setHeroTitle] = useState(homepageCMS.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(homepageCMS.heroSubtitle);
  const [heroImage, setHeroImage] = useState(homepageCMS.heroImage);
  const [ctaPrimaryText, setCtaPrimaryText] = useState(homepageCMS.ctaPrimaryText);
  const [ctaPrimaryLink, setCtaPrimaryLink] = useState(homepageCMS.ctaPrimaryLink);
  const [ctaSecondaryText, setCtaSecondaryText] = useState(homepageCMS.ctaSecondaryText);
  const [ctaSecondaryLink, setCtaSecondaryLink] = useState(homepageCMS.ctaSecondaryLink);

  const [experienceYears, setExperienceYears] = useState(homepageCMS.experienceYears);
  const [completedProjects, setCompletedProjects] = useState(homepageCMS.completedProjects);
  const [satisfactionRate, setSatisfactionRate] = useState(homepageCMS.satisfactionRate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomepageCMS({
      heroEyebrow: heroEyebrow.trim(),
      heroTitle: heroTitle.trim(),
      heroSubtitle: heroSubtitle.trim(),
      heroImage: heroImage.trim(),
      ctaPrimaryText: ctaPrimaryText.trim(),
      ctaPrimaryLink: ctaPrimaryLink.trim(),
      ctaSecondaryText: ctaSecondaryText.trim(),
      ctaSecondaryLink: ctaSecondaryLink.trim(),
      experienceYears: Number(experienceYears),
      completedProjects: Number(completedProjects),
      satisfactionRate: Number(satisfactionRate),
    });
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-stone-900">
            Editor Konten Beranda (CMS)
          </h2>
          <p className="text-xs text-stone-500">
            Ubah teks headline, foto utama hero banner, dan statistik pencapaian yang tampil di halaman depan website.
          </p>
        </div>

        <button
          onClick={() => navigate('#/')}
          className="bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <Eye className="w-4 h-4 text-[#B88E2F]" />
          <span>Lihat Website Publik</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 sm:p-8 space-y-8 text-xs">
        {/* Hero Banner Texts */}
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-stone-900 text-base pb-2 border-b border-stone-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B88E2F]" />
            <span>Bagian Utama (Hero Section)</span>
          </h3>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Label Kecil di Atas Judul (Eyebrow Tag)
            </label>
            <input
              type="text"
              required
              value={heroEyebrow}
              onChange={(e) => setHeroEyebrow(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Judul Utama Hero (Headline Display)
            </label>
            <input
              type="text"
              required
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F] text-sm font-serif font-bold"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Deskripsi Singkat di Bawah Judul (Hero Subtitle)
            </label>
            <textarea
              rows={3}
              required
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="w-full p-3 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F] resize-none"
            />
          </div>

          {/* Hero Image */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              URL Foto Banner Utama (High-Res 16:9)
            </label>
            <div className="flex gap-3 items-start">
              <input
                type="url"
                required
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                className="flex-1 px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
              />
              {heroImage && (
                <img
                  src={heroImage}
                  alt="Preview Hero"
                  className="w-24 h-16 object-cover rounded-xl border border-stone-200 shrink-0"
                />
              )}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4 pt-4 border-t border-stone-100">
          <h3 className="font-serif font-bold text-stone-900 text-base pb-2 border-b border-stone-100">
            Tombol Ajakan Bertindak (Call to Action)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Teks Tombol Utama (Primary CTA)
              </label>
              <input
                type="text"
                value={ctaPrimaryText}
                onChange={(e) => setCtaPrimaryText(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Tautan Tombol Utama (URL Hash)
              </label>
              <input
                type="text"
                value={ctaPrimaryLink}
                onChange={(e) => setCtaPrimaryLink(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Teks Tombol Kedua (Secondary CTA)
              </label>
              <input
                type="text"
                value={ctaSecondaryText}
                onChange={(e) => setCtaSecondaryText(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Tautan Tombol Kedua (URL Hash)
              </label>
              <input
                type="text"
                value={ctaSecondaryLink}
                onChange={(e) => setCtaSecondaryLink(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
              />
            </div>
          </div>
        </div>

        {/* Company Metrics */}
        <div className="space-y-4 pt-4 border-t border-stone-100">
          <h3 className="font-serif font-bold text-stone-900 text-base pb-2 border-b border-stone-100">
            Angka & Statistik Kredibilitas
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Lama Pengalaman (Tahun)
              </label>
              <input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Proyek Terselesaikan (Unit)
              </label>
              <input
                type="number"
                value={completedProjects}
                onChange={(e) => setCompletedProjects(Number(e.target.value))}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Tingkat Kepuasan (%)
              </label>
              <input
                type="number"
                value={satisfactionRate}
                onChange={(e) => setSatisfactionRate(Number(e.target.value))}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-stone-200 flex justify-end">
          <button
            type="submit"
            className="bg-[#18181B] hover:bg-stone-800 text-white px-7 py-3 rounded-xl font-semibold flex items-center gap-2 cursor-pointer shadow-md text-xs sm:text-sm"
          >
            <Save className="w-4 h-4 text-[#B88E2F]" />
            <span>Simpan & Publikasikan ke Beranda</span>
          </button>
        </div>
      </form>
    </div>
  );
};
