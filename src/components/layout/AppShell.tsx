import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import BottomNav from './BottomNav';

export default function AppShell({ user }: { user: any }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Sign out failed:', err);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-pink-50 to-red-50 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur border-b border-pink-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✨</span>
          <h1 className="text-xl font-bold text-pink-600">Мои Привычки</h1>
        </div>
        <button
          onClick={handleSignOut}
          className="text-sm px-3 py-1 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 transition"
        >
          Выход
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      {location.pathname !== '/settings' && <BottomNav />}
    </div>
  );
}
