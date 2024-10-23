// src/types.ts

export interface Habit {
  id: string; // Using string UUIDs
  name: string;
  goalMinutes: number;
  todayMinutes: number;
  history: { date: string; minutes: number }[];
}
