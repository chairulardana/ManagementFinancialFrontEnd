import React, { useState } from 'react';
import DataPemasukanIcon from '../atoms/DataDetailPemasukan';

const DetailPemasukan: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="flex flex-col items-center">
      {/* Tombol ikon */}
      <DataPemasukanIcon onClick={handleOpenModal} />
      <span className="mt-2 text-sm font-medium text-gray-700">
        Detail Data Pemasukan
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

export default DetailPemasukan;
