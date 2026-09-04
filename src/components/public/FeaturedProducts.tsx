import React, { useState } from 'react';
import {
  Eye,
  Heart,
  Scale,
  ShoppingBag,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { formatRupiah, generateProductWhatsAppLink } from '../../lib/utils';

export const FeaturedProducts: React.FC = () => {
  const {
    products,
    setQuickView,
    addToEstimateCart,
    toggleWishlist,
    wishlistIds,
    toggleCompare,
    comparisonIds,
    settings,
    navigate,
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'Semua Unggulan' },
    { id: 'bestseller', label: 'Best Seller' },
    { id: 'new', label: 'Produk Baru' },
    { id: 'custom', label: 'Custom Made' },
    { id: 'office', label: 'Perkantoran' },
  ];

  const filteredProducts = products.filter((product) => {
    if (activeTab === 'bestseller') return product.badge === 'Best Seller';
    if (activeTab === 'new') return product.badge === 'New';
    if (activeTab === 'custom') return product.category === 'Furniture Custom' || product.badge === 'Custom';
    if (activeTab === 'office') return product.category === 'Furniture Kantor';
    return true;
  });

  return (
    <section className="py-16 sm:py-24 bg-[#FBFBF9] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header & Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-widest text-[#B88E2F] font-sans">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pilihan Desain Terbaik</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Koleksi Perabot Unggulan
            </h2>
            <p className="text-sm text-stone-600 font-sans max-w-lg">
              Setiap produk dikerjakan dengan standar presisi workshop kami, memadukan ketahanan material dan kemewahan estetika.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#18181B] text-white shadow-sm'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const isCompared = comparisonIds.includes(product.id);
            const isShowPrice = product.priceMode === 'SHOW_PRICE' && product.price > 0;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-stone-300 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Area */}
                <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 cursor-pointer"
                    onClick={() => navigate(`#/produk/${product.slug}`)}
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#18181B] text-[#D4AF37] rounded-md shadow-xs">
                      {product.badge}
                    </span>
                  )}

                  {/* Quick Action Floating Bar */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-2 rounded-full bg-white/90 backdrop-blur-md shadow-sm hover:bg-white transition-all cursor-pointer ${
                        isWishlisted ? 'text-rose-600' : 'text-stone-700 hover:text-rose-600'
                      }`}
                      title="Wishlist"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                    </button>

                    <button
                      onClick={() => toggleCompare(product.id)}
                      className={`p-2 rounded-full bg-white/90 backdrop-blur-md shadow-sm hover:bg-white transition-all cursor-pointer ${
                        isCompared ? 'text-[#B88E2F]' : 'text-stone-700 hover:text-[#B88E2F]'
                      }`}
                      title="Bandingkan"
                    >
                      <Scale className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setQuickView(product)}
                      className="p-2 rounded-full bg-white/90 backdrop-blur-md shadow-sm hover:bg-white text-stone-700 hover:text-stone-900 transition-all cursor-pointer"
                      title="Quick View"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-stone-500 font-sans mb-1">
                      <span className="font-semibold text-[#B88E2F] uppercase tracking-wider">
                        {product.category}
                      </span>
                      <span>{product.stockStatus}</span>
                    </div>

                    <h3
                      onClick={() => navigate(`#/produk/${product.slug}`)}
                      className="font-serif font-bold text-stone-900 text-base group-hover:text-[#B88E2F] transition-colors line-clamp-1 cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-stone-500 line-clamp-2 mt-1 font-sans">
                      {product.shortDesc}
                    </p>
                  </div>

                  {/* Material & Dimension snippet */}
                  <div className="text-[11px] text-stone-600 bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-150 line-clamp-1 font-sans">
                    <span className="font-medium text-stone-800">Mat:</span> {(product.material || '').split('+')[0]}
                  </div>

                  {/* Price and CTA */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div>
                      {isShowPrice ? (
                        <div>
                          <span className="text-sm font-bold text-stone-900 block font-sans">
                            {formatRupiah(product.price)}
                          </span>
                          <span className="text-[10px] text-stone-400 block">Unit Netto</span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-xs font-bold text-[#B88E2F] block font-sans">
                            By Quotation
                          </span>
                          <span className="text-[10px] text-stone-400 block">
                            Mulai {formatRupiah(product.priceStartingFrom || 0)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={generateProductWhatsAppLink(product, settings.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                        title="Tanya WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => addToEstimateCart(product, 1)}
                        className="flex items-center gap-1.5 bg-[#18181B] hover:bg-stone-800 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#B88E2F]" />
                        <span>Minta Penawaran</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('#/katalog')}
            className="inline-flex items-center gap-2 bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-xs cursor-pointer group"
          >
            <span>Jelajahi Seluruh Katalog Perabot</span>
            <ArrowRight className="w-4 h-4 text-[#B88E2F] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
