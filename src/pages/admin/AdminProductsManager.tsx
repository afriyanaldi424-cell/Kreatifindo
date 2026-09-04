import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Check,
  Eye,
  ShoppingBag,
  DollarSign,
  Image as ImageIcon,
  Layers,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product, PriceMode, StockStatus } from '../../types';
import { formatRupiah } from '../../lib/utils';

export const AdminProductsManager: React.FC = () => {
  const { products, categories, saveProduct, deleteProduct, addToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || 'Meja');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [finishing, setFinishing] = useState('');
  const [priceMode, setPriceMode] = useState<PriceMode>('SHOW_PRICE');
  const [price, setPrice] = useState<number>(0);
  const [priceStartingFrom, setPriceStartingFrom] = useState<number>(3500000);
  const [stockStatus, setStockStatus] = useState<StockStatus>('Ready Stock');
  const [badge, setBadge] = useState('');
  const [mainImage, setMainImage] = useState('');

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.material.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCat === 'ALL' || p.category === selectedCat;
    return matchSearch && matchCat;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setName('');
    setCategory(categories[0]?.name || 'Meja');
    setShortDesc('');
    setDescription('');
    setMaterial('Multiplek 18mm + HPL Taco');
    setDimensions('180 x 80 x 75 cm');
    setFinishing('HPL Tekstur Serat Kayu');
    setPriceMode('SHOW_PRICE');
    setPrice(4500000);
    setPriceStartingFrom(3500000);
    setStockStatus('Ready Stock');
    setBadge('New');
    setMainImage(
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80'
    );
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setCategory(p.category);
    setShortDesc(p.shortDesc);
    setDescription(p.description);
    setMaterial(p.material);
    setDimensions(p.dimensions);
    setFinishing(p.finishing);
    setPriceMode(p.priceMode);
    setPrice(p.price);
    setPriceStartingFrom(p.priceStartingFrom || 0);
    setStockStatus(p.stockStatus);
    setBadge(p.badge || '');
    setMainImage(p.mainImage);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, prodName: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus produk "${prodName}" dari katalog?`)) {
      deleteProduct(id);
    }
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const slug =
      editingProduct?.slug ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const payload: Product = {
      id: editingProduct?.id || `p-${Date.now()}`,
      name: name.trim(),
      slug,
      category,
      categoryId: editingProduct?.categoryId || 'cat-custom',
      shortDesc: shortDesc.trim(),
      description: description.trim(),
      material: material.trim(),
      dimensions: dimensions.trim(),
      finishing: finishing.trim(),
      colors: editingProduct?.colors || ['Natural Walnut', 'Natural Teak', 'Black Iron'],
      priceMode,
      price: priceMode === 'SHOW_PRICE' ? price : 0,
      priceStartingFrom: priceMode === 'REQUEST_QUOTE' ? priceStartingFrom : undefined,
      stockStatus,
      badge: (badge.trim() || undefined) as any,
      featured: editingProduct?.featured ?? true,
      mainImage: mainImage.trim(),
      images: [mainImage.trim()],
      viewCount: editingProduct?.viewCount || 0,
      quoteCount: editingProduct?.quoteCount || 0,
      createdAt: editingProduct?.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    saveProduct(payload);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-stone-900">
            Katalog Produk & Perabot
          </h2>
          <p className="text-xs text-stone-500">
            Tambah, edit spesifikasi teknis, ubah mode harga (Show Price vs Request Quote), dan foto produk.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#18181B] hover:bg-stone-800 text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4 text-[#B88E2F]" />
          <span>Tambah Perabot Baru</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama perabot / bahan..."
            className="w-full pl-9 pr-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B88E2F]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-stone-500 shrink-0">Filter Kategori:</span>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B88E2F] bg-white w-full sm:w-auto"
          >
            <option value="ALL">Semua Kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase text-[11px]">
              <tr>
                <th className="p-3.5">Foto</th>
                <th className="p-3.5">Nama Perabot & Kategori</th>
                <th className="p-3.5">Material & Dimensi</th>
                <th className="p-3.5">Mode Harga</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-stone-50/60">
                  <td className="p-3.5">
                    <img
                      src={prod.mainImage}
                      alt={prod.name}
                      className="w-14 h-14 object-cover rounded-xl bg-stone-100 border border-stone-200"
                    />
                  </td>

                  <td className="p-3.5">
                    <div className="flex items-center gap-1.5">
                      <strong className="text-stone-900 text-sm font-serif">{prod.name}</strong>
                      {prod.badge && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase bg-[#B88E2F]/15 text-[#B88E2F] rounded">
                          {prod.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-stone-500 block">{prod.category}</span>
                  </td>

                  <td className="p-3.5 text-stone-600 max-w-xs">
                    <span className="block truncate font-medium text-stone-800">{prod.material}</span>
                    <span className="block text-[11px] text-stone-400 font-mono">{prod.dimensions}</span>
                  </td>

                  <td className="p-3.5">
                    {prod.priceMode === 'SHOW_PRICE' && prod.price > 0 ? (
                      <div>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[10px] font-bold uppercase">
                          Pasti (Show)
                        </span>
                        <span className="block font-bold text-stone-900 mt-0.5">
                          {formatRupiah(prod.price)}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-[10px] font-bold uppercase">
                          By Quotation
                        </span>
                        <span className="block text-[11px] text-stone-500 mt-0.5">
                          Mulai {formatRupiah(prod.priceStartingFrom || 0)}
                        </span>
                      </div>
                    )}
                  </td>

                  <td className="p-3.5">
                    <span className="px-2 py-1 rounded-md text-[11px] font-medium bg-stone-100 text-stone-700">
                      {prod.stockStatus}
                    </span>
                  </td>

                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(prod)}
                      className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                      title="Edit Produk"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(prod.id, prod.name)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Hapus Produk"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Edit / Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />

          <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden z-10 border border-stone-200 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-lg">
                  {editingProduct ? 'Edit Perabot' : 'Tambah Perabot Baru'}
                </h3>
                <p className="text-xs text-stone-500">
                  Perubahan akan langsung tampil pada katalog digital publik tanpa menyentuh kode.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Nama Perabot <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Meja Rapat Kayu Jati Solid"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Kategori Perabot
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F] bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Mode Choice */}
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                <label className="block font-semibold text-stone-800">
                  Model Penetapan Harga:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 p-2 bg-white border border-stone-200 rounded-xl cursor-pointer">
                    <input
                      type="radio"
                      name="mode"
                      checked={priceMode === 'SHOW_PRICE'}
                      onChange={() => setPriceMode('SHOW_PRICE')}
                      className="accent-[#B88E2F]"
                    />
                    <div>
                      <strong className="block text-stone-900">Tampilkan Harga Pasti</strong>
                      <span className="text-[10px] text-stone-500">Untuk produk standar</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-white border border-stone-200 rounded-xl cursor-pointer">
                    <input
                      type="radio"
                      name="mode"
                      checked={priceMode === 'REQUEST_QUOTE'}
                      onChange={() => setPriceMode('REQUEST_QUOTE')}
                      className="accent-[#B88E2F]"
                    />
                    <div>
                      <strong className="block text-stone-900">Minta Penawaran (Quote)</strong>
                      <span className="text-[10px] text-stone-500">Untuk produk custom</span>
                    </div>
                  </label>
                </div>

                {priceMode === 'SHOW_PRICE' ? (
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Harga Netto (Rp)
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Harga Mulai Dari (Starting From Rp)
                    </label>
                    <input
                      type="number"
                      value={priceStartingFrom}
                      onChange={(e) => setPriceStartingFrom(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                    />
                  </div>
                )}
              </div>

              {/* Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Material Rangka
                  </label>
                  <input
                    type="text"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    placeholder="Multiplek Meranti + HPL Taco"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Dimensi (P x L x T)
                  </label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    placeholder="200 x 90 x 75 cm"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Finishing Lapisan
                  </label>
                  <input
                    type="text"
                    value={finishing}
                    onChange={(e) => setFinishing(e.target.value)}
                    placeholder="HPL Tekstur Serat Kayu"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                  />
                </div>
              </div>

              {/* Stock and Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Status Ketersediaan
                  </label>
                  <select
                    value={stockStatus}
                    onChange={(e) => setStockStatus(e.target.value as StockStatus)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F] bg-white"
                  >
                    <option value="Ready Stock">Ready Stock</option>
                    <option value="Pre-Order 10-14 Hari">Pre-Order 10-14 Hari</option>
                    <option value="Custom Made">Custom Made</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Badge Label Produk (Opsional)
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="Contoh: Best Seller / New / Custom / Proyek"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  URL Foto Produk Utama <span className="text-rose-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={mainImage}
                    onChange={(e) => setMainImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                  />
                  {mainImage && (
                    <img
                      src={mainImage}
                      alt="Preview"
                      className="w-10 h-10 object-cover rounded-lg border"
                    />
                  )}
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Deskripsi Singkat (Tampil pada Card)
                </label>
                <textarea
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat perabot..."
                  className="w-full p-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F] resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Deskripsi Lengkap & Detail Konstruksi
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail lengkap perabot dan keunggulan workshop..."
                  className="w-full p-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F] resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#18181B] hover:bg-stone-800 text-white px-6 py-2 rounded-xl font-semibold cursor-pointer"
                >
                  Simpan Perabot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
