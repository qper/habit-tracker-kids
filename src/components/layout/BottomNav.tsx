import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, BarChart3, Settings } from 'lucide-react';

const tabs = [
  { path: '/', icon: CheckCircle2, label: 'Сегодня' },
  { path: '/stats', icon: BarChart3, label: 'Статистика' },
  { path: '/settings', icon: Settings, label: 'Настройки' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 flex justify-around py-2 px-4 safe-area-inset-bottom">
      {tabs.map(({ path, icon: Icon, label }) => {
        const isActive = location.pathname === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition ${
              isActive
                ? 'text-pink-600 bg-pink-50'
                : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
