// src/components/HabitInfo.tsx

import React from "react";
import { useHabits } from "../context/HabitContext";

interface HabitInfoProps {
  habitId?: string;
}

const HabitInfo: React.FC<HabitInfoProps> = ({ habitId }) => {
  const { habits, incrementHabitTime } = useHabits();

  const habit = habits.find((h) => h.id === habitId);

  if (!habit) {
    return <p>Habit not found.</p>;
  }

  const handleIncrement = () => {
    incrementHabitTime(habit.id, 5); // Increment by 5 minutes
  };

  return (
    <div className="p-4 mb-6 bg-white rounded shadow-md">
      <h2 className="mb-2 text-2xl font-semibold">{habit.name}</h2>
      <p className="mb-2">Daily Goal: {habit.goalMinutes} minutes</p>
      <p className="mb-4">Today: {habit.todayMinutes} minutes</p>
      <button
        onClick={handleIncrement}
        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
      >
        +5 Minutes
      </button>
    </div>
  );
};

export default HabitInfo;
