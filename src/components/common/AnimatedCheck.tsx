import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface AnimatedCheckProps {
  isChecked: boolean;
  size?: number;
}

export default function AnimatedCheck({ isChecked, size = 40 }: AnimatedCheckProps) {
  const [showCheck, setShowCheck] = useState(isChecked);

  useEffect(() => {
    setShowCheck(isChecked);
  }, [isChecked]);

  return (
    <div
      className={`flex items-center justify-center rounded-full transition-all ${
        showCheck
          ? 'bg-green-500 text-white'
          : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
      }`}
      style={{
        width: size,
        height: size,
        animation: showCheck ? 'bounce 0.4s ease' : 'none',
      }}
    >
      {showCheck && <Check size={size * 0.6} strokeWidth={3} />}
    </div>
  );
}

// Add to index.css
const style = document.createElement('style');
style.textContent = `
  @keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;
document.head.appendChild(style);
