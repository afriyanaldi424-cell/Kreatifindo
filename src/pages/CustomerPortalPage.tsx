import React, { useState } from 'react';
import { Heart, Clock, Trash2, ShoppingBag, Eye, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatRupiah } from '../lib/utils';

export const CustomerPortalPage: React.FC = () => {
  const {
    wishlistIds,
    toggleWishlist,
    recentlyViewedIds,
    products,
    addToEstimateCart,
    setQuickView,
    navigate,
    currentRoute,
  } = useApp();

  const isWishlistTab = currentRoute.includes('tab=wishlist') || !currentRoute.includes('tab=');
  const [activeTab, setActiveTab] = useState<'wishlist' | 'recent'>(
    isWishlistTab ? 'wishlist' : 'recent'
  );

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));
  const recentProducts = products.filter((p) => recentlyViewedIds.includes(p.id));

  return (
    <div className="bg-[#FBFBF9] min-h-screen py-12 sm:py-16 border-b border-stone-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#B88E2F]">
            Area Pelanggan
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Produk Tersimpan & Riwayat Dilihat
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Daftar perabot yang Anda tandai atau kunjungi sebelumnya untuk memudahkan penyusunan konsep interior ruangan.
          </p>
        </div>

        {/* Tabs Switcher */}
        <div className="flex border-b border-stone-200 gap-6">
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'wishlist'
                ? 'border-[#B88E2F] text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Wishlist Tersimpan ({wishlistProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('recent')}
            className={`pb-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'recent'
                ? 'border-[#B88E2F] text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            <Clock className="w-4 h-4 text-[#B88E2F]" />
            <span>Baru Saja Dilihat ({recentProducts.length})</span>
          </button>
        </div>

        {/* Content Section */}
        {activeTab === 'wishlist' ? (
          <div>
            {wishlistProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4">
                <Heart className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="font-serif font-bold text-stone-900 text-lg">
                  Belum Ada Produk di Wishlist
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Jelajahi katalog perabot kami dan klik ikon hati untuk menyimpan perabot favorit Anda di sini.
                </p>
                <button
                  onClick={() => navigate('#/katalog')}
                  className="bg-[#18181B] text-white px-5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer hover:bg-stone-800"
                >
                  Buka Katalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => navigate(`#/produk/${product.slug}`)}
                      />
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-full text-rose-500 hover:bg-white shadow-sm cursor-pointer"
                        title="Hapus dari wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-[#B88E2F] font-semibold uppercase">
                          {product.category}
                        </span>
                        <h4
                          onClick={() => navigate(`#/produk/${product.slug}`)}
                          className="font-serif font-bold text-stone-900 text-sm line-clamp-1 hover:text-[#B88E2F] cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <span className="text-xs font-bold text-stone-900 block mt-1">
                          {product.priceMode === 'SHOW_PRICE' && product.price > 0
                            ? formatRupiah(product.price)
                            : `By Quotation (Mulai ${formatRupiah(product.priceStartingFrom || 0)})`}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-stone-100 flex items-center gap-2">
                        <button
                          onClick={() => addToEstimateCart(product, 1)}
                          className="flex-1 bg-[#18181B] hover:bg-stone-800 text-white py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-[#B88E2F]" />
                          <span>Minta Penawaran</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {recentProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4">
                <Clock className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="font-serif font-bold text-stone-900 text-lg">
                  Belum Ada Riwayat Kunjungan
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Produk yang Anda buka detailnya akan otomatis tersimpan di sini untuk memudahkan navigasi kembali.
                </p>
                <button
                  onClick={() => navigate('#/katalog')}
                  className="bg-[#18181B] text-white px-5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer hover:bg-stone-800"
                >
                  Buka Katalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => navigate(`#/produk/${product.slug}`)}
                      />
                    </div>

                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-[#B88E2F] font-semibold uppercase">
                          {product.category}
                        </span>
                        <h4
                          onClick={() => navigate(`#/produk/${product.slug}`)}
                          className="font-serif font-bold text-stone-900 text-sm line-clamp-1 hover:text-[#B88E2F] cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <span className="text-xs font-bold text-stone-900 block mt-1">
                          {product.priceMode === 'SHOW_PRICE' && product.price > 0
                            ? formatRupiah(product.price)
                            : `By Quotation (Mulai ${formatRupiah(product.priceStartingFrom || 0)})`}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-stone-100 flex items-center gap-2">
                        <button
                          onClick={() => addToEstimateCart(product, 1)}
                          className="flex-1 bg-[#18181B] hover:bg-stone-800 text-white py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-[#B88E2F]" />
                          <span>Minta Penawaran</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
