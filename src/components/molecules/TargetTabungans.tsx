import React, { useState } from 'react';
import TargetTabunganIcon from '../atoms/TargetTabunganIcon';

const TargetTabungan: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="flex flex-col items-center">
      {/* Tombol ikon */}
      <TargetTabunganIcon onClick={handleOpenModal} />
      <span className="mt-2 text-sm font-medium text-gray-700">
   Target Tabungan
      </span>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={handleCloseModal}
            >
              &times;
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default TargetTabungan;
