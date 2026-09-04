import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  Heart,
  Scale,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  Truck,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Ruler,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatRupiah, generateProductWhatsAppLink } from '../lib/utils';
import { Product } from '../types';

interface ProductDetailPageProps {
  productSlug?: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productSlug }) => {
  const {
    currentRoute,
    products,
    addToEstimateCart,
    toggleWishlist,
    wishlistIds,
    toggleCompare,
    comparisonIds,
    settings,
    navigate,
    addRecentlyViewed,
  } = useApp();

  // Extract slug from prop or route: #/produk/slug-here
  const slug = productSlug || (currentRoute || window.location.hash || '').replace('#/produk/', '').split('?')[0];
  const product = products.find((p) => p.slug === slug) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState('');
  const [activeTab, setActiveTab] = useState<'desc' | 'custom' | 'warranty'>('desc');

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      window.scrollTo(0, 0);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold text-stone-900">Produk Tidak Ditemukan</h2>
        <button
          onClick={() => navigate('#/katalog')}
          className="mt-4 bg-[#18181B] text-white px-6 py-2.5 rounded-lg text-xs font-semibold"
        >
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  const isWishlisted = wishlistIds.includes(product.id);
  const isCompared = comparisonIds.includes(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.mainImage];
  const isShowPrice = product.priceMode === 'SHOW_PRICE' && product.price > 0;

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToEstimateCart(product, quantity, customNote);
  };

  return (
    <div className="bg-[#FBFBF9] min-h-screen py-8 sm:py-12 border-b border-stone-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8 overflow-x-auto whitespace-nowrap">
          <button onClick={() => navigate('#/')} className="hover:text-stone-900 cursor-pointer">
            Beranda
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <button onClick={() => navigate('#/katalog')} className="hover:text-stone-900 cursor-pointer">
            Katalog Perabot
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <button
            onClick={() => navigate(`#/katalog?cat=${product.category.toLowerCase()}`)}
            className="hover:text-stone-900 cursor-pointer"
          >
            {product.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-stone-900 font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Visual & Purchase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
          {/* Visual Gallery (Left) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-md">
              <img
                src={images[activeImageIndex] || product.mainImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-[#18181B] text-[#D4AF37] rounded-md shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer bg-white ${
                      activeImageIndex === idx
                        ? 'border-[#B88E2F] shadow-sm scale-102'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* In-House Production Guarantee Banner */}
            <div className="p-4 rounded-2xl bg-stone-900 text-stone-300 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <Wrench className="w-5 h-5 text-[#B88E2F] shrink-0" />
                <div>
                  <span className="text-white font-semibold block">Dikerjakan di Workshop Mandiri</span>
                  <span className="text-stone-400 text-[11px]">Bukan reseller/calo. Garansi purnajual resmi tertulis.</span>
                </div>
              </div>
              <span className="text-[#CBB279] font-bold shrink-0 ml-2">SNI Grade</span>
            </div>
          </div>

          {/* Product Specifications & Order (Right) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B88E2F]">
                  {product.category}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 font-semibold">
                  {product.stockStatus}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {product.shortDesc}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
              {isShowPrice ? (
                <div>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                    {formatRupiah(product.price)}
                  </span>
                  <span className="text-xs text-stone-500 block mt-1">
                    *Harga per unit netto (Belum termasuk diskon volume pengadaan proyek).
                  </span>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 text-[#B88E2F] font-bold text-lg font-serif">
                    <span>Harga By Quotation</span>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-stone-600 block mt-1">
                    Estimasi mulai dari <strong className="text-stone-900">{formatRupiah(product.priceStartingFrom || 3500000)}</strong> tergantung ukuran dimensi & opsi material pilihan Anda.
                  </span>
                </div>
              )}
            </div>

            {/* Technical Specs Table */}
            <div className="space-y-2.5 text-xs text-stone-700">
              <h4 className="font-serif font-bold text-stone-900 text-sm">Spesifikasi Teknis Standar:</h4>
              <div className="grid grid-cols-2 gap-2 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                <div>
                  <span className="text-stone-400 block text-[11px]">Material Rangka</span>
                  <span className="font-semibold text-stone-900">{product.material}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Dimensi Standar</span>
                  <span className="font-semibold text-stone-900 font-mono">{product.dimensions}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Lapisan Finishing</span>
                  <span className="font-semibold text-stone-900">{product.finishing}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Garansi Konstruksi</span>
                  <span className="font-semibold text-stone-900">1-2 Tahun Resmi</span>
                </div>
              </div>
            </div>

            {/* Custom Dimensions / Notes */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Catatan Kustomisasi (Ukuran / Warna / Ruangan):
              </label>
              <textarea
                rows={2}
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Contoh: Butuh panjang 240 cm, warna HPL Walnut gelap, ada jalur kabel stopkontak..."
                className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#B88E2F] resize-none"
              />
            </div>

            {/* Quantity and Primary Action */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 px-3 py-2">
                  <span className="text-xs text-stone-500 mr-2">Jumlah:</span>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center text-xs font-bold text-stone-900 bg-transparent focus:outline-none"
                  />
                  <span className="text-xs text-stone-500 ml-1">unit</span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#18181B] hover:bg-stone-800 text-white py-3 px-5 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#B88E2F]" />
                  <span>Tambahkan ke Daftar Penawaran</span>
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="flex items-center gap-2">
                <a
                  href={generateProductWhatsAppLink(product, settings.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Konsultasikan via WhatsApp</span>
                </a>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2.5 border rounded-xl transition-colors cursor-pointer ${
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
                  className={`p-2.5 border rounded-xl transition-colors cursor-pointer ${
                    isCompared
                      ? 'border-[#B88E2F] bg-[#B88E2F]/10 text-[#B88E2F]'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                  title="Bandingkan Spesifikasi"
                >
                  <Scale className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick delivery & installation notes */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#B88E2F]" />
                Kirim Se-Jabodetabek & Luar Kota
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B88E2F]" />
                Instalasi Rapi & Garansi
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Overview / Customization / Warranty */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 mb-16 shadow-xs">
          <div className="flex border-b border-stone-200 gap-6 sm:gap-8 mb-8 overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-4 text-sm sm:text-base font-serif font-bold transition-all cursor-pointer border-b-2 ${
                activeTab === 'desc'
                  ? 'border-[#B88E2F] text-stone-900'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              Deskripsi & Konstruksi
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`pb-4 text-sm sm:text-base font-serif font-bold transition-all cursor-pointer border-b-2 ${
                activeTab === 'custom'
                  ? 'border-[#B88E2F] text-stone-900'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              Opsi Kustomisasi & Warna
            </button>
            <button
              onClick={() => setActiveTab('warranty')}
              className={`pb-4 text-sm sm:text-base font-serif font-bold transition-all cursor-pointer border-b-2 ${
                activeTab === 'warranty'
                  ? 'border-[#B88E2F] text-stone-900'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              Garansi & Pengiriman
            </button>
          </div>

          {activeTab === 'desc' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed max-w-4xl">
              <p>{product.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2">
                  <h4 className="font-serif font-bold text-stone-900 text-sm">Ketahanan & Rangka</h4>
                  <p className="text-xs text-stone-600">
                    Diproduksi dengan sistem sambungan dowel kayu keras dan sekrup baja galvanis tersembunyi. Tidak mudah goyang, lentur, atau melengkung seiring waktu dan perubahan kelembapan.
                  </p>
                </div>
                <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2">
                  <h4 className="font-serif font-bold text-stone-900 text-sm">Edge-Banding Mesin Otomatis</h4>
                  <p className="text-xs text-stone-600">
                    Seluruh tepian panel direkatkan menggunakan mesin edge-banding lem panas PUR bertekanan tinggi sehingga kedap air, tidak mudah sompel atau mengelupas.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed max-w-4xl">
              <p>
                Setiap perabot Kreatifindo dapat dikustomisasi secara menyeluruh untuk menyesuaikan arsitektur ruangan Anda:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs text-stone-700">
                <li><strong>Penyesuaian Dimensi:</strong> Ukuran panjang, lebar, dan tinggi dapat dipotong sesuai millimeter denah.</li>
                <li><strong>Pilihan Finishing:</strong> Pilihan lebih dari 200+ katalog motif HPL (serat jati, oak eropa, marmer hitam, beton abu) atau semprot duco matte.</li>
                <li><strong>Integrasi Elektrikal:</strong> Penambahan lubang kabel grommet, pop-up power socket, dan jalur kabel LED tersembunyi.</li>
                <li><strong>Hardware Pilihan:</strong> Upgrade ke engsel hidrolik Blumotion (Austria) atau rel laci undermount soft-close.</li>
              </ul>
            </div>
          )}

          {activeTab === 'warranty' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed max-w-4xl">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
                <h4 className="font-semibold text-xs sm:text-sm mb-1">Kartu Garansi Resmi Tertulis</h4>
                <p className="text-xs text-amber-800">
                  Setiap pengadaan perabot Kreatifindo disertai sertifikat garansi resmi selama 1 hingga 2 tahun untuk kekuatan sambungan konstruksi dan fitting bergerak.
                </p>
              </div>
              <p className="text-xs text-stone-600">
                Pengiriman diantar langsung dengan armada tertutup workshop Kreatifindo. Tim instalasi kami akan merakit hingga tuntas di dalam ruangan dan membersihkan seluruh sisa kemasan.
              </p>
            </div>
          )}
        </div>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                Perabot Terkait Kategori {product.category}
              </h3>
              <button
                onClick={() => navigate(`#/katalog?cat=${product.category.toLowerCase()}`)}
                className="text-xs font-semibold text-[#B88E2F] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Lihat Kategori Ini</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigate(`#/produk/${rel.slug}`)}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all p-4 cursor-pointer group"
                >
                  <img
                    src={rel.mainImage}
                    alt={rel.name}
                    className="w-full h-44 object-cover rounded-xl bg-stone-100 group-hover:scale-103 transition-transform"
                  />
                  <div className="pt-3 space-y-1">
                    <span className="text-[10px] text-[#B88E2F] font-semibold uppercase">{rel.category}</span>
                    <h4 className="font-serif font-bold text-stone-900 text-sm line-clamp-1 group-hover:text-[#B88E2F]">
                      {rel.name}
                    </h4>
                    <span className="text-xs font-bold text-stone-900 block pt-1">
                      {rel.priceMode === 'SHOW_PRICE' && rel.price > 0
                        ? formatRupiah(rel.price)
                        : `Mulai ${formatRupiah(rel.priceStartingFrom || 0)}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
