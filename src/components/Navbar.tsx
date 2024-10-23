// src/components/Navbar.tsx

import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold text-xl">
          Habit Tracker
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/add" className="hover:underline">
            Add Habit
          </Link>
          <Link to="/settings" className="hover:underline">
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
