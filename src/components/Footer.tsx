// src/components/Footer.tsx

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 text-center p-4">
      <p>
        &copy; {new Date().getFullYear()} Habit Tracker. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
