// src/context/HabitContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import { Habit } from "../types";
import { v4 as uuidv4 } from "uuid";

interface HabitContextType {
  habits: Habit[];
  addHabit: (name: string, goalMinutes: number) => void;
  incrementHabitTime: (id: string, minutes: number) => void;
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

  // src/context/HabitContext.tsx (Add within HabitProvider)

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        const hasToday = habit.history.some((entry) => entry.date === today);
        if (!hasToday) {
          return {
            ...habit,
            todayMinutes: 0,
            history: [...habit.history, { date: today, minutes: 0 }],
          };
        }
        return habit;
      })
    );
  }, []);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name: string, goalMinutes: number) => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const newHabit: Habit = {
      id: uuidv4(),
      name,
      goalMinutes,
      todayMinutes: 0,
      history: [{ date: today, minutes: 0 }],
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  const incrementHabitTime = (id: string, minutes: number) => {
    const today = new Date().toISOString().split("T")[0];
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id === id) {
          // Check if there's an entry for today
          const todayEntry = habit.history.find(
            (entry) => entry.date === today
          );
          if (todayEntry) {
            todayEntry.minutes += minutes;
          } else {
            habit.history.push({ date: today, minutes });
          }
          return {
            ...habit,
            todayMinutes: habit.todayMinutes + minutes,
            history: [...habit.history],
          };
        }
        return habit;
      })
    );
  };

  const getHabitHistory = (id: string) => {
    const habit = habits.find((h) => h.id === id);
    return habit ? habit.history : [];
  };

  return (
    <HabitContext.Provider
      value={{ habits, addHabit, incrementHabitTime, getHabitHistory }}
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
