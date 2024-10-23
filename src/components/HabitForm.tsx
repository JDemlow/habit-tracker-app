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
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Habit Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="e.g., Listen to Spanish Podcast"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Daily Goal (minutes)</label>
        <input
          type="number"
          value={goalMinutes}
          onChange={(e) => setGoalMinutes(Number(e.target.value))}
          className="w-full border rounded px-3 py-2"
          min={1}
          required
        />
      </div>
      <Button type="submit">Add Habit</Button>
    </form>
  );
};

export default HabitForm;
