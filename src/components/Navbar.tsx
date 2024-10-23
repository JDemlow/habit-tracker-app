// src/components/Navbar.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="p-4 text-white bg-blue-600">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/" className="text-xl font-bold">
          Habit Tracker
        </Link>
        <button
          className="block md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${isOpen ? "block" : "hidden"}`}
        >
          <div className="flex flex-col mt-4 md:flex-row md:space-x-6 md:mt-0">
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
      </div>
    </nav>
  );
};

export default Navbar;
