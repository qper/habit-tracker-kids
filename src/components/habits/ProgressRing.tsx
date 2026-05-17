import React from 'react';

interface ProgressRingProps {
  completed: number;
  total: number;
  size?: number;
}

export default function ProgressRing({ completed, total, size = 60 }: ProgressRingProps) {
  const circumference = 2 * Math.PI * (size / 2 - 6);
  const offset = circumference - (completed / total) * circumference;
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="flex flex-col items-center">
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 6}
            fill="none"
            stroke="#f3e8e8"
            strokeWidth="4"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 6}
            fill="none"
            stroke="#ff6b6b"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.3s ease',
            }}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span className="text-sm font-bold text-gray-700">{percentage}%</span>
        </div>
      </div>
    </div>
  );
}
