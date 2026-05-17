import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTheme } from '../hooks/useTheme';
import { useHabitStore } from '../stores/habitStore';
import { auth } from '../lib/firebase';

export default function Settings() {
  const [user] = useAuthState(auth);
  const { theme, setTheme } = useTheme();
  const { settings, setSettings } = useHabitStore();
  const [name, setName] = useState(settings.childName || '');

  const handleSaveName = () => {
    setSettings({ ...settings, childName: name });
  };

  return (
    <div className="p-4 pb-24 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Настройки</h2>

      {/* Child Name */}
      <div className="bg-white rounded-xl p-4 border border-pink-100 mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Имя ребенка</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            onClick={handleSaveName}
            className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition"
          >
            Сохранить
          </button>
        </div>
      </div>

      {/* Theme */}
      <div className="bg-white rounded-xl p-4 border border-pink-100 mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-3">Тема</label>
        <div className="space-y-2">
          {(['light', 'dark', 'system'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`w-full p-3 text-left rounded-lg border-2 transition capitalize ${
                theme === t
                  ? 'border-pink-500 bg-pink-50 font-semibold text-pink-700'
                  : 'border-gray-200 hover:border-pink-300'
              }`}
            >
              {t === 'light' ? '☀️ Светлая' : t === 'dark' ? '🌙 Темная' : '⚙️ Система'}
            </button>
          ))}
        </div>
      </div>

      {/* User Info */}
      {user && (
        <div className="bg-white rounded-xl p-4 border border-pink-100">
          <p className="text-sm text-gray-600 mb-1">Email аккаунта</p>
          <p className="font-medium text-gray-800">{user.email}</p>
        </div>
      )}
    </div>
  );
}
