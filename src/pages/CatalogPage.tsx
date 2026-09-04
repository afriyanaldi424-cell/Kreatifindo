import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  Grid,
  List,
  Heart,
  Scale,
  Eye,
  ShoppingBag,
  MessageCircle,
  X,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { formatRupiah, generateProductWhatsAppLink } from '../lib/utils';

export const CatalogPage: React.FC = () => {
  const {
    products,
    categories,
    setQuickView,
    addToEstimateCart,
    toggleWishlist,
    wishlistIds,
    toggleCompare,
    comparisonIds,
    settings,
    navigate,
    currentRoute,
  } = useApp();

  // URL Query param parsing
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedMaterial, setSelectedMaterial] = useState('ALL');
  const [priceFilter, setPriceFilter] = useState('ALL');
  const [stockFilter, setStockFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync with route params (e.g. #/katalog?cat=meja or #/katalog?q=kursi)
  useEffect(() => {
    if (currentRoute && currentRoute.includes('?')) {
      const queryStr = currentRoute.split('?')[1];
      const params = new URLSearchParams(queryStr);
      const catParam = params.get('cat');
      const qParam = params.get('q');

      if (catParam) {
        const found = categories.find((c) => c.slug === catParam);
        if (found) setSelectedCategory(found.name);
      }
      if (qParam) {
        setSearchTerm(decodeURIComponent(qParam));
      }
    }
  }, [currentRoute, categories]);

  // Unique materials for filter
  const materialList = useMemo(() => {
    const list = new Set<string>();
    products.forEach((p) => {
      const firstMat = (p.material || '').split('+')[0].trim();
      if (firstMat) list.add(firstMat);
    });
    return Array.from(list);
  }, [products]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Search
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchTitle = prod.name.toLowerCase().includes(query);
        const matchDesc = prod.shortDesc.toLowerCase().includes(query);
        const matchMat = prod.material.toLowerCase().includes(query);
        const matchCat = prod.category.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchMat && !matchCat) return false;
      }

      // Category
      if (selectedCategory !== 'ALL' && prod.category !== selectedCategory) {
        return false;
      }

      // Material
      if (selectedMaterial !== 'ALL' && !prod.material.toLowerCase().includes(selectedMaterial.toLowerCase())) {
        return false;
      }

      // Stock
      if (stockFilter !== 'ALL' && prod.stockStatus !== stockFilter) {
        return false;
      }

      // Price
      if (priceFilter === 'QUOTE_ONLY') {
        if (prod.priceMode !== 'REQUEST_QUOTE') return false;
      } else if (priceFilter === 'UNDER_5M') {
        if (prod.price === 0 || prod.price > 5000000) return false;
      } else if (priceFilter === '5M_TO_15M') {
        if (prod.price < 5000000 || prod.price > 15000000) return false;
      } else if (priceFilter === 'ABOVE_15M') {
        if (prod.price <= 15000000) return false;
      }

      return true;
    });
  }, [products, searchTerm, selectedCategory, selectedMaterial, stockFilter, priceFilter]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price_asc') {
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price_desc') {
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'name_asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0));
    }
    return list;
  }, [filteredProducts, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('ALL');
    setSelectedMaterial('ALL');
    setPriceFilter('ALL');
    setStockFilter('ALL');
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedCategory !== 'ALL' ||
    selectedMaterial !== 'ALL' ||
    priceFilter !== 'ALL' ||
    stockFilter !== 'ALL';

  return (
    <div className="bg-[#FBFBF9] min-h-screen py-10 sm:py-14 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Page Header */}
        <div className="mb-10 space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#B88E2F] font-sans">
            <span>Katalog Digital</span>
            <span>/</span>
            <span className="text-stone-500">Perabot & Interior</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Koleksi Perabot & Furniture
          </h1>
          <p className="text-sm text-stone-600 font-sans max-w-2xl leading-relaxed">
            Pilihan furniture siap produksi maupun pesanan custom presisi. Tambahkan ke daftar kebutuhan untuk mendapatkan estimasi lembar penawaran resmi (Quotation PDF).
          </p>
        </div>

        {/* Search & Top Action Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama perabot, material, atau fungsi..."
              className="w-full pl-10 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:bg-white"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Controls: Sort, View Toggle, Mobile Filter Button */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3 text-xs font-sans">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 border border-stone-200 rounded-xl text-stone-700 bg-stone-50 hover:bg-stone-100"
            >
              <Filter className="w-4 h-4 text-[#B88E2F]" />
              <span>Filter ({hasActiveFilters ? 'Aktif' : 'Semua'})</span>
            </button>

            <div className="flex items-center gap-2 ml-auto md:ml-0">
              <span className="text-stone-500 hidden sm:inline">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-stone-200 rounded-xl text-stone-800 bg-stone-50 focus:outline-none focus:border-[#B88E2F]"
              >
                <option value="featured">Paling Populer</option>
                <option value="newest">Produk Terbaru</option>
                <option value="price_asc">Harga Terendah</option>
                <option value="price_desc">Harga Tertinggi</option>
                <option value="name_asc">Nama A-Z</option>
              </select>

              <div className="hidden sm:flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50 p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-400 hover:text-stone-700'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'list' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-400 hover:text-stone-700'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout (Sidebar + Results) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside
            className={`lg:col-span-3 bg-white p-6 rounded-2xl border border-stone-200 space-y-6 font-sans ${
              isMobileFilterOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2 font-serif font-bold text-stone-900 text-base">
                <SlidersHorizontal className="w-4 h-4 text-[#B88E2F]" />
                <span>Filter Perabot</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-[#B88E2F] hover:underline font-semibold cursor-pointer"
                >
                  Reset Semua
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                Kategori
              </h4>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setSelectedCategory('ALL')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer flex justify-between items-center ${
                    selectedCategory === 'ALL'
                      ? 'bg-[#18181B] text-white font-semibold'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span>Semua Kategori</span>
                  <span className="text-[11px] opacity-75">{products.length}</span>
                </button>

                {categories.map((cat) => {
                  const count = products.filter((p) => p.category === cat.name).length;
                  const isSelected = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer flex justify-between items-center ${
                        isSelected
                          ? 'bg-[#18181B] text-white font-semibold'
                          : 'text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[11px] opacity-75">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-4 border-t border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                Rentang Harga
              </h4>
              <div className="space-y-1.5 text-xs text-stone-600">
                {[
                  { id: 'ALL', label: 'Semua Harga' },
                  { id: 'UNDER_5M', label: 'Di Bawah Rp 5 Juta' },
                  { id: '5M_TO_15M', label: 'Rp 5 Juta - Rp 15 Juta' },
                  { id: 'ABOVE_15M', label: 'Di Atas Rp 15 Juta' },
                  { id: 'QUOTE_ONLY', label: 'Hanya By Quotation' },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-2.5 cursor-pointer py-1">
                    <input
                      type="radio"
                      name="price_filter"
                      checked={priceFilter === item.id}
                      onChange={() => setPriceFilter(item.id)}
                      className="accent-[#B88E2F] w-4 h-4"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Material Filter */}
            <div className="pt-4 border-t border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                Material Bodi
              </h4>
              <div className="space-y-1.5 text-xs text-stone-600">
                <button
                  onClick={() => setSelectedMaterial('ALL')}
                  className={`w-full text-left px-2 py-1.5 rounded transition-colors ${
                    selectedMaterial === 'ALL' ? 'text-[#B88E2F] font-bold' : 'hover:text-stone-900'
                  }`}
                >
                  Semua Material
                </button>
                {materialList.map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`w-full text-left px-2 py-1.5 rounded transition-colors truncate block ${
                      selectedMaterial === mat ? 'text-[#B88E2F] font-bold' : 'hover:text-stone-900'
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Availability */}
            <div className="pt-4 border-t border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                Ketersediaan
              </h4>
              <div className="space-y-1.5 text-xs text-stone-600">
                {[
                  { id: 'ALL', label: 'Semua Status' },
                  { id: 'Ready Stock', label: 'Ready Stock' },
                  { id: 'Pre-Order 10-14 Hari', label: 'Pre-Order 10-14 Hari' },
                  { id: 'Custom Made', label: 'Custom Made' },
                ].map((st) => (
                  <label key={st.id} className="flex items-center gap-2.5 cursor-pointer py-1">
                    <input
                      type="radio"
                      name="stock_filter"
                      checked={stockFilter === st.id}
                      onChange={() => setStockFilter(st.id)}
                      className="accent-[#B88E2F] w-4 h-4"
                    />
                    <span>{st.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Results Area */}
          <main className="lg:col-span-9 space-y-6">
            {/* Results meta bar */}
            <div className="flex items-center justify-between text-xs text-stone-500 font-sans pb-2">
              <p>
                Menampilkan <strong className="text-stone-900">{sortedProducts.length}</strong> produk perabot
                {hasActiveFilters && <span> (difilter)</span>}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[#B88E2F] hover:underline font-semibold cursor-pointer"
                >
                  Hapus Semua Filter
                </button>
              )}
            </div>

            {/* Empty State */}
            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4">
                <Search className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="font-serif font-bold text-stone-900 text-lg">
                  Tidak Ada Produk yang Sesuai
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto font-sans">
                  Kombinasi kata kunci atau filter Anda belum menghasilkan item. Silakan reset filter atau konsultasikan kebutuhan custom Anda ke customer service.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#18181B] text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Reset Filter Pencarian
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* Grid View */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => {
                  const isWishlisted = wishlistIds.includes(product.id);
                  const isCompared = comparisonIds.includes(product.id);
                  const isShowPrice = product.priceMode === 'SHOW_PRICE' && product.price > 0;

                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-stone-300 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                        <img
                          src={product.mainImage}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 cursor-pointer"
                          onClick={() => navigate(`#/produk/${product.slug}`)}
                        />

                        {product.badge && (
                          <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#18181B] text-[#D4AF37] rounded-md shadow-xs">
                            {product.badge}
                          </span>
                        )}

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

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3 font-sans">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
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

                          <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                            {product.shortDesc}
                          </p>
                        </div>

                        <div className="text-[11px] text-stone-600 bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-150 line-clamp-1">
                          <span className="font-semibold text-stone-800">Bahan:</span> {(product.material || '').split('+')[0]}
                        </div>

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
                              className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
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
            ) : (
              /* List View */
              <div className="space-y-4">
                {sortedProducts.map((product) => {
                  const isWishlisted = wishlistIds.includes(product.id);
                  const isCompared = comparisonIds.includes(product.id);
                  const isShowPrice = product.priceMode === 'SHOW_PRICE' && product.price > 0;

                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-center font-sans"
                    >
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="w-full sm:w-48 h-40 object-cover rounded-xl bg-stone-100 shrink-0 cursor-pointer"
                        onClick={() => navigate(`#/produk/${product.slug}`)}
                      />

                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#B88E2F] uppercase tracking-wider">
                            {product.category}
                          </span>
                          <span className="text-xs text-stone-500">{product.stockStatus}</span>
                        </div>

                        <h3
                          onClick={() => navigate(`#/produk/${product.slug}`)}
                          className="font-serif font-bold text-stone-900 text-lg hover:text-[#B88E2F] cursor-pointer"
                        >
                          {product.name}
                        </h3>

                        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                          {product.shortDesc}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-1">
                          <span>
                            <strong>Material:</strong> {product.material}
                          </span>
                          <span>
                            <strong>Dimensi:</strong> {product.dimensions}
                          </span>
                        </div>
                      </div>

                      <div className="sm:border-l border-stone-100 sm:pl-6 shrink-0 flex flex-col justify-between items-end gap-3 w-full sm:w-auto">
                        <div className="text-right w-full sm:w-auto">
                          {isShowPrice ? (
                            <div>
                              <span className="text-base font-bold text-stone-900 block font-sans">
                                {formatRupiah(product.price)}
                              </span>
                              <span className="text-[10px] text-stone-400 block">Unit Netto</span>
                            </div>
                          ) : (
                            <div>
                              <span className="text-sm font-bold text-[#B88E2F] block font-sans">
                                By Quotation
                              </span>
                              <span className="text-[10px] text-stone-400 block">
                                Mulai {formatRupiah(product.priceStartingFrom || 0)}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className={`p-2 border rounded-lg transition-colors cursor-pointer ${
                              isWishlisted
                                ? 'border-rose-300 bg-rose-50 text-rose-600'
                                : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                            }`}
                            title="Wishlist"
                          >
                            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                          </button>

                          <button
                            onClick={() => setQuickView(product)}
                            className="p-2 border border-stone-200 hover:bg-stone-50 text-stone-600 rounded-lg cursor-pointer"
                            title="Quick View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => addToEstimateCart(product, 1)}
                            className="flex-1 sm:flex-initial bg-[#18181B] hover:bg-stone-800 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-[#B88E2F]" />
                            <span>Minta Penawaran</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
