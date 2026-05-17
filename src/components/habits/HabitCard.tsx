import React from 'react';
import { Trash2 } from 'lucide-react';
import type { HabitWithStats } from '../../types';
import ProgressRing from './ProgressRing';
import StreakBadge from '../common/StreakBadge';
import AnimatedCheck from '../common/AnimatedCheck';

interface HabitCardProps {
  habit: HabitWithStats;
  onToggle: () => void;
  onDelete: () => void;
}

export default function HabitCard({ habit, onToggle, onDelete }: HabitCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <span className="text-3xl">{habit.emoji}</span>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{habit.title}</h3>
            <p className="text-xs text-gray-500 capitalize">{habit.category}</p>
          </div>
        </div>
        <button
          onClick={onDelete}
          className="p-2 hover:bg-red-50 rounded-lg transition text-red-500"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <ProgressRing
            completed={habit.todayCompleted ? 1 : 0}
            total={1}
            size={60}
          />
          <div>
            <StreakBadge streak={habit.currentStreak} />
            <p className="text-xs text-gray-500 mt-1">
              {Math.round(habit.completionRate7d * 100)}% за 7 дней
            </p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="transition transform hover:scale-110"
        >
          <AnimatedCheck
            isChecked={habit.todayCompleted}
            size={40}
          />
        </button>
      </div>
    </div>
  );
}
