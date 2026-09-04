import React, { useState } from 'react';
import { Save, Building, Phone, Mail, Clock, CreditCard, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminSettingsManager: React.FC = () => {
  const { settings, updateSettings, addToast } = useApp();

  const [companyName, setCompanyName] = useState(settings.companyName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [address, setAddress] = useState(settings.address);
  const [city, setCity] = useState(settings.city);
  const [postalCode, setPostalCode] = useState(settings.postalCode);
  const [phone, setPhone] = useState(settings.phone);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [email, setEmail] = useState(settings.email);

  const [openingWeekday, setOpeningWeekday] = useState(settings.openingHoursWeekday);
  const [openingWeekend, setOpeningWeekend] = useState(settings.openingHoursWeekend);

  const [bankName, setBankName] = useState(settings.bankAccount.bankName);
  const [accountNumber, setAccountNumber] = useState(settings.bankAccount.accountNumber);
  const [accountHolder, setAccountHolder] = useState(settings.bankAccount.accountHolder);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      companyName: companyName.trim(),
      tagline: tagline.trim(),
      address: address.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
      phone: phone.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      openingHoursWeekday: openingWeekday.trim(),
      openingHoursWeekend: openingWeekend.trim(),
      bankAccount: {
        bankName: bankName.trim(),
        accountNumber: accountNumber.trim(),
        accountHolder: accountHolder.trim(),
      },
    });
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h2 className="font-serif font-bold text-2xl text-stone-900">
          Pengaturan Perusahaan & Kontak
        </h2>
        <p className="text-xs text-stone-500">
          Ubah informasi legalitas, alamat workshop, hotline WhatsApp, dan nomor rekening pembayaran yang tertera pada lembar penawaran PDF.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 sm:p-8 space-y-8 text-xs">
        {/* Company Identity */}
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-stone-900 text-base pb-2 border-b border-stone-100 flex items-center gap-2">
            <Building className="w-4 h-4 text-[#B88E2F]" />
            <span>Identitas Perusahaan</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Nama Resmi Perusahaan (PT / CV)
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Slogan / Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Alamat Lengkap Workshop & Kantor
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Kota</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Kode Pos</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
              />
            </div>
          </div>
        </div>

        {/* Contact Hotline */}
        <div className="space-y-4 pt-4 border-t border-stone-100">
          <h3 className="font-serif font-bold text-stone-900 text-base pb-2 border-b border-stone-100 flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#B88E2F]" />
            <span>Saluran Komunikasi & Hotline</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Nomor Telepon Kantor
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Hotline WhatsApp Resmi (Tanpa Spasi)
              </label>
              <input
                type="text"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="6281288889999"
                className="w-full px-3.5 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Alamat Email Resmi
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
              />
            </div>
          </div>
        </div>

        {/* Operational Hours */}
        <div className="space-y-4 pt-4 border-t border-stone-100">
          <h3 className="font-serif font-bold text-stone-900 text-base pb-2 border-b border-stone-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#B88E2F]" />
            <span>Jam Operasional Workshop & Studio</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Jam Kerja Hari Kerja (Senin - Jumat)
              </label>
              <input
                type="text"
                value={openingWeekday}
                onChange={(e) => setOpeningWeekday(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Jam Kerja Akhir Pekan (Sabtu / Janji Temu)
              </label>
              <input
                type="text"
                value={openingWeekend}
                onChange={(e) => setOpeningWeekend(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
              />
            </div>
          </div>
        </div>

        {/* Bank Account Details */}
        <div className="space-y-4 pt-4 border-t border-stone-100">
          <h3 className="font-serif font-bold text-stone-900 text-base pb-2 border-b border-stone-100 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#B88E2F]" />
            <span>Rekening Bank Resmi Penawaran Proyek</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Nama Bank</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="Bank Central Asia (BCA)"
                className="w-full px-3.5 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Nomor Rekening</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="8830-192-888"
                className="w-full px-3.5 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F] font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Atas Nama Pemilik</label>
              <input
                type="text"
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                placeholder="PT Kreatifindo Karya Nusantara"
                className="w-full px-3.5 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#B88E2F]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-stone-200 flex justify-end">
          <button
            type="submit"
            className="bg-[#18181B] hover:bg-stone-800 text-white px-7 py-3 rounded-xl font-semibold flex items-center gap-2 cursor-pointer shadow-md text-xs sm:text-sm"
          >
            <Save className="w-4 h-4 text-[#B88E2F]" />
            <span>Simpan Informasi Perusahaan</span>
          </button>
        </div>
      </form>
    </div>
  );
};
