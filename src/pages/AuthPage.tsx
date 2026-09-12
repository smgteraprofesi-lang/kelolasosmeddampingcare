import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/useToast';
import Toast from '@/components/Toast';

export default function AuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast, showToast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Email dan password wajib diisi.');
      return;
    }
    setLoading(true);

    if (mode === 'signup') {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }
      showToast('Akun berhasil dibuat. Silakan masuk.');
      setMode('signin');
      setPassword('');
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError('Email atau password salah.');
        setLoading(false);
        return;
      }
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FB5EA8] text-white font-bold text-lg">
            DC
          </div>
          <h1 className="text-lg font-bold text-gray-900">Kelola Sosmed Dampingcare</h1>
          <p className="text-sm text-gray-500 mt-1">
            {mode === 'signin' ? 'Masuk ke akun Anda' : 'Buat akun baru'}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex gap-1 rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => { setMode('signin'); setError(''); }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                mode === 'signin' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
              }`}
            >
              Masuk
            </button>
            <button
              onClick={() => { setMode('signup'); setError(''); }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                mode === 'signup' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
              }`}
            >
              Daftar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@dampingcare.com"
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:border-[#FB5EA8] focus:outline-none focus:ring-1 focus:ring-[#FB5EA8]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:border-[#FB5EA8] focus:outline-none focus:ring-1 focus:ring-[#FB5EA8]"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#FB5EA8] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#e54d97] transition-colors disabled:opacity-50"
            >
              {loading ? 'Memproses...' : mode === 'signin' ? 'Masuk' : 'Daftar'}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          Data tersimpan aman di Supabase
        </p>
      </div>

      <Toast message={toast} />
    </div>
  );
}
