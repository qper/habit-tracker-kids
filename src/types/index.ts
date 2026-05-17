// ─── Habit Categories ─────────────────────────────────────────────
export type HabitCategory =
  | 'health'
  | 'study'
  | 'sport'
  | 'creativity'
  | 'social'
  | 'other';

export type HabitFrequency = 'daily' | 'weekly';

// ─── Core Entities ────────────────────────────────────────────────
export interface Habit {
  id: string;
  userId: string;
  title: string;
  emoji: string;
  category: HabitCategory;
  frequency: HabitFrequency;
  /** 0=Sun, 1=Mon … 6=Sat. For daily habits = [0,1,2,3,4,5,6] */
  targetDays: number[];
  color: string; // hex
  createdAt: string; // ISO timestamp
  archivedAt?: string;
  order: number;
}

export interface HabitEntry {
  id: string; // "{habitId}_{date}"
  habitId: string;
  userId: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
  completedAt: string | null; // ISO timestamp or null
}

// ─── Computed / View Models ───────────────────────────────────────
export interface HabitWithStats extends Habit {
  currentStreak: number;
  longestStreak: number;
  completionRate7d: number;  // 0–1
  completionRate30d: number; // 0–1
  todayCompleted: boolean;
  entries: Record<string, HabitEntry>; // keyed by date string
}

export interface DayStats {
  date: string;
  total: number;
  completed: number;
  rate: number;
}

// ─── User Settings ────────────────────────────────────────────────
export interface UserSettings {
  childName: string;
  theme: 'light' | 'dark' | 'system';
  accentColor: string;
}
