import React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
}

export default function StatsCard({ label, value, icon, color = 'pink' }: StatsCardProps) {
  const colorMap = {
    pink: 'bg-pink-50 border-pink-200 text-pink-600',
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-600',
  };

  return (
    <div className={`rounded-lg border p-4 ${colorMap[color as keyof typeof colorMap]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        {icon && <div className="text-3xl opacity-50">{icon}</div>}
      </div>
    </div>
  );
}
