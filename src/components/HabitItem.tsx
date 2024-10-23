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
  const { incrementHabitTime, deleteHabit } = useHabits();

  const handleIncrement = () => {
    incrementHabitTime(habit.id, 5); // Increment by 5 minutes
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete the habit "${habit.name}"?`
      )
    ) {
      deleteHabit(habit.id);
    }
  };

  return (
    <div className="flex flex-col p-4 bg-white rounded shadow-md sm:flex-row sm:justify-between sm:items-center">
      <div>
        <Link to={`/habit/${habit.id}`}>
          <h2 className="mb-2 text-xl font-semibold">{habit.name}</h2>
        </Link>
        <p className="mb-2">Goal: {habit.goalMinutes} minutes/day</p>
        <ProgressBar current={habit.todayMinutes} goal={habit.goalMinutes} />
      </div>
      <div className="flex mt-4 space-x-2 sm:mt-0">
        <Button onClick={handleIncrement}>+5 Minutes</Button>
        <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default HabitItem;
