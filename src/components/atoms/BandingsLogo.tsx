import React, { useState } from 'react';
import { FaBalanceScale } from 'react-icons/fa';
import { useNavigate } from '@tanstack/react-router';
import Swal from 'sweetalert2'; // Import SweetAlert2

interface TargetTabunganIconProps {
  onClick?: () => void;
  className?: string;
}

const BandingsIcon: React.FC<TargetTabunganIconProps> = ({ onClick, className }) => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    // Show the warning modal with SweetAlert2
    Swal.fire({
      title: 'Perhatian!',
      text: 'Pastikan anda memiliki data pengeluaran sebelum anda mencoba menggunakan fitur ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        // Navigate to the target page if confirmed
        navigate({ to: '/Bandingss' });
      }
    });

    // Call the onClick prop if provided
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <button
        onClick={handleIconClick} 
        className={`
          flex items-center justify-center
          w-16 h-16
          bg-blue-500 text-white
          rounded-full
          hover:bg-blue-600
          transition duration-300
          ${className || ''}
        `}
        aria-label="Bandings Icon"
      >
        <div className="relative bg-white rounded-full p-2">
          <FaBalanceScale className="text-blue-500 text-2xl" />
        </div>
      </button>
    </>
  );
};

export default BandingsIcon;
