'use client';

import { useState, useEffect } from 'react';
import { format, getDaysInMonth, startOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';

const TOTAL_HABITS = 5;

interface DayData {
  date: Date;
  completed: number; // 0-5
}

export default function HabitTracker() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [habits, setHabits] = useState<Record<string, number>>({});

  // Load habits from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('habit-tracker');
    if (saved) {
      setHabits(JSON.parse(saved));
    }
  }, []);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('habit-tracker', JSON.stringify(habits));
  }, [habits]);

  const daysInMonth = getDaysInMonth(currentMonth);
  const monthStart = startOfMonth(currentMonth);
  const days = eachDayOfInterval({
    start: monthStart,
    end: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), daysInMonth),
  });

  const getIntensity = (completed: number): string => {
    const percentage = completed / TOTAL_HABITS;
    if (percentage === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (percentage <= 0.2) return 'bg-green-200 dark:bg-green-900';
    if (percentage <= 0.4) return 'bg-green-300 dark:bg-green-700';
    if (percentage <= 0.6) return 'bg-green-400 dark:bg-green-600';
    if (percentage <= 0.8) return 'bg-green-500 dark:bg-green-500';
    return 'bg-green-600 dark:bg-green-400';
  };

  const handleBoxClick = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const current = habits[dateKey] || 0;
    const next = (current + 1) % (TOTAL_HABITS + 1);
    
    setHabits((prev) => ({
      ...prev,
      [dateKey]: next,
    }));
  };

  const getTooltipText = (date: Date, completed: number) => {
    const dateStr = format(date, 'MMM d, yyyy');
    return `${completed}/${TOTAL_HABITS} habits completed on ${dateStr}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {format(currentMonth, 'MMMM yyyy')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Click a box to cycle through habit completions (0-{TOTAL_HABITS})
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-7 gap-2">
            {/* Day labels */}
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div
                key={`${day}-${i}`}
                className="text-xs text-gray-500 dark:text-gray-400 text-center pb-2 font-medium"
              >
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: monthStart.getDay() }).map((_, i) => (
              <div key={`empty-${i}`} className="w-4 h-4" />
            ))}

            {/* Calendar days */}
            {days.map((day) => {
              const dateKey = format(day, 'yyyy-MM-dd');
              const completed = habits[dateKey] || 0;
              const intensity = getIntensity(completed);
              const isCurrentDay = isToday(day);

              return (
                <div
                  key={dateKey}
                  className="relative group"
                  title={getTooltipText(day, completed)}
                >
                  <button
                    onClick={() => handleBoxClick(day)}
                    className={`
                      w-4 h-4 rounded transition-all duration-200
                      ${intensity}
                      ${isCurrentDay ? 'ring-2 ring-blue-500 dark:ring-blue-400 ring-offset-1 ring-offset-white dark:ring-offset-black' : ''}
                      hover:scale-110 hover:z-10
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                    `}
                    aria-label={getTooltipText(day, completed)}
                  />
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity shadow-lg">
                    {getTooltipText(day, completed)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-10 text-xs">
          <span className="text-gray-500 dark:text-gray-500">Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded bg-gray-100 dark:bg-gray-800" />
            <div className="w-3 h-3 rounded bg-green-200 dark:bg-green-900" />
            <div className="w-3 h-3 rounded bg-green-300 dark:bg-green-700" />
            <div className="w-3 h-3 rounded bg-green-400 dark:bg-green-600" />
            <div className="w-3 h-3 rounded bg-green-500 dark:bg-green-500" />
            <div className="w-3 h-3 rounded bg-green-600 dark:bg-green-400" />
          </div>
          <span className="text-gray-500 dark:text-gray-500">More</span>
        </div>

        {/* Stats */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-white">
              {Object.values(habits).reduce((sum, count) => sum + count, 0)}
            </span>{' '}
            habits completed this month
          </p>
        </div>
      </div>
    </div>
  );
}

