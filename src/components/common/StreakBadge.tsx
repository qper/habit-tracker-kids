import React from 'react';
import { Flame } from 'lucide-react';

interface StreakBadgeProps {
  streak: number;
}

export default function StreakBadge({ streak }: StreakBadgeProps) {
  if (streak === 0) return null;

  return (
    <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-sm font-semibold">
      <Flame size={16} />
      <span>{streak} дн.</span>
    </div>
  );
}
