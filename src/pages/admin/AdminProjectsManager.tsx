import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Sparkles, Building, MapPin, Calendar, Save } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Project } from '../../types';

export const AdminProjectsManager: React.FC = () => {
  const { projects, saveProject, deleteProject } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Perkantoran');
  const [client, setClient] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('2026');
  const [description, setDescription] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [hasBeforeAfter, setHasBeforeAfter] = useState(false);
  const [beforeImage, setBeforeImage] = useState('');

  const handleOpenAdd = () => {
    setEditingProject(null);
    setName('');
    setCategory('Perkantoran');
    setClient('');
    setLocation('Jakarta');
    setDate('2026');
    setDescription('');
    setMainImage('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80');
    setHasBeforeAfter(false);
    setBeforeImage('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Project) => {
    setEditingProject(p);
    setName(p.name);
    setCategory(p.category);
    setClient(p.client);
    setLocation(p.location);
    setDate(p.date);
    setDescription(p.description);
    setMainImage(p.mainImage);
    setHasBeforeAfter(!!p.beforeAfter);
    setBeforeImage(p.beforeAfter?.before || '');
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, projName: string) => {
    if (window.confirm(`Hapus proyek "${projName}" dari portofolio?`)) {
      deleteProject(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !client.trim()) return;

    const slug =
      editingProject?.slug ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const payload: Project = {
      id: editingProject?.id || `proj-${Date.now()}`,
      name: name.trim(),
      slug,
      category,
      client: client.trim(),
      location: location.trim(),
      date: date.trim(),
      description: description.trim(),
      featured: editingProject?.featured ?? true,
      mainImage: mainImage.trim(),
      beforeAfter: hasBeforeAfter
        ? {
            before: beforeImage.trim(),
            after: mainImage.trim(),
          }
        : undefined,
      gallery: [mainImage.trim()],
    };

    saveProject(payload);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-stone-900">
            Portofolio & Realisasi Proyek
          </h2>
          <p className="text-xs text-stone-500">
            Kelola dokumentasi pengerjaan perabot kantor, rumah mewah, dan fitur Before/After untuk meyakinkan calon klien.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#18181B] hover:bg-stone-800 text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4 text-[#B88E2F]" />
          <span>Tambah Portofolio Proyek</span>
        </button>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-16/10 bg-stone-100">
              <img src={proj.mainImage} alt={proj.name} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-black/75 text-white text-[10px] font-bold rounded uppercase">
                {proj.category}
              </span>
              {proj.beforeAfter && (
                <span className="absolute bottom-3 right-3 px-2 py-0.5 bg-[#B88E2F] text-white text-[9px] font-bold rounded">
                  Before/After
                </span>
              )}
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-base">{proj.name}</h4>
                <p className="text-xs text-stone-600 line-clamp-2 mt-1">{proj.description}</p>
              </div>

              <div className="pt-3 border-t border-stone-100 text-xs text-stone-500 space-y-1">
                <div>Klien: <strong className="text-stone-800">{proj.client}</strong></div>
                <div>Lokasi: <span className="text-stone-700">{proj.location} ({proj.date})</span></div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(proj)}
                  className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg cursor-pointer"
                  title="Edit Proyek"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(proj.id, proj.name)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                  title="Hapus Proyek"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Edit / Add Project */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />

          <div className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden z-10 border border-stone-200 flex flex-col max-h-[90vh]">
            <div className="p-5 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <h3 className="font-serif font-bold text-stone-900 text-lg">
                {editingProject ? 'Edit Portofolio Proyek' : 'Tambah Portofolio Proyek'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Nama Proyek <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Kantor Pusat PT Astra Otoparts"
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F] bg-white"
                  >
                    <option value="Perkantoran">Perkantoran</option>
                    <option value="Residensial">Residensial</option>
                    <option value="Komersial & Cafe">Komersial & Cafe</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Nama Klien / Perusahaan <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="Contoh: PT Surya Pratama"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Lokasi</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="SCBD, Jakarta Selatan"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Waktu Selesai</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="2026"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Foto Hasil Jadi (After / Utama) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={mainImage}
                  onChange={(e) => setMainImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                />
              </div>

              {/* Toggle Before/After */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-stone-800">
                  <input
                    type="checkbox"
                    checked={hasBeforeAfter}
                    onChange={(e) => setHasBeforeAfter(e.target.checked)}
                    className="accent-[#B88E2F]"
                  />
                  <span>Sertakan Foto Ruang Asli (Before & After)</span>
                </label>

                {hasBeforeAfter && (
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Foto Sebelum Pengerjaan (Before)
                    </label>
                    <input
                      type="url"
                      value={beforeImage}
                      onChange={(e) => setBeforeImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F] bg-white"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Deskripsi Pengerjaan & Cerita Proyek
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan kebutuhan khusus klien dan solusi perabot yang diaplikasikan..."
                  className="w-full p-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F] resize-none"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#18181B] hover:bg-stone-800 text-white px-5 py-2 rounded-xl font-semibold cursor-pointer"
                >
                  Simpan Portofolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
