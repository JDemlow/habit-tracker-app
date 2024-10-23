// src/context/HabitContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import { Habit } from "../types";
import { v4 as uuidv4 } from "uuid";

interface HabitContextType {
  habits: Habit[];
  addHabit: (name: string, goalMinutes: number) => void;
  incrementHabitTime: (id: string, minutes: number) => void;
  // Add more functions as needed
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [habits, setHabits] = useState<Habit[]>([]);

  // Load habits from localStorage on mount
  useEffect(() => {
    const storedHabits = localStorage.getItem("habits");
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
  }, []);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name: string, goalMinutes: number) => {
    const newHabit: Habit = {
      id: uuidv4(),
      name,
      goalMinutes,
      todayMinutes: 0,
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  const incrementHabitTime = (id: string, minutes: number) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id
          ? { ...habit, todayMinutes: habit.todayMinutes + minutes }
          : habit
      )
    );
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit, incrementHabitTime }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = (): HabitContextType => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return context;
};
