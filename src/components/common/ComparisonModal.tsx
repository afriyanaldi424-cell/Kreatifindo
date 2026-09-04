import React from 'react';
import { X, Trash2, ShoppingBag, ArrowUpRight, Scale } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatRupiah } from '../../lib/utils';

export const ComparisonModal: React.FC = () => {
  const {
    isCompareModalOpen,
    setIsCompareModalOpen,
    comparisonIds,
    removeCompare,
    products,
    addToEstimateCart,
    navigate,
  } = useApp();

  if (!isCompareModalOpen) return null;

  const compareProducts = products.filter((p) => comparisonIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={() => setIsCompareModalOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs"
      />

      <div className="relative bg-white rounded-2xl max-w-6xl w-full shadow-2xl overflow-hidden z-10 border border-stone-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-[#B88E2F]" />
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">Perbandingan Spesifikasi Perabot</h3>
              <p className="text-xs text-stone-500 font-sans">
                Membandingkan {compareProducts.length} dari maksimal 4 produk pilihan
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCompareModalOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-x-auto p-4 sm:p-6">
          {compareProducts.length === 0 ? (
            <div className="py-16 text-center text-stone-400 space-y-3">
              <Scale className="w-12 h-12 mx-auto text-stone-300" />
              <p className="text-sm font-medium text-stone-700">Belum ada produk yang dipilih untuk dibandingkan.</p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Buka halaman katalog perabot dan klik ikon timbangan pada produk yang ingin Anda bandingkan material dan ukurannya.
              </p>
              <button
                onClick={() => {
                  setIsCompareModalOpen(false);
                  navigate('#/katalog');
                }}
                className="mt-2 bg-[#18181B] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Buka Katalog
              </button>
            </div>
          ) : (
            <div className="min-w-[640px]">
              {/* Mobile swipe helper */}
              <div className="sm:hidden text-[11px] text-stone-500 bg-stone-100 px-3 py-1.5 rounded-lg mb-3 text-center">
                👉 Geser tabel ke kanan-kiri untuk melihat seluruh komparasi spesifikasi
              </div>
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="p-3 w-40 text-stone-400 font-medium uppercase tracking-wider bg-stone-50/50">
                      Spesifikasi
                    </th>
                    {compareProducts.map((prod) => (
                      <th key={prod.id} className="p-3 min-w-[200px] align-top">
                        <div className="relative group">
                          <button
                            onClick={() => removeCompare(prod.id)}
                            className="absolute -top-1 -right-1 p-1 text-stone-400 hover:text-rose-600 bg-white rounded-full shadow-sm border border-stone-200 cursor-pointer"
                            title="Hapus dari perbandingan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <img
                            src={prod.mainImage}
                            alt={prod.name}
                            className="w-full h-32 object-cover rounded-lg bg-stone-100 mb-2"
                          />
                          <h4 className="font-serif font-bold text-stone-900 text-sm line-clamp-2">
                            {prod.name}
                          </h4>
                          <span className="text-[11px] text-[#B88E2F] font-semibold block mt-0.5">
                            {prod.category}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr>
                    <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Harga / Estimasi</td>
                    {compareProducts.map((p) => (
                      <td key={p.id} className="p-3 font-bold text-stone-900 text-sm">
                        {p.priceMode === 'SHOW_PRICE' && p.price > 0
                          ? formatRupiah(p.price)
                          : `By Quotation (Mulai ${formatRupiah(p.priceStartingFrom || 0)})`}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Material Utama</td>
                    {compareProducts.map((p) => (
                      <td key={p.id} className="p-3 text-stone-700">
                        {p.material}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Dimensi Presisi</td>
                    {compareProducts.map((p) => (
                      <td key={p.id} className="p-3 text-stone-700 font-mono">
                        {p.dimensions}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Finishing & Coating</td>
                    {compareProducts.map((p) => (
                      <td key={p.id} className="p-3 text-stone-700">
                        {p.finishing}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Pilihan Warna</td>
                    {compareProducts.map((p) => (
                      <td key={p.id} className="p-3 text-stone-700">
                        {p.colors?.join(', ') || '-'}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Status Ketersediaan</td>
                    {compareProducts.map((p) => (
                      <td key={p.id} className="p-3">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-stone-100 text-stone-800">
                          {p.stockStatus}
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Tindakan</td>
                    {compareProducts.map((p) => (
                      <td key={p.id} className="p-3 space-y-2">
                        <button
                          onClick={() => {
                            addToEstimateCart(p, 1);
                          }}
                          className="w-full bg-[#18181B] text-white hover:bg-stone-800 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-[#B88E2F]" />
                          <span>Minta Penawaran</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsCompareModalOpen(false);
                            navigate(`#/produk/${p.slug}`);
                          }}
                          className="w-full border border-stone-200 hover:bg-stone-100 py-1.5 px-3 rounded-lg text-xs text-stone-700 font-medium flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Buka Detail</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
