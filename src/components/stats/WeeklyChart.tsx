import React from 'react';
import type { DayStats } from '../../types';

interface WeeklyChartProps {
  stats: DayStats[];
}

export default function WeeklyChart({ stats }: WeeklyChartProps) {
  const dayLabels = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  return (
    <div className="bg-white rounded-2xl p-4 border border-pink-100">
      <h3 className="font-semibold text-gray-800 mb-4">Активность за неделю</h3>
      <div className="flex items-end justify-around h-40 gap-2">
        {stats.map((stat, idx) => {
          const height = Math.max(20, stat.rate * 100);
          return (
            <div key={stat.date} className="flex flex-col items-center flex-1">
              <div className="w-full flex justify-center mb-2">
                <div
                  className="bg-gradient-to-t from-pink-500 to-pink-400 rounded-t-lg transition hover:from-pink-600 hover:to-pink-500"
                  style={{ height: `${height}px`, minWidth: '24px' }}
                  title={`${Math.round(stat.rate * 100)}%`}
                />
              </div>
              <span className="text-xs text-gray-600 font-medium">{dayLabels[idx]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
