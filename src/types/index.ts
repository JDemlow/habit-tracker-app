// src/types/index.ts

export interface Habit {
  id: string;
  name: string;
  goalMinutes: number;
  todayMinutes: number;
  // You can expand this with weekly, monthly data as needed
}
