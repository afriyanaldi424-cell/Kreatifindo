import React, { useState } from 'react';
import {
  MessageSquare,
  X,
  Send,
  User,
  Clock,
  ExternalLink,
  CheckCircle2,
  Phone,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CSTicket, TicketCategory } from '../../types';
import { cleanPhone } from '../../lib/utils';

export const CSTicketWidget: React.FC = () => {
  const {
    isCsWidgetOpen,
    setIsCsWidgetOpen,
    csSettings,
    activeCsTicket,
    setActiveCsTicket,
    createCsTicket,
    sendTicketMessage,
    csTickets,
  } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<TicketCategory>('Konsultasi Produk');
  const [message, setMessage] = useState('');
  const [chatInput, setChatInput] = useState('');

  const categories: TicketCategory[] = [
    'Konsultasi Produk',
    'Minta Penawaran',
    'Custom Furniture',
    'Tanya Pengiriman',
    'Komplain',
    'Lainnya',
  ];

  const handleStartTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    const ticket = createCsTicket({
      customerName: name.trim(),
      customerPhone: phone.trim(),
      customerEmail: '',
      category,
      subject: `${category} - ${name.trim()}`,
      initialMessage: message.trim(),
    });

    setMessage('');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeCsTicket) return;

    sendTicketMessage(activeCsTicket.id, chatInput.trim(), 'customer', activeCsTicket.customerName);
    setChatInput('');
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:left-6 sm:bottom-6 z-40 max-w-[calc(100vw-2rem)]">
      {/* Floating Trigger Button */}
      {!isCsWidgetOpen && (
        <button
          onClick={() => setIsCsWidgetOpen(true)}
          className="group flex items-center gap-3 bg-[#18181B] hover:bg-black text-white pl-2 pr-4 py-2 rounded-full shadow-2xl border border-stone-700 transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
        >
          <div className="relative">
            <img
              src={csSettings.avatar}
              alt={csSettings.name}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-[#B88E2F]"
            />
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#18181B] ${
                csSettings.isOnline ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
          </div>
          <div className="text-left font-sans">
            <span className="text-[10px] sm:text-[11px] text-[#CBB279] font-semibold block leading-tight flex items-center gap-1">
              <span>Konsultasi Desain</span>
              <Sparkles className="w-2.5 h-2.5" />
            </span>
            <span className="text-xs font-bold text-white block leading-tight">
              {csSettings.name}
            </span>
          </div>
        </button>
      )}

      {/* CS Chat & Ticket Dialog */}
      {isCsWidgetOpen && (
        <div className="bg-white w-full sm:w-[380px] max-w-full h-[80vh] sm:h-[520px] max-h-[580px] rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-scaleUp font-sans">
          {/* Header */}
          <div className="bg-[#18181B] text-white p-4 flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={csSettings.avatar}
                  alt={csSettings.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#B88E2F]"
                />
                <span
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-[#18181B] ${
                    csSettings.isOnline ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-tight text-white">{csSettings.name}</h4>
                <p className="text-[11px] text-stone-400 leading-tight mt-0.5">{csSettings.title}</p>
                <span className="text-[10px] text-emerald-400 font-medium">
                  {csSettings.isOnline ? '● Online Siap Melayani' : '● Diluar Jam Kerja'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCsWidgetOpen(false)}
              className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Active Conversation or Ticket Creator */}
          {activeCsTicket ? (
            <div className="flex-1 flex flex-col justify-between overflow-hidden bg-stone-50">
              {/* Ticket Meta Bar */}
              <div className="bg-stone-100 px-4 py-2 border-b border-stone-200 text-xs flex items-center justify-between">
                <div>
                  <span className="font-semibold text-stone-800">#{activeCsTicket.ticketNumber}</span>
                  <span className="text-stone-500 ml-1.5 font-normal">({activeCsTicket.category})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      activeCsTicket.status === 'RESOLVED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {activeCsTicket.status}
                  </span>
                  <button
                    onClick={() => setActiveCsTicket(null)}
                    className="text-[11px] text-[#B88E2F] hover:underline font-medium cursor-pointer"
                  >
                    Tiket Baru
                  </button>
                </div>
              </div>

              {/* Messages Thread */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {/* Greeting Bubble */}
                <div className="flex items-start gap-2 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-[#18181B] text-[#B88E2F] flex items-center justify-center shrink-0 text-xs font-bold">
                    K
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-stone-200 text-xs text-stone-700 shadow-xs">
                    <p className="font-semibold text-stone-900 text-[11px] mb-1">{csSettings.name}</p>
                    <p>{csSettings.greetingMessage}</p>
                  </div>
                </div>

                {activeCsTicket.messages.map((msg) => {
                  const isUser = msg.sender === 'customer';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-xs ${
                          isUser
                            ? 'bg-[#18181B] text-white rounded-tr-none'
                            : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none shadow-xs'
                        }`}
                      >
                        {!isUser && (
                          <span className="text-[10px] font-bold text-[#B88E2F] block mb-1">
                            {msg.senderName}
                          </span>
                        )}
                        <p className="leading-relaxed whitespace-pre-line">{msg.message}</p>
                      </div>
                      <span className="text-[10px] text-stone-400 mt-0.5 px-1">
                        {(msg.timestamp || '').split(' ')[1] || msg.timestamp || ''}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ketik pesan atau pertanyaan..."
                  className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#B88E2F]"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="p-2 bg-[#18181B] hover:bg-stone-800 disabled:opacity-40 text-white rounded-lg transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#B88E2F]" />
                </button>
              </form>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between">
              <div>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl mb-3 text-xs text-stone-600">
                  <p className="font-semibold text-stone-900 mb-0.5">Layanan Konsultasi Interior</p>
                  <p>Silakan isi detail singkat kebutuhan Anda di bawah ini, atau langsung hubungi hotline kami.</p>
                </div>

                <form onSubmit={handleStartTicket} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Contoh: Bpk. Dimas / Ibu Jessica"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#B88E2F]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Nomor WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0812-xxxx-xxxx"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#B88E2F]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Topik Kebutuhan</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as TicketCategory)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#B88E2F] bg-white"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Pesan / Kebutuhan</label>
                    <textarea
                      required
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ceritakan rencana furniture ruangan atau jumlah unit yang ingin dipesan..."
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#B88E2F] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#18181B] hover:bg-stone-800 text-white font-semibold py-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Mulai Konsultasi Online</span>
                    <Send className="w-3.5 h-3.5 text-[#B88E2F]" />
                  </button>
                </form>
              </div>

              {/* WhatsApp Direct Option */}
              <div className="pt-3 border-t border-stone-200 mt-2">
                <a
                  href={`https://wa.me/${cleanPhone(csSettings.whatsappNumber)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Atau Langsung Chat via WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
