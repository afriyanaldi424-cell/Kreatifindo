import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  FileText,
  Building,
  MessageSquare,
  Sparkles,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  User,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdminDashboardOverview } from './AdminDashboardOverview';
import { AdminProductsManager } from './AdminProductsManager';
import { AdminQuotationsManager } from './AdminQuotationsManager';
import { AdminProjectsManager } from './AdminProjectsManager';
import { AdminCSTicketsManager } from './AdminCSTicketsManager';
import { AdminHomepageCMS } from './AdminHomepageCMS';
import { AdminSettingsManager } from './AdminSettingsManager';

export const AdminLayout: React.FC = () => {
  const { currentAdminUser, logoutAdmin, quotations, csTickets, products, navigate } = useApp();

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingQuotationsCount = quotations.filter(
    (q) => q.status === 'REQUESTED' || q.status === 'REVIEWING'
  ).length;

  const openTicketsCount = csTickets.filter(
    (t) => t.status === 'OPEN' || t.status === 'IN_PROGRESS'
  ).length;

  const navigationItems = [
    { id: 'dashboard', label: 'Ringkasan & Metrik', icon: LayoutDashboard },
    {
      id: 'products',
      label: 'Katalog Perabot',
      icon: Package,
      badge: `${products.length}`,
    },
    {
      id: 'quotations',
      label: 'Penawaran & SPK',
      icon: FileText,
      badge: pendingQuotationsCount > 0 ? `${pendingQuotationsCount}` : undefined,
      badgeColor: 'bg-amber-500 text-stone-900',
    },
    { id: 'projects', label: 'Portofolio Proyek', icon: Building },
    {
      id: 'cs',
      label: 'Customer Service',
      icon: MessageSquare,
      badge: openTicketsCount > 0 ? `${openTicketsCount}` : undefined,
      badgeColor: 'bg-sky-500 text-white',
    },
    { id: 'homepage', label: 'Editor Beranda (CMS)', icon: Sparkles },
    { id: 'settings', label: 'Info Perusahaan & Bank', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboardOverview setActiveTab={setActiveTab} />;
      case 'products':
        return <AdminProductsManager />;
      case 'quotations':
        return <AdminQuotationsManager />;
      case 'projects':
        return <AdminProjectsManager />;
      case 'cs':
        return <AdminCSTicketsManager />;
      case 'homepage':
        return <AdminHomepageCMS />;
      case 'settings':
        return <AdminSettingsManager />;
      default:
        return <AdminDashboardOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F3] flex flex-col font-sans">
      {/* Top Bar */}
      <header className="bg-stone-900 text-white border-b border-stone-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-400 hover:text-white rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-black border border-stone-700 flex items-center justify-center text-[#B88E2F]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif font-bold text-sm sm:text-base tracking-tight block leading-none">
                  KREATIFINDO CMS
                </span>
                <span className="text-[10px] text-stone-400 font-sans block mt-0.5 tracking-wider uppercase">
                  Control Room Panel
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => navigate('#/')}
              className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white px-2.5 sm:px-3 py-1.5 rounded-lg border border-stone-800 hover:border-stone-700 bg-stone-950/60 transition-colors cursor-pointer"
              title="Buka Website Publik"
            >
              <span className="hidden sm:inline">Lihat Website Publik</span>
              <span className="sm:hidden text-[11px]">Web Publik</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#B88E2F]" />
            </button>

            {currentAdminUser && (
              <div className="flex items-center gap-3 pl-3 border-l border-stone-800">
                <div className="text-right hidden sm:block">
                  <span className="text-xs font-semibold block leading-tight">
                    {currentAdminUser.name}
                  </span>
                  <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">
                    {currentAdminUser.role}
                  </span>
                </div>

                <button
                  onClick={logoutAdmin}
                  className="p-2 text-stone-400 hover:text-rose-400 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                  title="Keluar (Logout)"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container: Sidebar + Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1 flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <aside
          className={`lg:w-64 shrink-0 ${
            mobileMenuOpen ? 'block' : 'hidden lg:block'
          } bg-white rounded-3xl border border-stone-200 p-4 shadow-xs self-start sticky top-22`}
        >
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-3 py-1 block">
              Menu Navigasi
            </span>

            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-[#D4AF37]' : 'text-stone-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.badgeColor || (isActive ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600')
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Notice */}
          <div className="mt-8 p-3 rounded-2xl bg-stone-50 border border-stone-200 text-[11px] text-stone-500">
            <strong className="text-stone-800 block mb-1">Status Sistem:</strong>
            Semua perubahan tersimpan secara persistent tanpa perlu menyentuh file kode / VS Code.
          </div>
        </aside>

        {/* Dynamic Workspace Content */}
        <main className="flex-1 min-w-0">{renderContent()}</main>
      </div>
    </div>
  );
};
