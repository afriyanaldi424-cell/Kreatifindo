import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Send,
  User,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  Settings as SettingsIcon,
  ShieldCheck,
  Save,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CSTicket, TicketStatus } from '../../types';
import { cleanPhone } from '../../lib/utils';

export const AdminCSTicketsManager: React.FC = () => {
  const {
    csTickets,
    sendTicketMessage,
    updateTicketStatus,
    csSettings,
    updateCsSettings,
    addToast,
  } = useApp();

  const [selectedTicket, setSelectedTicket] = useState<CSTicket | null>(csTickets[0] || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [adminReply, setAdminReply] = useState('');
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);

  // CS Settings state
  const [csName, setCsName] = useState(csSettings.name);
  const [csTitle, setCsTitle] = useState(csSettings.title);
  const [csPhone, setCsPhone] = useState(csSettings.whatsappNumber);
  const [csGreeting, setCsGreeting] = useState(csSettings.greetingMessage);
  const [csIsOnline, setCsIsOnline] = useState(csSettings.isOnline);

  const filteredTickets = csTickets.filter((t) => {
    return (
      t.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.customerPhone.includes(searchTerm) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReply.trim() || !selectedTicket) return;

    sendTicketMessage(selectedTicket.id, adminReply.trim(), 'agent', csSettings.name);
    setAdminReply('');

    // Update selectedTicket reference
    const updated = csTickets.find((t) => t.id === selectedTicket.id);
    if (updated) setSelectedTicket(updated);
  };

  const handleStatusChange = (status: TicketStatus) => {
    if (!selectedTicket) return;
    updateTicketStatus(selectedTicket.id, status);
    setSelectedTicket({ ...selectedTicket, status });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateCsSettings({
      name: csName.trim(),
      title: csTitle.trim(),
      whatsappNumber: csPhone.trim(),
      greetingMessage: csGreeting.trim(),
      isOnline: csIsOnline,
    });
    setShowSettingsDrawer(false);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-stone-900">
            Inbox Konsultasi & Customer Service
          </h2>
          <p className="text-xs text-stone-500">
            Tangani tiket konsultasi dari pengunjung web secara real-time dan kelola profil officer CS.
          </p>
        </div>

        <button
          onClick={() => setShowSettingsDrawer(true)}
          className="bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <SettingsIcon className="w-4 h-4 text-[#B88E2F]" />
          <span>Pengaturan Profil CS ({csSettings.isOnline ? '🟢 Online' : '⚪ Offline'})</span>
        </button>
      </div>

      {/* 2-Column Chat Desk */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left List (5 cols) */}
        <div className="lg:col-span-4 border-r border-stone-200 flex flex-col">
          <div className="p-4 border-b border-stone-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari tiket / nama pelanggan..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#B88E2F]"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
            {filteredTickets.map((ticket) => {
              const isSelected = selectedTicket?.id === ticket.id;
              const lastMsg = ticket.messages[ticket.messages.length - 1];

              return (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-4 transition-colors cursor-pointer text-xs ${
                    isSelected ? 'bg-stone-100/80 border-l-4 border-stone-900' : 'hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] font-bold text-[#B88E2F]">
                      #{ticket.ticketNumber}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                        ticket.status === 'RESOLVED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ticket.status === 'OPEN'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <strong className="block text-stone-900 truncate font-semibold">
                    {ticket.customerName}
                  </strong>
                  <span className="text-[11px] text-stone-500 block truncate">
                    {ticket.category} • {ticket.customerPhone}
                  </span>
                  <p className="text-[11px] text-stone-600 truncate mt-1">
                    {lastMsg ? lastMsg.message : ticket.subject}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Conversation (8 cols) */}
        <div className="lg:col-span-8 flex flex-col bg-stone-50/50">
          {selectedTicket ? (
            <>
              {/* Ticket Topbar */}
              <div className="p-4 bg-white border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-stone-900 text-base">
                      {selectedTicket.customerName}
                    </h3>
                    <span className="text-xs text-stone-500 font-mono">
                      (WA: {selectedTicket.customerPhone})
                    </span>
                  </div>
                  <span className="text-xs text-[#B88E2F] font-semibold">
                    Topik: {selectedTicket.category} • #{selectedTicket.ticketNumber}
                  </span>
                </div>

                {/* Status Switcher */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-stone-400 text-[11px]">Status:</span>
                  {(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as TicketStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(st)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                        selectedTicket.status === st
                          ? 'bg-stone-900 text-white'
                          : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Thread */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {selectedTicket.messages.map((msg) => {
                  const isAgent = msg.sender === 'agent' || msg.sender === 'system';

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3.5 rounded-2xl text-xs ${
                          isAgent
                            ? 'bg-stone-900 text-white rounded-tr-none shadow-xs'
                            : 'bg-white text-stone-900 border border-stone-200 rounded-tl-none shadow-xs'
                        }`}
                      >
                        <span
                          className={`text-[10px] font-bold block mb-1 ${
                            isAgent ? 'text-[#D4AF37]' : 'text-stone-500'
                          }`}
                        >
                          {msg.senderName}
                        </span>
                        <p className="whitespace-pre-line leading-relaxed">{msg.message}</p>
                      </div>
                      <span className="text-[10px] text-stone-400 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Reply Box */}
              <form onSubmit={handleSendReply} className="p-4 bg-white border-t border-stone-200 flex items-center gap-3">
                <input
                  type="text"
                  value={adminReply}
                  onChange={(e) => setAdminReply(e.target.value)}
                  placeholder={`Balas sebagai ${csSettings.name} (CS)...`}
                  className="flex-1 px-4 py-2.5 text-xs border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                />
                <button
                  type="submit"
                  disabled={!adminReply.trim()}
                  className="bg-[#18181B] hover:bg-stone-800 disabled:opacity-40 text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <span>Kirim Balasan</span>
                  <Send className="w-3.5 h-3.5 text-[#B88E2F]" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-stone-400 text-xs">
              Pilih tiket percakapan di sebelah kiri untuk melihat pesan.
            </div>
          )}
        </div>
      </div>

      {/* CS Profile Settings Modal / Drawer */}
      {showSettingsDrawer && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            onClick={() => setShowSettingsDrawer(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />

          <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl p-6 z-10 border border-stone-200 space-y-4 text-xs font-sans">
            <h3 className="font-serif font-bold text-stone-900 text-lg">
              Konfigurasi Profil Officer CS
            </h3>
            <p className="text-stone-500">
              Ubah nama representatif yang tampil di widget obrolan dan halaman layanan pelanggan.
            </p>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Nama Petugas CS
                </label>
                <input
                  type="text"
                  value={csName}
                  onChange={(e) => setCsName(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Jabatan / Deskripsi Singkat
                </label>
                <input
                  type="text"
                  value={csTitle}
                  onChange={(e) => setCsTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Nomor WhatsApp CS
                </label>
                <input
                  type="tel"
                  value={csPhone}
                  onChange={(e) => setCsPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Pesan Sambutan Otomatis (Greeting)
                </label>
                <textarea
                  rows={2}
                  value={csGreeting}
                  onChange={(e) => setCsGreeting(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F] resize-none"
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200">
                <input
                  type="checkbox"
                  id="onlineStatus"
                  checked={csIsOnline}
                  onChange={(e) => setCsIsOnline(e.target.checked)}
                  className="accent-[#B88E2F]"
                />
                <label htmlFor="onlineStatus" className="font-semibold text-stone-800 cursor-pointer">
                  Tampilkan Status Sebagai Online (Aktif Menerima Chat)
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSettingsDrawer(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#18181B] hover:bg-stone-800 text-white px-5 py-2 rounded-xl font-semibold cursor-pointer"
                >
                  Simpan Profil CS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
