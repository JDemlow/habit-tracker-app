// src/pages/HabitDetails.tsx

import React from "react";
import { useParams } from "react-router-dom";
import HabitInfo from "../components/HabitInfo";
import HabitChart from "../components/HabitChart";

const HabitDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <HabitInfo habitId={id} />
      <HabitChart habitId={id} />
    </div>
  );
};

export default HabitDetails;
