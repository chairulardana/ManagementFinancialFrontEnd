import React, { useState } from 'react';
import PemasukanIcons from "../atoms/PemasukanIcons";
import FormPemasukan from '../molecules/PemasukanGroups';

const PemasukanModal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="flex flex-col items-center">
      {/* Tombol ikon */}
      <PemasukanIcons onClick={handleOpenModal} />

      {/* Label di bawah ikon */}
      <span className="mt-2 text-sm font-medium text-gray-700">
        Pemasukan
      </span>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div 
            className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <FormPemasukan onSuccess={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PemasukanModal;
