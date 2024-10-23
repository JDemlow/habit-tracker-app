// src/pages/Dashboard.tsx

import React from "react";
import HabitList from "../components/HabitList";
import TotalTimeTracked from "../components/TotalTimeTracked";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <TotalTimeTracked />
      <HabitList />
    </div>
  );
};

export default Dashboard;
