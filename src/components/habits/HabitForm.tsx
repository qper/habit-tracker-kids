import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Habit, HabitCategory } from '../../types';

interface HabitFormProps {
  onSubmit: (habit: Omit<Habit, 'id' | 'userId'>) => void;
  onCancel: () => void;
}

const EMOJIS = ['🏃', '📚', '💪', '🎨', '😴', '🧘', '🍎', '💧', '🚴', '🎵'];
const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];

export default function HabitForm({ onSubmit, onCancel }: HabitFormProps) {
  const [form, setForm] = useState({
    title: '',
    emoji: '🏃',
    category: 'health' as HabitCategory,
    frequency: 'daily' as const,
    color: '#FF6B6B',
    targetDays: [0, 1, 2, 3, 4, 5, 6],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.title.trim()) {
      onSubmit({
        ...form,
        createdAt: new Date().toISOString(),
        order: 0,
      });
      setForm({ title: '', emoji: '🏃', category: 'health', frequency: 'daily', color: '#FF6B6B', targetDays: [0, 1, 2, 3, 4, 5, 6] });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 border border-pink-100 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Новая привычка</h3>
        <button type="button" onClick={onCancel} className="p-1 hover:bg-gray-100 rounded">
          <X size={20} />
        </button>
      </div>

      {/* Emoji selector */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">Эмодзи</label>
        <div className="grid grid-cols-5 gap-2">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setForm({ ...form, emoji })}
              className={`text-2xl p-2 rounded-lg transition ${
                form.emoji === emoji ? 'bg-pink-100' : 'hover:bg-gray-100'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">Название</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Например: Утренняя зарядка"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Category */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">Категория</label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value as HabitCategory })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="health">Здоровье</option>
          <option value="study">Обучение</option>
          <option value="sport">Спорт</option>
          <option value="creativity">Творчество</option>
          <option value="social">Общение</option>
          <option value="other">Другое</option>
        </select>
      </div>

      {/* Color */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">Цвет</label>
        <div className="flex gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setForm({ ...form, color })}
              className={`w-8 h-8 rounded-full border-2 transition ${
                form.color === color ? 'border-gray-800' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
      >
        <Plus size={20} /> Создать привычку
      </button>
    </form>
  );
}
