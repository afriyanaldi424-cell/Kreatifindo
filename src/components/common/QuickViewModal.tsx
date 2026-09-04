import React, { useState } from 'react';
import { X, Heart, Scale, MessageCircle, ShoppingBag, ArrowUpRight, Check, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatRupiah, generateProductWhatsAppLink } from '../../lib/utils';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickView,
    addToEstimateCart,
    toggleWishlist,
    wishlistIds,
    toggleCompare,
    comparisonIds,
    settings,
    navigate,
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = wishlistIds.includes(product.id);
  const isCompared = comparisonIds.includes(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.mainImage];

  const handleAddToCart = () => {
    addToEstimateCart(product, quantity);
    setQuickView(null);
  };

  const handleFullDetail = () => {
    setQuickView(null);
    navigate(`#/produk/${product.slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        onClick={() => setQuickView(null)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-y-auto max-h-[92vh] z-10 border border-stone-200 animate-scaleUp">
        {/* Close button */}
        <button
          onClick={() => setQuickView(null)}
          className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-stone-900 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Gallery */}
          <div className="p-6 bg-stone-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
            <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-stone-100 mb-3 shadow-inner">
              <img
                src={images[activeImageIndex] || product.mainImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-[#B88E2F] text-white rounded shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-[#B88E2F] shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#B88E2F]" />
                Garansi Konstruksi Resmi
              </span>
              <span className="font-medium text-stone-700">{product.stockStatus}</span>
            </div>
          </div>

          {/* Details & Action */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase font-semibold tracking-wider text-[#B88E2F]">
                  {product.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
                  {product.name}
                </h3>
              </div>

              {/* Price */}
              <div className="pb-3 border-b border-stone-100">
                {product.priceMode === 'SHOW_PRICE' && product.price > 0 ? (
                  <div>
                    <span className="text-2xl font-bold text-stone-900 font-sans">
                      {formatRupiah(product.price)}
                    </span>
                    <span className="text-xs text-stone-500 block mt-0.5">
                      Harga netto / per unit (Belum termasuk diskon kuantitas proyek)
                    </span>
                  </div>
                ) : (
                  <div className="inline-block bg-[#B88E2F]/10 text-[#B88E2F] px-3 py-1.5 rounded-lg">
                    <span className="text-sm font-bold block">Harga By Quotation</span>
                    <span className="text-[11px] text-stone-600 block">
                      Mulai dari {formatRupiah(product.priceStartingFrom || 3000000)} (Sesuai Ukuran & Material)
                    </span>
                  </div>
                )}
              </div>

              {/* Short Specs */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {product.shortDesc}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs bg-stone-50 p-3 rounded-xl border border-stone-200">
                <div>
                  <span className="text-stone-400 block font-medium">Material Utama</span>
                  <span className="text-stone-800 font-semibold line-clamp-1">{product.material}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-medium">Dimensi Presisi</span>
                  <span className="text-stone-800 font-semibold line-clamp-1">{product.dimensions}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-medium">Finishing</span>
                  <span className="text-stone-800 font-semibold line-clamp-1">{product.finishing}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-medium">Ketersediaan</span>
                  <span className="text-stone-800 font-semibold">{product.stockStatus}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-5 border-t border-stone-200 space-y-3">
              <div className="flex items-center gap-3">
                {/* Qty Input */}
                <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 px-2 py-1.5">
                  <span className="text-xs text-stone-500 mr-2">Qty:</span>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center text-xs font-bold text-stone-900 bg-transparent focus:outline-none"
                  />
                </div>

                {/* Add to Estimate Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#18181B] text-white hover:bg-stone-800 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4 text-[#B88E2F]" />
                  <span>Minta Penawaran (Daftar Kebutuhan)</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={generateProductWhatsAppLink(product, settings.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] text-white hover:bg-[#1EBE5D] py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Konsultasi via WhatsApp</span>
                </a>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2 border rounded-lg transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'border-rose-300 bg-rose-50 text-rose-600'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                  title="Simpan ke Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>

                <button
                  onClick={() => toggleCompare(product.id)}
                  className={`p-2 border rounded-lg transition-colors cursor-pointer ${
                    isCompared
                      ? 'border-[#B88E2F] bg-[#B88E2F]/10 text-[#B88E2F]'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                  title="Bandingkan Spesifikasi"
                >
                  <Scale className="w-4 h-4" />
                </button>

                <button
                  onClick={handleFullDetail}
                  className="p-2 border border-stone-200 hover:bg-stone-100 rounded-lg text-stone-700 transition-colors cursor-pointer"
                  title="Buka Halaman Lengkap"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
