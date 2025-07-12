import { FaBalanceScale } from 'react-icons/fa';
import React from 'react';

interface ButtonPayProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const CompareIcons: React.FC<ButtonPayProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center 
        w-16 h-16 
        bg-blue-500 text-white 
        rounded-full 
        hover:bg-blue-600 
        transition duration-300 
        ${className}
      `}
      aria-label="Balance"
    >
      {/* Circle wrapper di belakang ikon */}
      <div className="bg-white rounded-full p-2">
        <FaBalanceScale className="text-blue-500 text-2xl" />
      </div>
      {children}
    </button>
  );
};

export default CompareIcons;
