import  { useState, useRef, useEffect } from 'react';

const LogoButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  
  const handleLogoClick = () => {
    setShowPopup(!showPopup);
  };

  const handleSupportClick = () => {
    window.open("https://saweria.co/ChairulArdana", "_blank");
    setShowPopup(false);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end z-50">
      {/* Popup */}
      {showPopup && (
        <div 
          ref={popupRef}
          className="absolute bottom-full right-0 mb-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 animate-fade-in-up"
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-bold text-gray-800">Support Developer!</h3>
                <p className="text-xs text-gray-600 mt-1">
                  Donasi lo sangat berarti, terima kasih udah peduli!
                </p>
                <button
                  onClick={handleSupportClick}
                  className="mt-3 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] text-sm shadow-md"
                >
                  Klik Support Me
                </button>
              </div>
            </div>
          </div>
          
          {/* Arrow pointing to button */}
          <div className="absolute bottom-0 right-4 transform translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
        </div>
      )}

      {/* Teks "SUPPORT DEVELOPER" hanya muncul jika showPopup false */}
      {!showPopup && (
        <div 
          onClick={handleLogoClick}
          className="text-xs font-medium text-gray-700 mb-1 cursor-pointer px-2 py-1 bg-white/80 backdrop-blur-sm rounded-lg shadow-md transition-all hover:scale-105 hover:text-blue-600"
        >
          SUPPORT DEVELOPER
        </div>
      )}

      {/* Tombol Logo */}
      <div 
        onClick={handleLogoClick} 
        className="w-16 h-16 rounded-full overflow-hidden cursor-pointer shadow-lg transition-transform hover:scale-110 relative"
      >
        <img 
          src="/Logoo.svg" 
          alt="Logo" 
          className="w-full h-full object-cover" 
        />
      </div>
    </div>
  );
};

export default LogoButton;
