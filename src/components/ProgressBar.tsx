// src/components/ProgressBar.tsx

import React from "react";

interface ProgressBarProps {
  current: number;
  goal: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, goal }) => {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className="w-full bg-gray-300 rounded h-4">
      <div
        className="bg-green-500 h-4 rounded"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
