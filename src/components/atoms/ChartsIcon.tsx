import React from 'react';
import { FiPieChart  } from 'react-icons/fi';
import { useNavigate } from '@tanstack/react-router'; // Import useNavigate from @tanstack/react-router or react-router-dom

interface ChartsIconProps {
  onClick?: () => void;
  className?: string;
}

const ChartsIcon: React.FC<ChartsIconProps> = ({ onClick, className }) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle the navigation on click
  const handleClick = () => {
    if (onClick) onClick(); // Call any passed onClick handler
    navigate({to: '/ChartsPages'}); // Navigate to the ChartsPages route
  };

  return (
    <button
      onClick={handleClick} // Use the handleClick function
      className={`
        flex items-center justify-center
        w-16 h-16
        bg-blue-500 text-white
        rounded-full
        hover:bg-blue-600
        transition duration-300
        ${className || ""}
      `}
      aria-label="Charts"
    >
      <div className="bg-white rounded-full p-2">
        <FiPieChart  className="text-blue-500 text-2xl" />
      </div>
    </button>
  );
};

export default ChartsIcon;
