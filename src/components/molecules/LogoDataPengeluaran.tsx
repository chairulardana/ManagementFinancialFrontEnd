import React, { useState } from 'react';
import DataPengeluaranIcon from '../atoms/DataDetailPengeluaran'; 

const DetailPengeluaran: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="flex flex-col items-center">
      {/* Tombol ikon */}
      <DataPengeluaranIcon onClick={handleOpenModal} />
      <span className="mt-2 text-sm font-medium text-gray-700">
        Detail Data Pengeluaran
      </span>

      {/* Modal */}
      {showModal && (
        <div 
          onClick={handleCloseModal}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
          >
            <button
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

export default DetailPengeluaran;
