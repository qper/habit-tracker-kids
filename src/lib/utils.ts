import { format, differenceInDays, startOfDay, endOfDay, isWithinInterval } from 'date-fns';

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'yyyy-MM-dd');
}

export function calculateStreak(
  entries: Array<{ date: string; completed: boolean }>,
  habitId?: string,
): number {
  if (entries.length === 0) return 0;

  const sortedEntries = entries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  let streak = 0;
  let currentDate = startOfDay(new Date());

  for (const entry of sortedEntries) {
    const entryDate = startOfDay(new Date(entry.date));
    const daysDiff = differenceInDays(currentDate, entryDate);

    if (daysDiff === 0 || daysDiff === 1) {
      if (entry.completed) {
        streak++;
        currentDate = entryDate;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  return streak;
}

export function getCompletionRate(
  entries: Array<{ date: string; completed: boolean }>,
  days: number,
): number {
  if (entries.length === 0) return 0;

  const cutoffDate = startOfDay(new Date(Date.now() - days * 24 * 60 * 60 * 1000));
  const relevantEntries = entries.filter((e) => new Date(e.date) >= cutoffDate);

  if (relevantEntries.length === 0) return 0;

  const completed = relevantEntries.filter((e) => e.completed).length;
  return completed / relevantEntries.length;
}
