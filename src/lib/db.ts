import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  type Unsubscribe,
  type DocumentData,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Habit, HabitEntry, UserSettings } from '../types';
import { format, subDays } from 'date-fns';

// ─── Collection References ────────────────────────────────────────

export const habitsRef = (userId: string) =>
  collection(db, 'users', userId, 'habits');

export const habitRef = (userId: string, habitId: string) =>
  doc(db, 'users', userId, 'habits', habitId);

export const entriesRef = (userId: string) =>
  collection(db, 'users', userId, 'entries');

export const entryRef = (userId: string, entryId: string) =>
  doc(db, 'users', userId, 'entries', entryId);

/** Deterministic entry ID from habitId + date */
export const makeEntryId = (habitId: string, date: string): string =>
  `${habitId}_${date}`;

// ─── Habits ───────────────────────────────────────────────────────

/** One-time fetch of all habits (used as fallback) */
export const fetchHabits = async (userId: string): Promise<Habit[]> => {
  const q = query(habitsRef(userId), orderBy('order'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Habit));
};

/** Real-time subscription to all habits */
export const subscribeToHabits = (
  userId: string,
  onData: (habits: Habit[]) => void,
  onError?: (err: Error) => void,
): Unsubscribe => {
  const q = query(habitsRef(userId), orderBy('order'));
  return onSnapshot(
    q,
    snap => onData(snap.docs.map(d => ({ id: d.id, ...d.data() } as Habit))),
    onError,
  );
};

/** Create a new habit */
export const createHabit = async (
  userId: string,
  habit: Omit<Habit, 'id' | 'userId'>,
): Promise<string> => {
  const ref = doc(habitsRef(userId));
  await setDoc(ref, { ...habit, userId });
  return ref.id;
};

/** Update an existing habit */
export const updateHabit = async (
  userId: string,
  habitId: string,
  updates: Partial<Omit<Habit, 'id' | 'userId'>>,
): Promise<void> => {
  await updateDoc(habitRef(userId, habitId), updates as DocumentData);
};

/** Permanently delete a habit */
export const deleteHabit = async (
  userId: string,
  habitId: string,
): Promise<void> => {
  await deleteDoc(habitRef(userId, habitId));
};

// ─── Entries ──────────────────────────────────────────────────────

/** Real-time subscription to entries within the last N days */
export const subscribeToEntries = (
  userId: string,
  days: number,
  onData: (entries: HabitEntry[]) => void,
  onError?: (err: Error) => void,
): Unsubscribe => {
  const dateFrom = format(subDays(new Date(), days), 'yyyy-MM-dd');
  const q = query(entriesRef(userId), where('date', '>=', dateFrom));
  return onSnapshot(
    q,
    snap => onData(snap.docs.map(d => ({ id: d.id, ...d.data() } as HabitEntry))),
    onError,
  );
};

/** Toggle a habit entry for a given date */
export const toggleEntry = async (
  userId: string,
  habitId: string,
  date: string,
  currentlyCompleted: boolean,
): Promise<void> => {
  const id = makeEntryId(habitId, date);
  const ref = entryRef(userId, id);

  if (!currentlyCompleted) {
    // Mark complete
    await setDoc(ref, {
      id,
      habitId,
      userId,
      date,
      completed: true,
      completedAt: new Date().toISOString(),
    } satisfies HabitEntry);
  } else {
    // Mark incomplete — preserve the document for history
    await setDoc(ref, {
      id,
      habitId,
      userId,
      date,
      completed: false,
      completedAt: null,
    } satisfies HabitEntry);
  }
};

// ─── User Settings ────────────────────────────────────────────────

const settingsRef = (userId: string) =>
  doc(db, 'users', userId, 'settings', 'preferences');

export const fetchSettings = async (userId: string): Promise<Partial<UserSettings> | null> => {
  const snap = await getDoc(settingsRef(userId));
  return snap.exists() ? (snap.data() as Partial<UserSettings>) : null;
};

export const saveSettings = async (
  userId: string,
  settings: Partial<UserSettings>,
): Promise<void> => {
  await setDoc(settingsRef(userId), settings, { merge: true });
};
