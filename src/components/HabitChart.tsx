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
  const { habits, getHabitHistory } = useHabits();

  const habit = habits.find((h) => h.id === habitId);

  if (!habit) {
    return <p>Habit not found.</p>;
  }

  // Get the last 7 days
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const day = subDays(today, 6 - i);
    return format(day, "yyyy-MM-dd");
  });

  const history = getHabitHistory(habit.id);

  const dataPoints = last7Days.map((date) => {
    const entry = history.find((e) => e.date === date);
    return entry ? entry.minutes : 0;
  });

  const data = {
    labels: last7Days.map((date) => format(new Date(date), "MM/dd")),
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
    maintainAspectRatio: false, // Allows the chart to adjust its height
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className="h-64 p-4 mt-6 bg-white rounded shadow-md sm:h-80">
      <h2 className="mb-4 text-xl font-semibold">
        Progress Over the Last 7 Days
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default HabitChart;
