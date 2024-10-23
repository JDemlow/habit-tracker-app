// src/types/index.ts

export interface Habit {
  id: string;
  name: string;
  goalMinutes: number;
  todayMinutes: number;
  history: {
    date: string; // ISO date string
    minutes: number;
  }[];
}
