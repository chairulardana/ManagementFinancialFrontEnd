import { useState } from "react";
import { FormPengeluaran } from "../molecules/PengeluaranGroups";
import PengeluaranIcons from "../atoms/PengeluaranIcons";

export function PengeluaranModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center">
        <PengeluaranIcons onClick={() => setShowModal(true)} />
        <span className="mt-1 text-sm font-medium text-gray-700">Pengeluaran</span>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setShowModal(false)}
          />
          
          <div className="relative z-10 w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 animate-fade-in-up">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Tambah Pengeluaran Baru</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <FormPengeluaran onClose={() => setShowModal(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
