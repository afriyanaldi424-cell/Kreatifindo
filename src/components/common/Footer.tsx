import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Instagram,
  Facebook,
  ExternalLink,
  CreditCard,
  ArrowUpRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { cleanPhone } from '../../lib/utils';

export const Footer: React.FC = () => {
  const { settings, categories, navigate } = useApp();

  return (
    <footer className="bg-[#18181B] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                {settings.companyName}
              </span>
              <span className="text-[9px] font-sans font-bold uppercase tracking-widest px-2 py-0.5 bg-[#B88E2F] text-white rounded">
                Atelier
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-md">
              {settings.footerText}
            </p>

            {/* Bank Transfer Badge for Official Quotations */}
            <div className="p-3.5 rounded-lg bg-stone-900 border border-stone-800 flex items-start gap-3 max-w-md">
              <CreditCard className="w-5 h-5 text-[#B88E2F] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="text-white font-semibold block">Rekening Resmi Pembayaran Proyek:</span>
                <span className="text-stone-400 block font-mono mt-0.5">
                  {settings.bankAccount?.bankName || 'Bank Central Asia (BCA)'} - {settings.bankAccount?.accountNumber || '527-0988-123'}
                </span>
                <span className="text-stone-500 text-[11px] block">
                  a.n. {settings.bankAccount?.accountHolder || 'PT KREATIF INDO KREASI MEBEL'}
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-[#B88E2F] text-stone-300 hover:text-white flex items-center justify-center transition-all"
                title="Instagram Kreatifindo"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-[#B88E2F] text-stone-300 hover:text-white flex items-center justify-center transition-all"
                title="Facebook Kreatifindo"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <button
                onClick={() => navigate('#/admin')}
                className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-[#CBB279] ml-2 px-3 py-1.5 rounded bg-stone-900 border border-stone-800 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#B88E2F]" />
                <span>Panel CMS Admin</span>
              </button>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-4 font-sans">
              Kategori Perabot
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-400">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigate(`#/katalog?cat=${cat.slug}`)}
                    className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group text-left"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{cat.name}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigate('#/katalog')}
                  className="text-[#B88E2F] hover:text-[#D4AF37] font-medium flex items-center gap-1 pt-1 cursor-pointer"
                >
                  <span>Semua Katalog</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-4 font-sans">
              Informasi & Layanan
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-400">
              <li>
                <button onClick={() => navigate('#/project')} className="hover:text-white transition-colors cursor-pointer">
                  Portofolio & Real Project
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/layanan')} className="hover:text-white transition-colors cursor-pointer">
                  Fit-Out & Custom Interior
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/tentang-kami')} className="hover:text-white transition-colors cursor-pointer">
                  Workshop & Pengrajin Kami
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/penawaran')} className="hover:text-white transition-colors cursor-pointer">
                  Sistem Permintaan Penawaran
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/customer-service')} className="hover:text-white transition-colors cursor-pointer">
                  Pusat Layanan Konsultasi
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/portal')} className="hover:text-white transition-colors cursor-pointer">
                  Cek Status Penawaran (QT)
                </button>
              </li>
            </ul>
          </div>

          {/* Workshop & Contact Information */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-4 font-sans">
              Studio & Workshop
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-stone-400">
              <MapPin className="w-4 h-4 text-[#B88E2F] shrink-0 mt-0.5" />
              <span>
                {settings.address}, {settings.city} {settings.postalCode}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-stone-400">
              <Phone className="w-4 h-4 text-[#B88E2F] shrink-0" />
              <span>{settings.phone} / +62 812-9000-8888</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-stone-400">
              <Mail className="w-4 h-4 text-[#B88E2F] shrink-0" />
              <span>{settings.email}</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-stone-400 pt-1">
              <Clock className="w-4 h-4 text-[#B88E2F] shrink-0 mt-0.5" />
              <div>
                <span className="block">{settings.openingHoursWeekday}</span>
                <span className="block text-stone-500">{settings.openingHoursWeekend}</span>
              </div>
            </div>
            <a
              href={`https://wa.me/${cleanPhone(settings.whatsapp)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:underline pt-1"
            >
              <span>Chat WhatsApp Langsung</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {settings.companyName}. Hak Cipta Dilindungi. Manufaktur Perabot & Kontraktor Interior Profesional.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Standar SNI & ISO 9001</span>
            <span>•</span>
            <span>Garansi Konstruksi 1-2 Tahun</span>
            <span>•</span>
            <span>Material Eco-Friendly Grade E1</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
