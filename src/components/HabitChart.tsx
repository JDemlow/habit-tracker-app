// src/components/HabitChart.tsx

import React from "react";
import { Line } from "react-chartjs-2";
import { useHabits } from "../context/HabitContext";
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { format, subDays } from "date-fns";

Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

interface HabitChartProps {
  habitId?: string;
}

const HabitChart: React.FC<HabitChartProps> = ({ habitId }) => {
  const { habits } = useHabits();

  const habit = habits.find((h) => h.id === habitId);

  if (!habit) {
    return <p>Habit not found.</p>;
  }

  // For demonstration, we'll simulate past 7 days data
  const labels = Array.from({ length: 7 }, (_, i) =>
    format(subDays(new Date(), 6 - i), "MM/dd")
  );

  const dataPoints = labels.map(() =>
    Math.floor(Math.random() * habit.goalMinutes)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Minutes Spent",
        data: dataPoints,
        fill: false,
        borderColor: "rgb(34, 197, 94)", // Green-500
        tension: 0.1,
      },
      {
        label: "Goal",
        data: Array(7).fill(habit.goalMinutes),
        borderColor: "rgb(59, 130, 246)", // Blue-500
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="mt-6 bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Progress Over the Last 7 Days
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default HabitChart;
