import React from 'react';
import { FaPiggyBank } from 'react-icons/fa';
import { useNavigate } from '@tanstack/react-router'; // Import useNavigate for routing

// Update the interface to accept onClick as a prop
interface TargetTabunganIconProps {
  onClick: () => void;  // Explicitly add onClick prop here
  className?: string;
}

const TargetTabunganIcon: React.FC<TargetTabunganIconProps> = ({ onClick, className }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate({to : '/TargetTabungan'});
    onClick();
  };

  return (
    <button
      onClick={handleClick} 
      className={`
        flex items-center justify-center
        w-16 h-16
        bg-blue-500 text-white
        rounded-full
        hover:bg-blue-600
        transition duration-300
        ${className || ''} // Add any additional custom classes
      `}
      aria-label="Target Tabungan"
    >
      <div className="relative bg-white rounded-full p-2">
        <FaPiggyBank className="text-blue-500 text-2xl" />
        
      </div>
    </button>
  );
};

export default TargetTabunganIcon;
