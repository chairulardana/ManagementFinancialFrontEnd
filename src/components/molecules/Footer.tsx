import React from 'react';
import ButtonBeriSaran from './ButtonBeriSaran';
const FooterComponent = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-blue-800 py-8 px-4 text-center text-white text-sm">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-300">
            Sampaikan Aspirasi Anda
          </h3>
          <p className="text-blue-100 mb-4 max-w-xl mx-auto">
            Setiap Saran Anda membantu Developer  menciptakan pengalaman yang lebih baik bagi semua sahabat boros.
          </p>
        </div>
        <ButtonBeriSaran/>
      

      </div>
    </footer>
  );
};

export default FooterComponent;