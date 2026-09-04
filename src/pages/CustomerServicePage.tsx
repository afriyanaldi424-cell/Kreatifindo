import React, { useState } from 'react';
import {
  MessageSquare,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ChevronDown,
  User,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TicketCategory } from '../types';
import { cleanPhone } from '../lib/utils';

export const CustomerServicePage: React.FC = () => {
  const {
    csSettings,
    csTickets,
    createCsTicket,
    activeCsTicket,
    setActiveCsTicket,
    sendTicketMessage,
    settings,
  } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<TicketCategory>('Konsultasi Produk');
  const [message, setMessage] = useState('');
  const [searchTicketNo, setSearchTicketNo] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const categories: TicketCategory[] = [
    'Konsultasi Produk',
    'Minta Penawaran',
    'Custom Furniture',
    'Tanya Pengiriman',
    'Komplain',
    'Lainnya',
  ];

  const faqs = [
    {
      q: 'Berapa lama estimasi waktu pembuatan custom furniture?',
      a: 'Waktu produksi standar workshop berkisar antara 14 hingga 25 hari kerja setelah gambar 3D final dan Down Payment (DP) disetujui. Untuk pesanan mendesak atau proyek korporat tertentu, jadwal dapat disesuaikan dengan kapasitas mesin kami.',
    },
    {
      q: 'Apakah bisa melakukan survey ukuran langsung ke lokasi?',
      a: 'Ya, tim surveyor kami siap datang melakukan pengukuran presisi dengan laser meter di area Jabodetabek dan kota-kota besar sekitarnya. Jadwal survey dapat dikoordinasikan setelah konsultasi awal denah ruang.',
    },
    {
      q: 'Bagaimana sistem pembayaran dan penagihan proyek?',
      a: 'Standar pembayaran proyek terbagi menjadi DP 50% saat penandatanganan SPK & gambar kerja, 40% saat barang selesai QC di workshop siap kirim, dan pelunasan 10% setelah instalasi tuntas di lokasi Anda.',
    },
    {
      q: 'Apakah perabot bergaransi dan bagaimana klaimnya?',
      a: 'Semua perabot kami dilengkapi garansi konstruksi resmi selama 1-2 tahun. Jika terjadi kendala pada sambungan atau rel hidrolik, tim teknisi kami akan datang melakukan perbaikan tanpa biaya tambahan.',
    },
  ];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    createCsTicket({
      customerName: name.trim(),
      customerPhone: phone.trim(),
      customerEmail: email.trim(),
      category,
      subject: `${category} - ${name.trim()}`,
      initialMessage: message.trim(),
    });

    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  const handleSearchTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTicketNo.trim()) return;

    const found = csTickets.find(
      (t) => t.ticketNumber.toUpperCase() === searchTicketNo.trim().toUpperCase()
    );
    if (found) {
      setActiveCsTicket(found);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !activeCsTicket) return;

    sendTicketMessage(activeCsTicket.id, replyMessage.trim(), 'customer', activeCsTicket.customerName);
    setReplyMessage('');
  };

  return (
    <div className="bg-[#FBFBF9] min-h-screen py-12 sm:py-16 border-b border-stone-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#B88E2F]">
            Pusat Layanan Pelanggan
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Konsultasi & Customer Service
          </h1>
          <p className="text-sm text-stone-600 font-sans leading-relaxed">
            Bicara langsung dengan tim representatif desainer dan estimator Kreatifindo untuk konsultasi kebutuhan perabot, penawaran proyek, maupun status pesanan Anda.
          </p>
        </div>

        {/* CS Officer Profile Card & Lookup */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={csSettings.avatar}
                alt={csSettings.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#B88E2F]"
              />
              <span
                className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                  csSettings.isOnline ? 'bg-emerald-500' : 'bg-amber-400'
                }`}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-stone-900 text-lg sm:text-xl">
                  {csSettings.name}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
                  {csSettings.isOnline ? 'Online Siap Melayani' : 'Di Luar Jam Kerja'}
                </span>
              </div>
              <p className="text-xs text-stone-500">{csSettings.title}</p>
              <div className="flex items-center gap-2 text-xs text-stone-600 mt-1">
                <Clock className="w-3.5 h-3.5 text-[#B88E2F]" />
                <span>Jam Kerja: {settings.openingHoursWeekday}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href={`https://wa.me/${cleanPhone(csSettings.whatsappNumber)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1EBE5D] text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp CS Langsung</span>
            </a>

            <form onSubmit={handleSearchTicket} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={searchTicketNo}
                onChange={(e) => setSearchTicketNo(e.target.value)}
                placeholder="No Tiket (TK-xxxx)"
                className="px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F] uppercase w-full sm:w-36"
              />
              <button
                type="submit"
                className="bg-[#18181B] text-white px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cek
              </button>
            </form>
          </div>
        </div>

        {/* 2 Columns: Start Ticket / Live Chat View & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Active Ticket Thread OR Create Ticket Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
            {activeCsTicket ? (
              <div className="flex flex-col h-[560px]">
                {/* Header */}
                <div className="p-4 sm:p-5 bg-stone-900 text-white flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#D4AF37] font-semibold">
                      #{activeCsTicket.ticketNumber} • {activeCsTicket.category}
                    </span>
                    <h4 className="font-serif font-bold text-base text-white">
                      {activeCsTicket.subject}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 font-medium">
                      {activeCsTicket.status}
                    </span>
                    <button
                      onClick={() => setActiveCsTicket(null)}
                      className="text-xs text-[#D4AF37] hover:underline cursor-pointer ml-2"
                    >
                      Buka Tiket Baru
                    </button>
                  </div>
                </div>

                {/* Messages Box */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-stone-50">
                  {/* System greeting */}
                  <div className="bg-white p-4 rounded-2xl border border-stone-200 text-xs text-stone-600 max-w-[85%] shadow-xs">
                    <span className="font-bold text-stone-900 block mb-1">{csSettings.name} (CS)</span>
                    <p>{csSettings.greetingMessage}</p>
                  </div>

                  {activeCsTicket.messages.map((msg) => {
                    const isUser = msg.sender === 'customer';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[85%] p-3.5 rounded-2xl text-xs ${
                            isUser
                              ? 'bg-[#18181B] text-white rounded-tr-none'
                              : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none shadow-xs'
                          }`}
                        >
                          {!isUser && (
                            <span className="text-[11px] font-bold text-[#B88E2F] block mb-1">
                              {msg.senderName}
                            </span>
                          )}
                          <p className="whitespace-pre-line leading-relaxed">{msg.message}</p>
                        </div>
                        <span className="text-[10px] text-stone-400 mt-1 px-1">
                          {msg.senderName} • {msg.timestamp}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Message Reply Form */}
                <form onSubmit={handleSendReply} className="p-4 bg-white border-t border-stone-200 flex items-center gap-3">
                  <input
                    type="text"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Tulis balasan pesan Anda..."
                    className="flex-1 px-4 py-2.5 text-xs border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                  />
                  <button
                    type="submit"
                    disabled={!replyMessage.trim()}
                    className="bg-[#18181B] hover:bg-stone-800 disabled:opacity-40 text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer"
                  >
                    <span>Kirim</span>
                    <Send className="w-3.5 h-3.5 text-[#B88E2F]" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-6 sm:p-8 space-y-6">
                <div className="pb-4 border-b border-stone-100">
                  <h3 className="font-serif font-bold text-stone-900 text-lg">
                    Buka Tiket Konsultasi Baru
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Isi detail pertanyaan atau kebutuhan Anda. Tim kami akan merespons cepat.
                  </p>
                </div>

                <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Nama Lengkap <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Bpk / Ibu..."
                        className="w-full px-3 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Nomor WhatsApp <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0812-xxxx-xxxx"
                        className="w-full px-3 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Kategori Permintaan
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as TicketCategory)}
                        className="w-full px-3 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F] bg-white"
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Email (Opsional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@email.com"
                        className="w-full px-3 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Deskripsi Kebutuhan / Pesan <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Jelaskan kebutuhan perabot atau pertanyaan spesifikasi Anda secara jelas..."
                      className="w-full p-3 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#18181B] hover:bg-stone-800 text-white py-3 px-6 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <span>Mulai Percakapan Tiket Online</span>
                    <Send className="w-4 h-4 text-[#B88E2F]" />
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                <HelpCircle className="w-5 h-5 text-[#B88E2F]" />
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  Pertanyaan yang Sering Diajukan (FAQ)
                </h3>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-stone-200 rounded-2xl overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 text-left font-serif font-bold text-stone-900 text-xs sm:text-sm flex items-center justify-between gap-3 bg-stone-50/50 hover:bg-stone-50 cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="p-4 text-xs text-stone-600 bg-white border-t border-stone-100 leading-relaxed font-sans">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="p-6 rounded-3xl bg-stone-900 text-white space-y-3">
              <h4 className="font-serif font-bold text-base text-white">
                Butuh Respons Cepat Hari Ini?
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Hubungi saluran hotline darurat konsultan interior Kreatifindo untuk permintaan jadwal survey kilat.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${cleanPhone(settings.whatsapp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#25D366] hover:underline"
                >
                  <span>Buka Obrolan WhatsApp Langsung</span>
                  <Send className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
