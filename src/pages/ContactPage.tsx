import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Building,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { cleanPhone } from '../lib/utils';

export const ContactPage: React.FC = () => {
  const { settings, addToast } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Konsultasi Kebutuhan Perabot');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    setIsSubmitted(true);
    addToast('success', 'Pesan Terkirim', 'Tim konsultan Kreatifindo akan segera menghubungi nomor WhatsApp Anda.');
  };

  return (
    <div className="bg-[#FBFBF9] min-h-screen py-12 sm:py-16 border-b border-stone-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#B88E2F]">
            Hubungi Kami
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Studio & Fasilitas Workshop
          </h1>
          <p className="text-sm text-stone-600 font-sans leading-relaxed">
            Kunjungi studio desain kami atau jadwalkan inspeksi fasilitas workshop untuk melihat langsung standar material dan keahlian perabot Kreatifindo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details & Map Card (Left) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
                <div className="w-10 h-10 rounded-xl bg-stone-900 text-[#B88E2F] flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-stone-900 text-lg">
                    {settings.companyName}
                  </h3>
                  <p className="text-xs text-stone-500">Kantor Pusat & Studio Desain</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-stone-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B88E2F] shrink-0 mt-1" />
                  <div>
                    <strong className="text-stone-900 block mb-0.5">Alamat Kantor & Studio:</strong>
                    <span>{settings.address}, {settings.city} {settings.postalCode}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#B88E2F] shrink-0 mt-1" />
                  <div>
                    <strong className="text-stone-900 block mb-0.5">Hotline Telepon & WhatsApp:</strong>
                    <span>{settings.phone} / +62 812-9000-8888</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#B88E2F] shrink-0 mt-1" />
                  <div>
                    <strong className="text-stone-900 block mb-0.5">Email Resmi Penawaran:</strong>
                    <span>{settings.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#B88E2F] shrink-0 mt-1" />
                  <div>
                    <strong className="text-stone-900 block mb-0.5">Jam Layanan Studio:</strong>
                    <span>{settings.openingHoursWeekday}</span>
                    <span className="block text-stone-400">{settings.openingHoursWeekend}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${cleanPhone(settings.whatsapp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat WhatsApp Tim Arsitek Sekarang</span>
                </a>
              </div>
            </div>

            {/* Simulated Clean Architectural Location Map Preview */}
            <div className="bg-stone-900 text-stone-300 p-6 rounded-3xl border border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                  Peta Lokasi Workshop
                </span>
                <span className="text-[11px] text-emerald-400 font-medium">Akses Truk Kontainer 40ft</span>
              </div>

              <div className="relative rounded-2xl overflow-hidden aspect-16/9 bg-stone-800 flex items-center justify-center text-center p-4">
                <div className="space-y-2">
                  <MapPin className="w-8 h-8 text-[#B88E2F] mx-auto animate-bounce" />
                  <p className="text-xs text-white font-medium">
                    Kawasan Industri Sentul Woodworking Center Blok C-12, Bogor
                  </p>
                  <span className="text-[10px] text-stone-400 block">
                    (15 Menit dari Exit Tol Jagorawi)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Message Form (Right) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xs">
            <div className="pb-6 border-b border-stone-100 mb-6">
              <h3 className="font-serif font-bold text-stone-900 text-xl">
                Kirimkan Pesan atau Rencana Proyek
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Lampirkan detail proyek Anda dan konsultan senior kami akan merespons dalam waktu 1x24 jam kerja.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-stone-900 text-xl">
                  Terima Kasih, Pesan Anda Telah Diterima!
                </h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Tim konsultan interior Kreatifindo akan segera menghubungi nomor WhatsApp <strong>{phone}</strong> untuk mendiskusikan kebutuhan perabot Anda.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-[#18181B] text-white px-5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Nama Lengkap Anda <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Bpk / Ibu..."
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
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
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Email Anda
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Topik Konsultasi
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F] bg-white"
                    >
                      <option value="Konsultasi Kebutuhan Perabot">Konsultasi Kebutuhan Perabot</option>
                      <option value="Minta Penawaran Proyek Kantor">Minta Penawaran Proyek Kantor</option>
                      <option value="Custom Furniture Residensial">Custom Furniture Residensial</option>
                      <option value="Jadwal Survey Lokasi">Jadwal Survey Lokasi</option>
                      <option value="Kemitraan Arsitek & Desainer">Kemitraan Arsitek & Desainer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Ceritakan Rencana Perabot & Lokasi Ruangan <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Contoh: Kami sedang merenovasi kantor 200 m2 di Kuningan, butuh 20 workstation meja, 1 meja meeting 10 orang, dan credenza resepsionis..."
                    className="w-full p-3.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#18181B] hover:bg-stone-800 text-white py-3.5 px-6 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-98"
                >
                  <Send className="w-4 h-4 text-[#B88E2F]" />
                  <span>Kirimkan Pesan ke Konsultan Interior</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
