import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin, navigate } = useApp();

  const [email, setEmail] = useState('admin@kreatifindo.com');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(email.trim(), password.trim());
    if (!success) {
      setErrorMsg('Email atau password tidak cocok. Silakan coba kembali.');
    } else {
      setErrorMsg('');
    }
  };

  const handleQuickFill = (roleEmail: string, rolePass: string) => {
    setEmail(roleEmail);
    setPassword(rolePass);
    loginAdmin(roleEmail, rolePass);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-stone-900 rounded-3xl border border-stone-800 p-8 sm:p-10 shadow-2xl space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-black border border-stone-800 text-[#B88E2F] mb-2 shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            KREATIFINDO CMS
          </h1>
          <p className="text-xs text-stone-400">
            Pusat Kendali Konten Katalog, Penawaran & Customer Service
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-xs text-rose-300">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-stone-300 font-semibold mb-1">Email Pengguna</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kreatifindo.com"
                className="w-full pl-10 pr-3.5 py-3 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-[#B88E2F]"
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-300 font-semibold mb-1">Kata Sandi</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-3 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-[#B88E2F]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#B88E2F] hover:bg-[#A17A24] text-white py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-98"
          >
            <span>Masuk ke Panel CMS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Quick Fill Demo Logins */}
        <div className="pt-6 border-t border-stone-800/80 space-y-3">
          <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block text-center">
            Pilihan Akun Demo (Klik Langsung Masuk):
          </span>

          <div className="grid grid-cols-3 gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => handleQuickFill('admin@kreatifindo.com', 'admin123')}
              className="p-2 bg-stone-800/80 hover:bg-stone-800 border border-stone-700 rounded-xl text-left transition-colors cursor-pointer"
            >
              <strong className="block text-white">Super Admin</strong>
              <span className="text-stone-400 text-[10px]">Full Access</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('sales@kreatifindo.com', 'sales123')}
              className="p-2 bg-stone-800/80 hover:bg-stone-800 border border-stone-700 rounded-xl text-left transition-colors cursor-pointer"
            >
              <strong className="block text-white">Estimator</strong>
              <span className="text-stone-400 text-[10px]">Quotations</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('cs@kreatifindo.com', 'cs123')}
              className="p-2 bg-stone-800/80 hover:bg-stone-800 border border-stone-700 rounded-xl text-left transition-colors cursor-pointer"
            >
              <strong className="block text-white">CS Officer</strong>
              <span className="text-stone-400 text-[10px]">Helpdesk</span>
            </button>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('#/')}
            className="text-xs text-stone-500 hover:text-stone-300 transition-colors cursor-pointer"
          >
            ← Kembali ke Tampilan Depan Website
          </button>
        </div>
      </div>
    </div>
  );
};
