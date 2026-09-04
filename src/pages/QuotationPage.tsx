import React, { useState, useEffect } from 'react';
import {
  FileText,
  Search,
  Download,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Quotation, QuotationStatus } from '../types';
import { formatRupiah, cleanPhone } from '../lib/utils';
import { downloadQuotationPDF } from '../lib/pdf';

export const QuotationPage: React.FC = () => {
  const {
    estimateCart,
    removeFromEstimateCart,
    updateEstimateCartQuantity,
    clearEstimateCart,
    submitQuotationRequest,
    quotations,
    settings,
    navigate,
    currentRoute,
    addToast,
  } = useApp();

  // Form inputs
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [projectAddress, setProjectAddress] = useState('');
  const [timeline, setTimeline] = useState('1 - 2 Bulan ke Depan');
  const [notes, setNotes] = useState('');

  // Tracker State
  const [searchNumber, setSearchNumber] = useState('');
  const [trackedQuotation, setTrackedQuotation] = useState<Quotation | null>(null);

  // Check URL params for #/penawaran?no=QT-2026-0001
  useEffect(() => {
    if (currentRoute && currentRoute.includes('?no=')) {
      const qNo = currentRoute.split('?no=')[1]?.split('&')[0];
      if (qNo) {
        setSearchNumber(qNo);
        const found = quotations.find((q) => q.quotationNumber.toUpperCase() === qNo.toUpperCase());
        if (found) {
          setTrackedQuotation(found);
        }
      }
    } else if (!trackedQuotation && quotations.length > 0) {
      // Default to the most recent quotation for demonstration
      setTrackedQuotation(quotations[0]);
      setSearchNumber(quotations[0].quotationNumber);
    }
  }, [currentRoute, quotations]);

  const handleSearchQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchNumber.trim()) return;

    const found = quotations.find(
      (q) => q.quotationNumber.toUpperCase() === searchNumber.trim().toUpperCase()
    );

    if (found) {
      setTrackedQuotation(found);
      addToast('info', 'Penawaran Ditemukan', `Menampilkan status ${found.quotationNumber}`);
    } else {
      addToast('error', 'Nomor Tidak Ditemukan', `Nomor ${searchNumber} tidak terdaftar di sistem.`);
    }
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();

    if (estimateCart.length === 0) {
      addToast('error', 'Daftar Kebutuhan Kosong', 'Pilih minimal satu produk dari katalog untuk meminta penawaran.');
      return;
    }

    if (!customerName.trim() || !customerPhone.trim()) {
      addToast('error', 'Form Belum Lengkap', 'Nama dan Nomor WhatsApp wajib diisi.');
      return;
    }

    const newQuotation = submitQuotationRequest({
      customerName: customerName.trim(),
      companyName: companyName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim(),
      projectAddress: projectAddress.trim(),
      timeline,
      notes: notes.trim(),
    });

    setTrackedQuotation(newQuotation);
    setSearchNumber(newQuotation.quotationNumber);

    // Scroll down to the status viewer
    setTimeout(() => {
      const el = document.getElementById('quotation-tracker-viewer');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleDownloadPDF = () => {
    if (!trackedQuotation) return;
    downloadQuotationPDF(trackedQuotation, settings);
    addToast('success', 'PDF Sedang Diunduh', `Lembar penawaran ${trackedQuotation.quotationNumber} telah dibuat.`);
  };

  const handleCopyLink = () => {
    if (!trackedQuotation) return;
    const url = `${window.location.origin}${window.location.pathname}#/penawaran?no=${trackedQuotation.quotationNumber}`;
    navigator.clipboard.writeText(url);
    addToast('success', 'Tautan Disalin', 'Tautan pelacakan penawaran disalin ke clipboard.');
  };

  const handleSendWhatsApp = () => {
    if (!trackedQuotation) return;
    const phone = cleanPhone(settings.whatsapp);
    const text = `Halo Admin Kreatifindo, saya ingin menindaklanjuti status lembar penawaran nomor *#${trackedQuotation.quotationNumber}* atas nama ${trackedQuotation.customerName}.\n\nMohon informasi terkini proses estimasi/produksi. Terima kasih.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const statusSteps: { status: QuotationStatus; label: string; desc: string }[] = [
    { status: 'REQUESTED', label: 'Permintaan Masuk', desc: 'Diterima sistem & antrean estimator' },
    { status: 'REVIEWING', label: 'Review Estimator', desc: 'Perhitungan bahan & workshop' },
    { status: 'QUOTED', label: 'Penawaran Terbit', desc: 'Harga resmi & PDF siap diunduh' },
    { status: 'NEGOTIATION', label: 'Penyesuaian Spek', desc: 'Revisi ukuran / diskon volume' },
    { status: 'APPROVED', label: 'Disetujui (SPK)', desc: 'SPK terbit & jadwal produksi' },
    { status: 'COMPLETED', label: 'Selesai Terpasang', desc: 'Instalasi tuntas & serah terima' },
  ];

  const getStepIndex = (status: QuotationStatus) => {
    return statusSteps.findIndex((s) => s.status === status);
  };

  const currentStepIndex = trackedQuotation ? getStepIndex(trackedQuotation.status) : 0;

  return (
    <div className="bg-[#FBFBF9] min-h-screen py-10 sm:py-16 border-b border-stone-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#B88E2F]">
            Sistem Penawaran Resmi
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Permintaan & Pelacakan Penawaran
          </h1>
          <p className="text-sm text-stone-600 font-sans leading-relaxed">
            Dapatkan lembar penawaran harga resmi (Quotation PDF) lengkap dengan rincian material, timeline produksi, dan garansi tertulis.
          </p>
        </div>

        {/* Top 2-Column Section: Review Items & Customer Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Review Items in Estimate Cart */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#B88E2F]" />
                <h3 className="font-serif font-bold text-stone-900 text-lg">
                  1. Daftar Kebutuhan Anda
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-stone-100 text-stone-700 rounded-full">
                {estimateCart.reduce((acc, it) => acc + it.quantity, 0)} Unit
              </span>
            </div>

            {estimateCart.length === 0 ? (
              <div className="py-10 text-center text-stone-400 space-y-3">
                <p className="text-xs text-stone-500">
                  Belum ada perabot yang dimasukkan ke daftar kebutuhan.
                </p>
                <button
                  onClick={() => navigate('#/katalog')}
                  className="bg-[#18181B] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Buka Katalog Digital
                </button>
              </div>
            ) : (
              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                {estimateCart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/50 flex gap-3.5 items-center"
                  >
                    <img
                      src={item.product.mainImage}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-xl bg-stone-100 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-stone-900 text-xs truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-stone-500 truncate">
                        {(item.product?.material || '').split('+')[0]}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-stone-300 rounded-md bg-white">
                          <button
                            type="button"
                            onClick={() => updateEstimateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-stone-500 hover:text-stone-900"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateEstimateCartQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-stone-500 hover:text-stone-900"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-stone-900">
                          {item.product.priceMode === 'SHOW_PRICE' && item.product.price > 0
                            ? formatRupiah(item.product.price * item.quantity)
                            : 'By Quotation'}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromEstimateCart(item.product.id)}
                      className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>Perlu perabot lain?</span>
              <button
                type="button"
                onClick={() => navigate('#/katalog')}
                className="text-[#B88E2F] font-semibold hover:underline cursor-pointer"
              >
                + Tambah dari Katalog
              </button>
            </div>
          </div>

          {/* Right Column: Customer Details Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs">
            <div className="pb-4 border-b border-stone-100 mb-6">
              <h3 className="font-serif font-bold text-stone-900 text-lg">
                2. Detail Pemohon & Lokasi Proyek
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Data ini akan tercetak otomatis pada lembar penawaran resmi dan digunakan tim surveyor kami.
              </p>
            </div>

            <form onSubmit={handleSubmitRequest} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Nama Pemohon (Bpk/Ibu) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Contoh: Bpk. Dimas Pratama"
                      className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Nama Perusahaan / Instansi (Opsional)
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Contoh: PT Surya Dinamika"
                      className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Contoh: 0812-8888-9999"
                      className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Alamat Email (Untuk Pengiriman PDF)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="dimas@email.com"
                      className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Alamat Lokasi Proyek & Kota
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      value={projectAddress}
                      onChange={(e) => setProjectAddress(e.target.value)}
                      placeholder="Contoh: SCBD Tower 2 Lt 18, Jakarta Selatan"
                      className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Target Waktu Pemasangan
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F] bg-white"
                    >
                      <option value="Mendesak (< 2 Minggu)">Mendesak (&lt; 2 Minggu)</option>
                      <option value="1 - 2 Bulan ke Depan">1 - 2 Bulan ke Depan</option>
                      <option value="3 - 6 Bulan ke Depan">3 - 6 Bulan ke Depan</option>
                      <option value="Tahap Perencanaan / Budgeting">Tahap Perencanaan / Budgeting</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Catatan Kustomisasi Khusus / Request Tambahan
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Sebutkan jika membutuhkan survey ukuran di lokasi, penyesuaian denah ruangan, atau preferensi merek HPL..."
                  className="w-full p-3 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={estimateCart.length === 0}
                  className="w-full bg-[#18181B] hover:bg-stone-800 disabled:opacity-50 text-white py-3.5 px-6 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#B88E2F]" />
                  <span>Kirim Permintaan & Terbitkan Nomor Penawaran</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Section 2: Interactive Quotation Tracker & Live Status Viewer */}
        <div id="quotation-tracker-viewer" className="pt-8 border-t border-stone-200">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-md overflow-hidden">
            {/* Lookup Bar */}
            <div className="p-6 sm:p-8 bg-stone-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block">
                  Status Pelacakan Penawaran
                </span>
                <h3 className="font-serif font-bold text-2xl text-white mt-1">
                  Cek Progres Lembar Penawaran Resmi
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Masukkan nomor penawaran (contoh: <strong className="text-white">QT-2026-0001</strong>) untuk melihat status estimasi & mengunduh PDF.
                </p>
              </div>

              <form onSubmit={handleSearchQuotation} className="flex items-center gap-2 w-full md:w-auto">
                <input
                  type="text"
                  value={searchNumber}
                  onChange={(e) => setSearchNumber(e.target.value)}
                  placeholder="Nomor QT-2026-xxxx"
                  className="px-4 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-xs sm:text-sm text-white focus:outline-none focus:border-[#B88E2F] uppercase font-mono tracking-wider"
                />
                <button
                  type="submit"
                  className="bg-[#B88E2F] hover:bg-[#A17A24] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shrink-0 transition-colors cursor-pointer"
                >
                  Cari
                </button>
              </form>
            </div>

            {/* If Tracked Quotation is available */}
            {trackedQuotation ? (
              <div className="p-6 sm:p-10 space-y-10">
                {/* Meta Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-200 gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                        #{trackedQuotation.quotationNumber}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#B88E2F]/15 text-[#B88E2F]">
                        {trackedQuotation.status}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-1">
                      Diterbitkan: {trackedQuotation.createdAt} • Target Waktu: {trackedQuotation.timeline}
                    </p>
                  </div>

                  {/* Actions: Download PDF, Share WA, Copy Link */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={handleDownloadPDF}
                      className="bg-[#18181B] hover:bg-stone-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5 text-[#B88E2F]" />
                      <span>Unduh PDF Resmi</span>
                    </button>

                    <button
                      onClick={handleSendWhatsApp}
                      className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Konfirmasi via WA</span>
                    </button>

                    <button
                      onClick={handleCopyLink}
                      className="border border-stone-200 hover:bg-stone-50 text-stone-700 px-3 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                      title="Salin Tautan"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Progress Stepper */}
                <div className="space-y-4">
                  <h4 className="font-serif font-bold text-stone-900 text-sm">
                    Tahapan Pemrosesan Penawaran:
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {statusSteps.map((step, idx) => {
                      const isCompleted = idx <= currentStepIndex;
                      const isCurrent = idx === currentStepIndex;

                      return (
                        <div
                          key={step.status}
                          className={`p-3.5 rounded-2xl border transition-all ${
                            isCurrent
                              ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                              : isCompleted
                              ? 'bg-stone-50 border-stone-200 text-stone-800'
                              : 'bg-stone-50/40 border-stone-100 text-stone-400'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono font-bold opacity-75">
                              0{idx + 1}
                            </span>
                            {isCompleted && (
                              <CheckCircle2
                                className={`w-3.5 h-3.5 ${
                                  isCurrent ? 'text-[#D4AF37]' : 'text-emerald-600'
                                }`}
                              />
                            )}
                          </div>
                          <h5 className="font-semibold text-xs leading-tight mb-1">{step.label}</h5>
                          <p className="text-[10px] opacity-80 leading-tight">{step.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quotation Table Breakdown */}
                <div className="space-y-4">
                  <h4 className="font-serif font-bold text-stone-900 text-sm">
                    Rincian Item Perabot yang Diajukan:
                  </h4>
                  <div className="overflow-x-auto border border-stone-200 rounded-2xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[11px]">
                        <tr>
                          <th className="p-3.5">Item Perabot</th>
                          <th className="p-3.5">Kategori / Spesifikasi</th>
                          <th className="p-3.5 text-center">Qty</th>
                          <th className="p-3.5 text-right">Harga Satuan</th>
                          <th className="p-3.5 text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {trackedQuotation.items.map((item, idx) => (
                          <tr key={idx} className="hover:bg-stone-50/50">
                            <td className="p-3.5 font-semibold text-stone-900">
                              {item.productName}
                              {item.customNotes && (
                                <span className="block text-[10px] text-stone-500 font-normal mt-0.5">
                                  Catatan: {item.customNotes}
                                </span>
                              )}
                            </td>
                            <td className="p-3.5 text-stone-600">
                              {item.category} • {(item.material || '').split('+')[0]}
                            </td>
                            <td className="p-3.5 text-center font-bold text-stone-900">
                              {item.quantity}
                            </td>
                            <td className="p-3.5 text-right text-stone-700">
                              {item.unitPrice > 0 ? formatRupiah(item.unitPrice) : 'By Quotation'}
                            </td>
                            <td className="p-3.5 text-right font-bold text-stone-900">
                              {item.unitPrice > 0
                                ? formatRupiah(item.unitPrice * item.quantity)
                                : 'By Quotation'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-stone-50/70 border-t border-stone-200 font-semibold text-stone-800">
                        <tr>
                          <td colSpan={4} className="p-3 text-right">
                            Total Subtotal:
                          </td>
                          <td className="p-3 text-right text-stone-900 font-bold text-sm">
                            {trackedQuotation.totalAmount > 0
                              ? formatRupiah(trackedQuotation.totalAmount)
                              : 'Kalkulasi Final Workshop'}
                          </td>
                        </tr>
                        {trackedQuotation.taxAmount > 0 && (
                          <tr>
                            <td colSpan={4} className="p-3 text-right">
                              PPN 11%:
                            </td>
                            <td className="p-3 text-right text-stone-900">
                              {formatRupiah(trackedQuotation.taxAmount)}
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td colSpan={4} className="p-3 text-right text-stone-900 text-sm font-bold">
                            Total Keseluruhan (Termasuk Garansi & Pemasangan):
                          </td>
                          <td className="p-3 text-right text-[#B88E2F] text-base font-bold">
                            {trackedQuotation.totalAmount > 0
                              ? formatRupiah(trackedQuotation.totalAmount + trackedQuotation.taxAmount)
                              : 'Menunggu Review Estimator'}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Official Bank Account Information */}
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-stone-900 text-[#B88E2F] flex items-center justify-center shrink-0">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-stone-900 text-xs">
                        Rekening Resmi Pembayaran SPK Proyek:
                      </h5>
                      <p className="text-xs text-stone-600 font-mono mt-0.5">
                        {settings.bankAccount?.bankName || 'BCA'}: <strong>{settings.bankAccount?.accountNumber || '527-0988-123'}</strong>
                      </p>
                      <p className="text-[11px] text-stone-500">
                        a.n. {settings.bankAccount?.accountHolder || 'PT KREATIF INDO KREASI MEBEL'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-stone-400 max-w-xs text-right">
                    *Jangan melakukan transfer ke rekening pribadi di luar rekening resmi perusahaan ini.
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-stone-400">
                <Search className="w-10 h-10 mx-auto text-stone-300 mb-2" />
                <p className="text-xs text-stone-500">
                  Ketik nomor penawaran Anda di atas untuk melihat detail lengkap.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
