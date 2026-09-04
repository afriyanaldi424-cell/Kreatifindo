import React, { useState } from 'react';
import { Building, MapPin, Calendar, ArrowRight, Layers, X, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Project } from '../types';

export const ProjectsPage: React.FC = () => {
  const { projects, navigate } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  const [showBeforeState, setShowBeforeState] = useState(false);

  const categories = ['ALL', 'Perkantoran', 'Residensial', 'Komersial & Cafe'];

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === 'ALL') return true;
    return p.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="bg-[#FBFBF9] min-h-screen py-12 sm:py-16 border-b border-stone-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#B88E2F]">
            Portofolio & Realisasi
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Portofolio Proyek Terpasang
          </h1>
          <p className="text-sm text-stone-600 font-sans leading-relaxed">
            Eksplorasi hasil fabrikasi dan instalasi perabot presisi kami pada perkantoran korporat, hunian mewah, dan ruang komersial.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#18181B] text-white shadow-sm'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat === 'ALL' ? 'Semua Proyek' : cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                setActiveProjectModal(project);
                setShowBeforeState(false);
              }}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={project.mainImage}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-black/75 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider rounded-md">
                  {project.category}
                </span>
                {project.beforeAfter && (
                  <span className="absolute bottom-4 right-4 px-2.5 py-1 bg-[#B88E2F] text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                    Before / After Tersedia
                  </span>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif font-bold text-xl text-stone-900 group-hover:text-[#B88E2F] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 space-y-1.5 text-xs text-stone-500">
                  <div className="flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-[#B88E2F]" />
                    <span className="truncate">Klien: {project.client}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#B88E2F]" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#B88E2F]" />
                    <span>Selesai: {project.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Lightbox Modal */}
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
            <div
              onClick={() => setActiveProjectModal(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xs"
            />

            <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden z-10 border border-stone-200 flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="p-6 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#B88E2F]">
                    {activeProjectModal.category}
                  </span>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 mt-0.5">
                    {activeProjectModal.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                {/* Visual Area with Before/After toggle */}
                <div className="relative rounded-2xl overflow-hidden aspect-16/9 bg-stone-100 shadow-md">
                  <img
                    src={
                      activeProjectModal.beforeAfter && showBeforeState
                        ? activeProjectModal.beforeAfter.before
                        : activeProjectModal.mainImage
                    }
                    alt={activeProjectModal.name}
                    className="w-full h-full object-cover"
                  />

                  {activeProjectModal.beforeAfter && (
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                      <button
                        onClick={() => setShowBeforeState(!showBeforeState)}
                        className="px-4 py-2 bg-stone-900/90 hover:bg-black text-white text-xs font-semibold rounded-xl backdrop-blur-md shadow-lg transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#B88E2F]" />
                        <span>{showBeforeState ? 'Lihat Hasil (After)' : 'Bandingkan Ruang Asli (Before)'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Additional Gallery Photos */}
                {activeProjectModal.gallery && activeProjectModal.gallery.length > 0 && (
                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-sm mb-3">
                      Galeri Detail Sudut Ruangan:
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {activeProjectModal.gallery.map((img, idx) => (
                        <div key={idx} className="rounded-xl overflow-hidden aspect-4/3 bg-stone-100">
                          <img src={img} alt={`Detail ${idx}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Scope & Description */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-stone-100">
                  <div className="md:col-span-2 space-y-3">
                    <h4 className="font-serif font-bold text-stone-900 text-base">
                      Lingkup Pengerjaan & Cerita Proyek
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {activeProjectModal.description}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5 text-xs">
                    <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                      Spesifikasi Proyek
                    </h4>
                    <div>
                      <span className="text-stone-400 block">Klien:</span>
                      <span className="font-semibold text-stone-900">{activeProjectModal.client}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Lokasi:</span>
                      <span className="font-semibold text-stone-900">{activeProjectModal.location}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Waktu Serah Terima:</span>
                      <span className="font-semibold text-stone-900">{activeProjectModal.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-stone-500 text-center sm:text-left">
                  Ingin mewujudkan konsep perabot seperti proyek ini untuk ruang Anda?
                </span>
                <button
                  onClick={() => {
                    setActiveProjectModal(null);
                    navigate('#/penawaran');
                  }}
                  className="w-full sm:w-auto bg-[#18181B] hover:bg-stone-800 text-white px-6 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Minta Penawaran Serupa</span>
                  <ArrowRight className="w-4 h-4 text-[#B88E2F]" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
