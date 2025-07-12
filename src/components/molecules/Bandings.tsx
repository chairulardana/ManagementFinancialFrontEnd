import React, { useState } from 'react';
import BandingsIcon from '../atoms/BandingsLogo';

const BandingDetail: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="flex flex-col items-center">
      {/* Tombol ikon */}
      <BandingsIcon onClick={handleOpenModal} />
      <span className="mt-2 text-sm font-medium text-gray-700">
        Opsi Banding Data 
      </span>

      {/* Modal */}
      {showModal && (
        <div 
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-lg p-6 w-80 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
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

export default BandingDetail;