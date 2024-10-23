// src/context/HabitContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import { Habit } from "../types";
import { v4 as uuidv4 } from "uuid";

interface HabitContextType {
  habits: Habit[];
  addHabit: (name: string, goalMinutes: number) => void;
  incrementHabitTime: (id: string, minutes: number) => void;
  deleteHabit: (id: string) => void;
  getHabitHistory: (id: string) => { date: string; minutes: number }[];
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

  // Add Habit
  const addHabit = (name: string, goalMinutes: number) => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const newHabit: Habit = {
      id: uuidv4(), // Generates a UUID (string)
      name,
      goalMinutes,
      todayMinutes: 0,
      history: [{ date: today, minutes: 0 }],
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  // Increment Habit Time
  const incrementHabitTime = (id: string, minutes: number) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              todayMinutes: habit.todayMinutes + minutes,
              history: updateHabitHistory(habit.history, minutes),
            }
          : habit
      )
    );
  };

  // Delete Habit
  const deleteHabit = (id: string) => {
    setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
  };

  // Get Habit History
  const getHabitHistory = (id: string) => {
    const habit = habits.find((h) => h.id === id);
    return habit ? habit.history : [];
  };

  // Helper function to update habit history
  const updateHabitHistory = (
    history: { date: string; minutes: number }[],
    minutes: number
  ) => {
    const today = new Date().toISOString().split("T")[0];
    const existingEntry = history.find((entry) => entry.date === today);
    if (existingEntry) {
      return history.map((entry) =>
        entry.date === today
          ? { ...entry, minutes: entry.minutes + minutes }
          : entry
      );
    } else {
      return [...history, { date: today, minutes }];
    }
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        incrementHabitTime,
        deleteHabit,
        getHabitHistory,
      }}
    >
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
