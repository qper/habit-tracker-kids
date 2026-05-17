import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { subscribeToHabits, deleteHabit as deleteHabitDB } from '../lib/db';
import type { Habit, HabitWithStats } from '../types';

export function useHabits() {
  const [user] = useAuthState(auth);
  const [habits, setHabits] = useState<HabitWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToHabits(
      user.uid,
      (data: Habit[]) => {
        const habitsWithStats = data.map((habit) => ({
          ...habit,
          currentStreak: 0,
          longestStreak: 0,
          completionRate7d: 0,
          completionRate30d: 0,
          todayCompleted: false,
          entries: {},
        } as HabitWithStats));
        setHabits(habitsWithStats);
        setLoading(false);
      },
      (err: Error) => {
        setError(err);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [user]);

  const deleteHabit = async (habitId: string) => {
    if (!user) return;
    try {
      await deleteHabitDB(user.uid, habitId);
    } catch (err) {
      setError(err as Error);
    }
  };

  return { habits, loading, error, deleteHabit };
}
