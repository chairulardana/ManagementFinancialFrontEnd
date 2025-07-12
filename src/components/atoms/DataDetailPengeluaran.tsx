import React from 'react';
import { FaListAlt } from 'react-icons/fa';
import { useNavigate } from '@tanstack/react-router'; // Import useNavigate from @tanstack/react-router or react-router-dom

interface DataPengeluaranIconProps {
  onClick?: () => void;
  className?: string;
}

const DataPengeluaranIcon: React.FC<DataPengeluaranIconProps> = ({ onClick, className }) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle the navigation on click
  const handleClick = () => {
    if (onClick) onClick(); // Call any passed onClick handler
    navigate({ to: '/DataPengeluaran' }); // Navigate to the DataPengeluaran route
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
      aria-label="Data Detail Pengeluaran"
    >
      <div className="bg-white rounded-full p-2">
        <FaListAlt className="text-blue-500 text-2xl" />
      </div>
    </button>
  );
};

export default DataPengeluaranIcon;
