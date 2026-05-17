import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { useHabits } from '../hooks/useHabits';
import WeeklyChart from '../components/stats/WeeklyChart';
import StatsCard from '../components/stats/StatsCard';
import type { DayStats } from '../types';
import { subDays, format } from 'date-fns';

export default function Stats() {
  const [user] = useAuthState(auth);
  const { habits } = useHabits();

  // Generate stats for last 7 days
  const weekStats: DayStats[] = Array.from({ length: 7 }, (_, i) => {
    const date = format(subDays(new Date(), 6 - i), 'yyyy-MM-dd');
    return {
      date,
      total: habits.length,
      completed: Math.floor(Math.random() * (habits.length + 1)),
      rate: Math.random(),
    };
  });

  const totalCompleted = habits.reduce((sum, h) => sum + (h.todayCompleted ? 1 : 0), 0);
  const averageCompletion = habits.length > 0 ? totalCompleted / habits.length : 0;
  const bestStreak = Math.max(...habits.map((h) => h.currentStreak), 0);

  return (
    <div className="p-4 pb-24 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Статистика</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatsCard label="Привычек" value={habits.length} icon="📊" color="pink" />
        <StatsCard label="Завершено" value={totalCompleted} icon="✅" color="green" />
        <StatsCard label="Лучшая серия" value={`${bestStreak} дн`} icon="🔥" color="blue" />
        <StatsCard
          label="Средний %"
          value={`${Math.round(averageCompletion * 100)}%`}
          icon="📈"
          color="pink"
        />
      </div>

      <WeeklyChart stats={weekStats} />
    </div>
  );
}
