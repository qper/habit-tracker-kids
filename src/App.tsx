import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import AppShell from './components/layout/AppShell';
import Today from './pages/Today';
import Stats from './pages/Stats';
import Settings from './pages/Settings';
import './index.css';

export default function App() {
  const [user, setUser] = useState<any>({ uid: 'demo-user', email: 'demo@example.com' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Try to authenticate with Firebase if configured
    const hasFirebaseConfig = import.meta.env.VITE_FIREBASE_API_KEY && 
                             import.meta.env.VITE_FIREBASE_API_KEY.length > 10;
    
    if (hasFirebaseConfig) {
      try {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            setUser(currentUser);
          }
        });
        return unsubscribe;
      } catch (err) {
        console.error('Firebase error:', err);
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-red-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-pink-200 border-t-pink-500"></div>
          <p className="mt-4 text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<AppShell user={user} />}>
          <Route path="/" element={<Today />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
