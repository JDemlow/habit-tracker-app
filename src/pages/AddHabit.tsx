// src/pages/AddHabit.tsx

import React from "react";
import HabitForm from "../components/HabitForm";

const AddHabit: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add New Habit</h1>
      <HabitForm />
    </div>
  );
};

export default AddHabit;
