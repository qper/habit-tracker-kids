import React from 'react';
import type { HabitWithStats } from '../../types';
import HabitCard from './HabitCard';

interface HabitListProps {
  habits: HabitWithStats[];
  onToggle: (habitId: string) => void;
  onDelete: (habitId: string) => void;
}

export default function HabitList({ habits, onToggle, onDelete }: HabitListProps) {
  if (habits.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Привычек еще нет. Создайте первую! 🌟</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggle={() => onToggle(habit.id)}
          onDelete={() => onDelete(habit.id)}
        />
      ))}
    </div>
  );
}
