import React, { useState } from 'react';
import {
  FileText,
  Search,
  Download,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Trash2,
  X,
  Phone,
  Building,
  Mail,
  MapPin,
  Calendar,
  Save,
  Plus,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Quotation, QuotationStatus, QuotationItem } from '../../types';
import { formatRupiah, cleanPhone } from '../../lib/utils';
import { downloadQuotationPDF } from '../../lib/pdf';

export const AdminQuotationsManager: React.FC = () => {
  const { quotations, updateQuotationStatus, updateQuotationDetails, deleteQuotation, settings, addToast } =
    useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);

  // Edit states inside modal
  const [editStatus, setEditStatus] = useState<QuotationStatus>('REQUESTED');
  const [itemsList, setItemsList] = useState<QuotationItem[]>([]);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [taxPercent, setTaxPercent] = useState<number>(11);

  const statuses: { value: QuotationStatus; label: string }[] = [
    { value: 'REQUESTED', label: 'Permintaan Masuk' },
    { value: 'REVIEWING', label: 'Review Estimator' },
    { value: 'QUOTED', label: 'Penawaran Terbit' },
    { value: 'NEGOTIATION', label: 'Negosiasi Spek' },
    { value: 'APPROVED', label: 'Disetujui (SPK)' },
    { value: 'COMPLETED', label: 'Selesai & Pasang' },
    { value: 'CANCELLED', label: 'Dibatalkan' },
  ];

  const filteredQuotations = quotations.filter((q) => {
    const matchSearch =
      q.quotationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.customerPhone.includes(searchTerm) ||
      (q.companyName && q.companyName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchStatus = statusFilter === 'ALL' || q.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleOpenDetail = (q: Quotation) => {
    setSelectedQuotation(q);
    setEditStatus(q.status);
    setItemsList([...q.items]);
    setDiscountAmount(q.discountAmount || 0);
    setTaxPercent(q.taxAmount > 0 ? 11 : 0);
  };

  const handleItemPriceChange = (index: number, newPrice: number) => {
    const updated = [...itemsList];
    updated[index] = {
      ...updated[index],
      unitPrice: newPrice,
      totalPrice: newPrice * updated[index].quantity,
    };
    setItemsList(updated);
  };

  const handleSaveQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuotation) return;

    const subtotal = itemsList.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);
    const afterDiscount = Math.max(0, subtotal - discountAmount);
    const taxAmount = taxPercent > 0 ? Math.round(afterDiscount * 0.11) : 0;

    const updated: Quotation = {
      ...selectedQuotation,
      status: editStatus,
      items: itemsList,
      discountAmount,
      taxAmount,
      totalAmount: afterDiscount,
    };

    updateQuotationDetails(updated);
    setSelectedQuotation(updated);
    addToast('success', 'Penawaran Diperbarui', `Penawaran ${updated.quotationNumber} berhasil disimpan.`);
  };

  const handleDownloadPDF = (q: Quotation) => {
    downloadQuotationPDF(q, settings);
    addToast('success', 'PDF Terunduh', `Lembar penawaran ${q.quotationNumber} telah dibuat.`);
  };

  const handleSendWhatsApp = (q: Quotation) => {
    const phone = cleanPhone(q.customerPhone);
    const text = `Halo Yth. *${q.customerName}*,\n\nBerikut kami lampirkan pembaruan status Lembar Penawaran Resmi *#${q.quotationNumber}* dari Kreatifindo Furniture.\nStatus terkini: *${q.status}*.\nTotal Estimasi: *${formatRupiah(q.totalAmount)}*.\n\nSilakan konfirmasi apabila ada penyesuaian spesifikasi atau jadwal survey.\n\nSalam hormat,\nTim Estimator Kreatifindo`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDelete = (id: string, no: string) => {
    if (window.confirm(`Hapus berkas penawaran ${no}?`)) {
      deleteQuotation(id);
      setSelectedQuotation(null);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-stone-900">
            Manajemen Penawaran & SPK
          </h2>
          <p className="text-xs text-stone-500">
            Review permintaan harga masuk dari klien, kalkulasi harga material, ubah status pipeline, dan cetak PDF resmi.
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari no penawaran, nama, WA..."
            className="w-full pl-9 pr-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B88E2F]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <span className="text-stone-500 shrink-0">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B88E2F] bg-white text-xs"
          >
            <option value="ALL">Semua Status</option>
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label} ({s.value})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase text-[11px]">
              <tr>
                <th className="p-3.5">Nomor & Tanggal</th>
                <th className="p-3.5">Pemohon / Klien</th>
                <th className="p-3.5">Item Perabot</th>
                <th className="p-3.5">Total Penawaran</th>
                <th className="p-3.5">Status Proyek</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredQuotations.map((q) => (
                <tr key={q.id} className="hover:bg-stone-50/60">
                  <td className="p-3.5">
                    <span className="font-mono font-bold text-stone-900 block text-xs">
                      #{q.quotationNumber}
                    </span>
                    <span className="text-[11px] text-stone-400">{q.createdAt}</span>
                  </td>

                  <td className="p-3.5">
                    <strong className="text-stone-900 block">{q.customerName}</strong>
                    <span className="text-[11px] text-stone-500 block">
                      {q.companyName ? `${q.companyName} • ` : ''}
                      {q.customerPhone}
                    </span>
                  </td>

                  <td className="p-3.5 text-stone-700">
                    <span className="font-semibold block">{q.items.length} Macam Perabot</span>
                    <span className="text-[11px] text-stone-500 truncate block max-w-xs">
                      {q.items.map((i) => `${i.productName} (${i.quantity}x)`).join(', ')}
                    </span>
                  </td>

                  <td className="p-3.5 font-bold text-stone-900">
                    {q.totalAmount > 0 ? formatRupiah(q.totalAmount) : 'By Quotation'}
                  </td>

                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        q.status === 'APPROVED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : q.status === 'QUOTED'
                          ? 'bg-sky-100 text-sky-800'
                          : q.status === 'REVIEWING'
                          ? 'bg-amber-100 text-amber-800'
                          : q.status === 'COMPLETED'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {q.status}
                    </span>
                  </td>

                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => handleOpenDetail(q)}
                      className="p-1.5 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                      title="Buka / Edit Penawaran"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDownloadPDF(q)}
                      className="p-1.5 text-stone-700 hover:text-[#B88E2F] hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                      title="Unduh PDF Resmi"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleSendWhatsApp(q)}
                      className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                      title="Kirim Update WA"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail & Price Calculator Modal */}
      {selectedQuotation && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          <div
            onClick={() => setSelectedQuotation(null)}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          <div className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden z-10 border border-stone-200 flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-6 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-[#B88E2F] font-bold">
                  #{selectedQuotation.quotationNumber}
                </span>
                <h3 className="font-serif font-bold text-stone-900 text-xl">
                  Rincian Penawaran & Estimasi Harga
                </h3>
              </div>
              <button
                onClick={() => setSelectedQuotation(null)}
                className="p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveQuotation} className="p-6 overflow-y-auto space-y-6 text-xs">
              {/* Customer Info Box */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                    Pemohon / Klien:
                  </span>
                  <strong className="text-stone-900 text-sm">
                    {selectedQuotation.customerName}
                  </strong>
                  {selectedQuotation.companyName && (
                    <span className="block text-stone-600 font-medium">
                      {selectedQuotation.companyName}
                    </span>
                  )}
                  <span className="block text-stone-500 font-mono mt-0.5">
                    WA: {selectedQuotation.customerPhone}
                  </span>
                </div>

                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                    Lokasi & Jadwal:
                  </span>
                  <span className="text-stone-800 block">
                    {selectedQuotation.projectAddress || 'Lokasi belum dicantumkan'}
                  </span>
                  <span className="text-stone-500 block text-[11px] mt-0.5">
                    Target: {selectedQuotation.timeline}
                  </span>
                  {selectedQuotation.notes && (
                    <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-[10px] inline-block mt-1">
                      Catatan: {selectedQuotation.notes}
                    </span>
                  )}
                </div>
              </div>

              {/* Status Selector */}
              <div className="p-4 rounded-2xl border border-stone-200 bg-white space-y-2">
                <label className="block font-semibold text-stone-800">
                  Ubah Status Pipeline Penawaran:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {statuses.map((s) => (
                    <label
                      key={s.value}
                      className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                        editStatus === s.value
                          ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="quotationStatus"
                        value={s.value}
                        checked={editStatus === s.value}
                        onChange={() => setEditStatus(s.value)}
                        className="hidden"
                      />
                      <span className="text-xs">{s.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Items Table with Price Inputs */}
              <div className="space-y-2">
                <label className="block font-semibold text-stone-800">
                  Item Perabot & Penetapan Harga Satuan:
                </label>
                <div className="border border-stone-200 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold">
                      <tr>
                        <th className="p-3">Nama Perabot</th>
                        <th className="p-3 text-center">Qty</th>
                        <th className="p-3">Harga Satuan (Rp)</th>
                        <th className="p-3 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {itemsList.map((it, idx) => (
                        <tr key={idx}>
                          <td className="p-3 font-medium text-stone-900">
                            {it.productName}
                            <span className="block text-[10px] text-stone-500 font-normal">
                              {it.material}
                            </span>
                          </td>
                          <td className="p-3 text-center font-bold text-stone-900">
                            {it.quantity}
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              value={it.unitPrice}
                              onChange={(e) =>
                                handleItemPriceChange(idx, parseInt(e.target.value) || 0)
                              }
                              className="w-32 px-2 py-1 border border-stone-300 rounded-lg focus:outline-none focus:border-[#B88E2F] font-mono text-xs"
                            />
                          </td>
                          <td className="p-3 text-right font-bold text-stone-900">
                            {formatRupiah(it.unitPrice * it.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Discount & Tax Calculation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Diskon Volume / Negosiasi (Rp)
                  </label>
                  <input
                    type="number"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F] bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    PPN (Pajak Pertambahan Nilai)
                  </label>
                  <select
                    value={taxPercent}
                    onChange={(e) => setTaxPercent(parseInt(e.target.value))}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F] bg-white"
                  >
                    <option value={0}>Non-PPN (0%)</option>
                    <option value={11}>Termasuk PPN 11% Resmi</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownloadPDF(selectedQuotation)}
                    className="bg-[#18181B] hover:bg-stone-800 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer text-xs"
                  >
                    <Download className="w-3.5 h-3.5 text-[#B88E2F]" />
                    <span>Cetak PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendWhatsApp(selectedQuotation)}
                    className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer text-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Kirim WA</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(selectedQuotation.id, selectedQuotation.quotationNumber)
                    }
                    className="text-stone-400 hover:text-rose-600 p-2 cursor-pointer"
                    title="Hapus Penawaran"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedQuotation(null)}
                    className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl cursor-pointer"
                  >
                    Tutup
                  </button>
                  <button
                    type="submit"
                    className="bg-[#B88E2F] hover:bg-[#A17A24] text-white px-6 py-2 rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer text-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
