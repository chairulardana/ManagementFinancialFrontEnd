import React from 'react';
import { GiReceiveMoney } from 'react-icons/gi';

interface ButtonPlusProps {
  onClick: () => void;
}

const PemasukanIcons: React.FC<ButtonPlusProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center justify-center
        w-16 h-16
        bg-blue-500 text-white
        rounded-full
        hover:bg-blue-600
        transition duration-300
      "
      aria-label="Add"
    >
      {/* Bungkus ikon dengan div lingkaran putih */}
      <div className="bg-white rounded-full p-2">
        <GiReceiveMoney className="text-blue-500 text-2xl" />
      </div>
    </button>
  );
};

export default PemasukanIcons;
