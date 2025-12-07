'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Check } from '@phosphor-icons/react';
import { format } from 'date-fns';

interface HabitModalProps {
  date: Date;
  checkedHabits: boolean[]; // Array of which habits are checked
  totalHabits: number;
  habits: string[];
  onClose: () => void;
  onUpdate: (date: Date, checkedHabits: boolean[]) => void;
}

export default function HabitModal({
  date,
  checkedHabits: initialCheckedHabits,
  totalHabits,
  habits,
  onClose,
  onUpdate,
}: HabitModalProps) {
  // Initialize with the provided checked habits array
  const [checkedHabits, setCheckedHabits] = useState<boolean[]>(initialCheckedHabits);

  // Update when the date or initial checked habits change
  useEffect(() => {
    setCheckedHabits(initialCheckedHabits);
  }, [initialCheckedHabits]);

  // Memoize the update callback to avoid unnecessary re-renders
  const handleUpdate = useCallback(
    (newCheckedHabits: boolean[]) => {
      onUpdate(date, newCheckedHabits);
    },
    [date, onUpdate]
  );

  // Update parent when checked habits change
  useEffect(() => {
    // Use requestAnimationFrame to ensure this runs after render
    const frame = requestAnimationFrame(() => {
      handleUpdate(checkedHabits);
    });
    return () => cancelAnimationFrame(frame);
  }, [checkedHabits, handleUpdate]);

  const toggleHabit = (index: number) => {
    setCheckedHabits((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const completedCount = checkedHabits.filter(Boolean).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Glass Modal */}
      <div
        className="relative w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20 dark:border-gray-700/30">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {format(date, 'EEEE, MMMM d')}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {completedCount} of {totalHabits} habits completed
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-700/30 transition-colors"
            aria-label="Close"
          >
            <X size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Habits List */}
        <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
          {habits.map((habit, index) => {
            const isChecked = checkedHabits[index] || false;
            return (
              <button
                key={index}
                onClick={() => toggleHabit(index)}
                className={`
                  w-full flex items-center gap-4 p-4 rounded-xl
                  transition-all duration-200
                  ${
                    isChecked
                      ? 'bg-green-500/20 dark:bg-green-500/20 border-2 border-green-500/50'
                      : 'bg-white/40 dark:bg-gray-800/40 border-2 border-transparent hover:bg-white/60 dark:hover:bg-gray-700/40'
                  }
                `}
              >
                <div
                  className={`
                    flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center
                    transition-all duration-200
                    ${
                      isChecked
                        ? 'bg-green-500 dark:bg-green-400'
                        : 'bg-white/60 dark:bg-gray-700/60 border-2 border-gray-300 dark:border-gray-600'
                    }
                  `}
                >
                  {isChecked && (
                    <Check
                      size={16}
                      weight="bold"
                      className="text-white dark:text-gray-900"
                    />
                  )}
                </div>
                <span
                  className={`
                    flex-1 text-left font-medium
                    transition-colors duration-200
                    ${
                      isChecked
                        ? 'text-gray-900 dark:text-white line-through'
                        : 'text-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  {habit}
                </span>
              </button>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="px-6 pb-6">
          <div className="h-2 bg-white/40 dark:bg-gray-800/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300 rounded-full"
              style={{ width: `${(completedCount / totalHabits) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
