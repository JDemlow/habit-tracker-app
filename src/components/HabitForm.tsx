// src/components/HabitForm.tsx

import React, { useState } from "react";
import Button from "./Button";
import { useHabits } from "../context/HabitContext";

const HabitForm: React.FC = () => {
  const [name, setName] = useState("");
  const [goalMinutes, setGoalMinutes] = useState(30);
  const { addHabit } = useHabits();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") return;

    addHabit(name, goalMinutes);
    setName("");
    setGoalMinutes(30);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block mb-2 text-gray-700" htmlFor="habit-name">
          Habit Name
        </label>
        <input
          id="habit-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Listen to Spanish Podcast"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700" htmlFor="goal-minutes">
          Daily Goal (minutes)
        </label>
        <input
          id="goal-minutes"
          type="number"
          value={goalMinutes}
          onChange={(e) => setGoalMinutes(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          min={1}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Add Habit
      </Button>
    </form>
  );
};

export default HabitForm;
