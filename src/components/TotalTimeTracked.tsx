// src/components/TotalTimeTracked.tsx

import React from "react";
import { useHabits } from "../context/HabitContext";

const TotalTimeTracked: React.FC = () => {
  const { habits } = useHabits();

  // For demonstration, we'll sum today's minutes
  const totalToday = habits.reduce((sum, habit) => sum + habit.todayMinutes, 0);

  // Similarly, you can calculate weekly, monthly, yearly totals
  // This would require storing historical data

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Total Time Tracked Today</h2>
      <p className="text-3xl text-green-600">{totalToday} minutes</p>
      {/* You can add more stats for week, month, year */}
    </div>
  );
};

export default TotalTimeTracked;
