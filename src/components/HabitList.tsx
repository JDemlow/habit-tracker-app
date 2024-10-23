// src/components/HabitList.tsx

import React from "react";
import HabitItem from "./HabitItem";
import { useHabits } from "../context/HabitContext";

const HabitList: React.FC = () => {
  const { habits } = useHabits();

  if (habits.length === 0) {
    return <p>You have no habits. Start by adding one!</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </div>
  );
};

export default HabitList;
