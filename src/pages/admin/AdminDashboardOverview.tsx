import React from 'react';
import {
  Package,
  FileText,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  Plus,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatRupiah } from '../../lib/utils';

interface Props {
  setActiveTab: (tab: string) => void;
}

export const AdminDashboardOverview: React.FC<Props> = ({ setActiveTab }) => {
  const { products, quotations, csTickets, projects } = useApp();

  const totalQuotationValue = quotations.reduce((sum, q) => sum + (q.totalAmount || 0), 0);
  const pendingQuotations = quotations.filter((q) => q.status === 'REQUESTED' || q.status === 'REVIEWING');
  const openTickets = csTickets.filter((t) => t.status === 'OPEN' || t.status === 'IN_PROGRESS');

  return (
    <div className="space-y-8 font-sans">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Total Products */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-stone-500 block">Katalog Perabot</span>
            <span className="text-2xl font-serif font-bold text-stone-900 block mt-1">
              {products.length} Item
            </span>
            <span className="text-[11px] text-emerald-600 font-medium block mt-1">
              Aktif di Web Publik
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center">
            <Package className="w-6 h-6 text-[#B88E2F]" />
          </div>
        </div>

        {/* Metric 2: Total Quotations */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-stone-500 block">Penawaran Masuk</span>
            <span className="text-2xl font-serif font-bold text-stone-900 block mt-1">
              {quotations.length} Lembar
            </span>
            <span className="text-[11px] text-amber-600 font-medium block mt-1">
              {pendingQuotations.length} Perlu Review Estimator
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3: Value Pipeline */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-stone-500 block">Total Nilai Proyek</span>
            <span className="text-lg font-bold text-stone-900 block mt-1 truncate max-w-[160px]">
              {formatRupiah(totalQuotationValue)}
            </span>
            <span className="text-[11px] text-stone-500 block mt-1">
              Pipeline Estimasi Proyek
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4: CS Tickets */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-stone-500 block">Tiket Bantuan / CS</span>
            <span className="text-2xl font-serif font-bold text-stone-900 block mt-1">
              {openTickets.length} Menunggu
            </span>
            <span className="text-[11px] text-stone-500 block mt-1">
              Dari {csTickets.length} total percakapan
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Actions Ribbon */}
      <div className="bg-stone-900 text-white p-6 rounded-2xl border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-bold text-lg text-white">Aksi Cepat Pengelolaan</h3>
          <p className="text-xs text-stone-400 mt-0.5">
            Kelola konten katalog atau tangani penawaran baru tanpa harus membuka kode pemrograman.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveTab('products')}
            className="bg-[#B88E2F] hover:bg-[#A17A24] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Perabot Baru</span>
          </button>
          <button
            onClick={() => setActiveTab('quotations')}
            className="bg-stone-800 hover:bg-stone-700 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#B88E2F]" />
            <span>Kelola Penawaran Masuk</span>
          </button>
          <button
            onClick={() => setActiveTab('homepage')}
            className="bg-stone-800 hover:bg-stone-700 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Edit Teks Beranda
          </button>
        </div>
      </div>

      {/* 2-Column Section: Recent Quotations & CS Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Quotations (Left 7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-base">
                Permintaan Penawaran Terkini
              </h3>
              <p className="text-xs text-stone-500">Daftar lembar penawaran dari pelanggan web</p>
            </div>
            <button
              onClick={() => setActiveTab('quotations')}
              className="text-xs font-semibold text-[#B88E2F] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 uppercase text-[10px] font-semibold">
                <tr>
                  <th className="p-3">No Penawaran</th>
                  <th className="p-3">Pemohon / Klien</th>
                  <th className="p-3">Total Est.</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {quotations.slice(0, 5).map((q) => (
                  <tr
                    key={q.id}
                    onClick={() => setActiveTab('quotations')}
                    className="hover:bg-stone-50 cursor-pointer"
                  >
                    <td className="p-3 font-mono font-bold text-stone-900">
                      {q.quotationNumber}
                    </td>
                    <td className="p-3 text-stone-700">
                      <strong className="block text-stone-900">{q.customerName}</strong>
                      <span className="text-[11px] text-stone-500">{q.companyName || q.customerPhone}</span>
                    </td>
                    <td className="p-3 font-semibold text-stone-900">
                      {q.totalAmount > 0 ? formatRupiah(q.totalAmount) : 'By Quotation'}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          q.status === 'APPROVED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : q.status === 'QUOTED'
                            ? 'bg-sky-100 text-sky-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {q.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CS Tickets & Live Consultation Status (Right 5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-base">
                Percakapan CS Aktif
              </h3>
              <p className="text-xs text-stone-500">Tiket konsultasi yang diajukan pelanggan</p>
            </div>
            <button
              onClick={() => setActiveTab('cs')}
              className="text-xs font-semibold text-[#B88E2F] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Buka Chat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {csTickets.slice(0, 4).map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setActiveTab('cs')}
                className="p-3 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors cursor-pointer flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-[10px] font-bold text-stone-600">
                      #{ticket.ticketNumber}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-stone-200 text-stone-700 rounded font-medium">
                      {ticket.category}
                    </span>
                  </div>
                  <h4 className="font-semibold text-xs text-stone-900 truncate">
                    {ticket.customerName}
                  </h4>
                  <p className="text-[11px] text-stone-500 truncate mt-0.5">
                    {ticket.messages[ticket.messages.length - 1]?.message || ticket.subject}
                  </p>
                </div>
                <span
                  className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-bold ${
                    ticket.status === 'RESOLVED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {ticket.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
