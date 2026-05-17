import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { useHabits } from '../hooks/useHabits';
import { createHabit, toggleEntry } from '../lib/db';
import HabitList from '../components/habits/HabitList';
import HabitForm from '../components/habits/HabitForm';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { formatDate } from '../lib/utils';
import type { Habit } from '../types';

export default function Today() {
  const [user] = useAuthState(auth);
  const { habits, loading, deleteHabit } = useHabits();
  const [showForm, setShowForm] = useState(false);

  const handleCreateHabit = async (habitData: Omit<Habit, 'id' | 'userId'>) => {
    if (!user) return;
    try {
      await createHabit(user.uid, habitData);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to create habit:', err);
    }
  };

  const handleToggleHabit = async (habitId: string) => {
    if (!user) return;
    const habit = habits.find((h) => h.id === habitId);
    if (!habit) return;

    try {
      const today = formatDate(new Date());
      await toggleEntry(user.uid, habitId, today, habit.todayCompleted);
    } catch (err) {
      console.error('Failed to toggle habit:', err);
    }
  };

  if (loading) {
    return <div className="p-4 text-center text-gray-600">Загрузка...</div>;
  }

  return (
    <div className="p-4 pb-24 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {format(new Date(), 'EEEE, d MMMM', { locale: ru })}
        </h2>
        <p className="text-sm text-gray-600">Выполни свои привычки!</p>
      </div>

      {showForm && (
        <div className="mb-4">
          <HabitForm onSubmit={handleCreateHabit} onCancel={() => setShowForm(false)} />
        </div>
      )}

      <HabitList
        habits={habits}
        onToggle={handleToggleHabit}
        onDelete={deleteHabit}
      />

      <button
        onClick={() => setShowForm(!showForm)}
        className="fixed bottom-24 right-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition text-2xl"
      >
        {showForm ? '✕' : '+'}
      </button>
    </div>
  );
}
