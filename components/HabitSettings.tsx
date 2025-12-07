'use client';

import { useState, useEffect } from 'react';
import { Gear, Plus, X } from '@phosphor-icons/react';

interface HabitSettingsProps {
  habits: string[];
  onUpdate: (habits: string[]) => void;
}

export default function HabitSettings({ habits, onUpdate }: HabitSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localHabits, setLocalHabits] = useState(habits);
  const [newHabit, setNewHabit] = useState('');

  useEffect(() => {
    setLocalHabits(habits);
  }, [habits]);

  const addHabit = () => {
    if (newHabit.trim() && localHabits.length < 10) {
      setLocalHabits([...localHabits, newHabit.trim()]);
      setNewHabit('');
    }
  };

  const removeHabit = (index: number) => {
    setLocalHabits(localHabits.filter((_, i) => i !== index));
  };

  const saveHabits = () => {
    if (localHabits.length > 0) {
      onUpdate(localHabits);
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-full shadow-lg border border-white/20 dark:border-gray-700/30 hover:scale-110 transition-transform"
        aria-label="Settings"
      >
        <Gear size={24} className="text-gray-700 dark:text-gray-300" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/20 dark:border-gray-700/30">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Manage Habits
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-700/30"
                >
                  <X size={24} className="text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
              {localHabits.map((habit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white/40 dark:bg-gray-800/40 rounded-xl"
                >
                  <span className="flex-1 text-gray-900 dark:text-white font-medium">
                    {habit}
                  </span>
                  <button
                    onClick={() => removeHabit(index)}
                    className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    <X size={18} className="text-red-600 dark:text-red-400" />
                  </button>
                </div>
              ))}

              {localHabits.length < 10 && (
                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={newHabit}
                    onChange={(e) => setNewHabit(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addHabit()}
                    placeholder="Add new habit..."
                    className="flex-1 px-4 py-2 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-white/20 dark:border-gray-700/30 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  />
                  <button
                    onClick={addHabit}
                    className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors"
                  >
                    <Plus size={20} className="text-green-600 dark:text-green-400" />
                  </button>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-white/20 dark:border-gray-700/30">
              <button
                onClick={saveHabits}
                disabled={localHabits.length === 0}
                className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
              >
                Save Habits
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

