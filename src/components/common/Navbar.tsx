import React, { useState } from 'react';
import {
  Phone,
  Clock,
  ShoppingBag,
  Heart,
  Scale,
  MessageCircle,
  Menu,
  X,
  ShieldCheck,
  Search,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { isBusinessOpen, cleanPhone } from '../../lib/utils';

export const Navbar: React.FC = () => {
  const {
    settings,
    estimateCart,
    comparisonIds,
    wishlistIds,
    setIsEstimateDrawerOpen,
    setIsCompareModalOpen,
    navigate,
    currentRoute,
    currentAdmin,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isOpenNow = isBusinessOpen(settings.openingHoursWeekday);
  const cartItemCount = estimateCart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: 'Beranda', href: '#/' },
    { label: 'Katalog', href: '#/katalog' },
    { label: 'Portofolio', href: '#/project' },
    { label: 'Layanan', href: '#/layanan' },
    { label: 'Tentang Kami', href: '#/tentang-kami' },
    { label: 'Minta Penawaran', href: '#/penawaran', highlight: true },
    { label: 'Customer Service', href: '#/customer-service' },
    { label: 'Kontak', href: '#/kontak' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`#/katalog?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const isLinkActive = (href: string) => {
    if (href === '#/' && (currentRoute === '#/' || currentRoute === '')) return true;
    if (href !== '#/' && currentRoute.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/95 backdrop-blur-md border-b border-stone-200 transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#18181B] text-stone-300 text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Status and Operating hours */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5 font-medium">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span className={isOpenNow ? 'text-emerald-300 font-semibold' : 'text-stone-400'}>
                {isOpenNow ? 'Konsultasi Online Tersedia' : 'Di Luar Jam Operasional'}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-stone-400">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{settings.openingHoursWeekday}</span>
            </div>
          </div>

          {/* Quick Contacts & Admin access */}
          <div className="flex items-center gap-3 sm:gap-5 text-[11px] sm:text-xs">
            <a
              href={`https://wa.me/${cleanPhone(settings.whatsapp)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#B88E2F]" />
              <span className="hidden sm:inline">WhatsApp Konsultasi:</span>
              <span className="font-semibold text-white">0812-9000-8888</span>
            </a>

            <span className="text-stone-600 hidden sm:inline">|</span>

            <button
              onClick={() => navigate('#/admin')}
              className="flex items-center gap-1 text-[#CBB279] hover:text-white transition-colors font-medium cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{currentAdmin ? `CMS (${currentAdmin.role})` : 'CMS Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => navigate('#/')}
          className="flex flex-col cursor-pointer select-none group"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#18181B] group-hover:text-[#B88E2F] transition-colors">
              KREATIFINDO
            </span>
            <span className="text-[9px] font-sans font-bold uppercase tracking-widest px-1.5 py-0.5 bg-[#B88E2F] text-white rounded">
              Atelier
            </span>
          </div>
          <span className="text-[10px] tracking-wider uppercase text-stone-500 font-medium font-sans">
            Furniture & Interior Contractor
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-stone-700">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <button
                key={link.href}
                onClick={() => navigate(link.href)}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  link.highlight
                    ? 'bg-[#B88E2F]/10 text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white font-semibold'
                    : active
                    ? 'text-[#18181B] font-semibold bg-stone-100'
                    : 'hover:text-[#18181B] hover:bg-stone-50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
            title="Cari Produk"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Compare Badge Button */}
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className={`relative p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer ${
              comparisonIds.length > 0 ? 'text-[#B88E2F]' : 'text-stone-700'
            }`}
            title="Bandingkan Produk"
          >
            <Scale className="w-5 h-5" />
            {comparisonIds.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#18181B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {comparisonIds.length}
              </span>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => navigate('#/portal?tab=wishlist')}
            className={`relative p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer ${
              wishlistIds.length > 0 ? 'text-rose-600' : 'text-stone-700'
            }`}
            title="Produk Tersimpan"
          >
            <Heart className="w-5 h-5" />
            {wishlistIds.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistIds.length}
              </span>
            )}
          </button>

          {/* Estimate Cart Button ("Daftar Kebutuhan") */}
          <button
            onClick={() => setIsEstimateDrawerOpen(true)}
            className="relative flex items-center gap-2 bg-[#18181B] text-white hover:bg-stone-800 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all shadow-sm cursor-pointer active:scale-95"
            title="Daftar Kebutuhan Penawaran"
          >
            <ShoppingBag className="w-4 h-4 text-[#B88E2F]" />
            <span className="hidden sm:inline">Daftar Kebutuhan</span>
            {cartItemCount > 0 ? (
              <span className="bg-[#B88E2F] text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            ) : (
              <span className="text-stone-400 text-xs hidden sm:inline">0</span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-stone-200 bg-stone-50 px-4 sm:px-8 py-3 animate-fadeIn">
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari perabot, meja meeting, lemari custom, kursi direktur, material..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="bg-[#18181B] text-white px-5 py-2 text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Cari
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="text-stone-500 hover:text-stone-800 text-sm px-2 py-2 cursor-pointer"
            >
              Batal
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 py-6 shadow-xl animate-fadeIn">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <button
                  key={link.href}
                  onClick={() => {
                    navigate(link.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${
                    active
                      ? 'bg-stone-100 text-[#18181B] font-semibold'
                      : 'text-stone-600 hover:bg-stone-50 hover:text-[#18181B]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              );
            })}
          </nav>

          <div className="mt-6 pt-6 border-t border-stone-200 flex flex-col gap-3">
            <a
              href={`https://wa.me/${cleanPhone(settings.whatsapp)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#1EBE5D] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Hotline (+62 812-9000-8888)</span>
            </a>

            <button
              onClick={() => {
                navigate('#/admin');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 bg-stone-900 text-[#CBB279] py-2.5 rounded-lg text-sm font-medium"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Akses CMS Dashboard Admin</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
