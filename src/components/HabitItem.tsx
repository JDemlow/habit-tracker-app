// src/components/HabitItem.tsx

import React from "react";
import { Link } from "react-router-dom";
import { Habit } from "../types";
import Button from "./Button";
import ProgressBar from "./ProgressBar";
import { useHabits } from "../context/HabitContext";

interface HabitItemProps {
  habit: Habit;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit }) => {
  const { incrementHabitTime } = useHabits();

  const handleIncrement = () => {
    incrementHabitTime(habit.id, 5); // Increment by 5 minutes
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <Link to={`/habit/${habit.id}`}>
        <h2 className="text-xl font-semibold mb-2">{habit.name}</h2>
      </Link>
      <p className="mb-2">Goal: {habit.goalMinutes} minutes/day</p>
      <ProgressBar current={habit.todayMinutes} goal={habit.goalMinutes} />
      <div className="mt-4">
        <Button onClick={handleIncrement}>+5 Minutes</Button>
      </div>
    </div>
  );
};

export default HabitItem;
