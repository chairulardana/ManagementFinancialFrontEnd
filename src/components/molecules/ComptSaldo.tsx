import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaSyncAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useGetApiPemasukanSaldo } from "@/kubb";

const SaldoComponent = () => {
  const { data, isLoading, isError, refetch } = useGetApiPemasukanSaldo();
  const [saldo, setSaldo] = useState<number | null>(null);
  const [isSaldoVisible, setIsSaldoVisible] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(''); 
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    // Mengambil token utama dan token Google dari sessionStorage
    const token = sessionStorage.getItem('token');
    const Google_Access = sessionStorage.getItem('Access_Google');

    // Verifikasi token utama (misalnya JWT token) untuk mendapatkan username
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUserName(decodedToken?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || 'Pengguna');
      } catch (error) {
        console.error("Error decoding token:", error);
        setUserName('Pengguna');
      }
    }

    // Verifikasi token Google untuk mendapatkan username jika tersedia
    if (Google_Access) {
      try {
        const decodedGoogleToken = JSON.parse(atob(Google_Access.split('.')[1]));
        setUserName(decodedGoogleToken?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || 'Pengguna');
      } catch (error) {
        console.error("Error decoding Google token:", error);
        setUserName('Pengguna');
      }
    }

    // Update saldo jika data berhasil dimuat
    if (data) {
      setSaldo(data?.data?.saldo);
    }
  }, [data]);

  const handleRefresh = () => {
    setRefreshing(true);
    refetch().finally(() => {
      setTimeout(() => setRefreshing(false), 500);
    });
  };

  // Menangani kesalahan saat memuat saldo
  if (isError) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl p-6 md:p-8 mx-auto bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 rounded-3xl shadow-xl"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-100 flex items-center justify-center mb-4 md:mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 md:h-10 md:w-10 text-red-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-red-700 mb-2 md:mb-3">
            Gagal Memuat Saldo
          </h3>
          <p className="text-red-600 mb-4 md:mb-6 max-w-md text-sm md:text-base">
            Terjadi kesalahan saat mencoba mengambil data saldo Anda. Silakan coba beberapa saat lagi.
          </p>
          <button
            onClick={() => refetch()}
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <FaSyncAlt className={refreshing ? "animate-spin" : ""} />
            Coba Lagi
          </button>
        </div>
      </motion.div>
    );
  }

  // Menangani loading state
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl p-6 md:p-8 mx-auto bg-white border border-gray-200 rounded-3xl shadow-xl">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4 md:mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-64 mb-6 md:mb-8"></div>
          <div className="h-14 w-14 bg-gray-200 rounded-full"></div>
        </div>
        <p className="text-center text-gray-500 mt-4 md:mt-6 text-base md:text-lg">Memuat saldo...</p>
      </div>
    );
  }

  // Menampilkan saldo jika berhasil dimuat
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="px-4 py-3 md:py-4 flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-semibold text-blue-800">Halo, <span className="text-indigo-600">{userName}</span>!</h2>
        <button 
          onClick={handleRefresh}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white p-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          aria-label="Refresh saldo"
        >
          <FaSyncAlt className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`} />
        </button>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl"
      >
        <div className="p-6 md:p-8 pb-6 md:pb-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <div className="text-center md:text-left w-full">
              <h2 className="text-lg md:text-xl font-semibold text-blue-100 mb-1 md:mb-2">
                Total Saldo
              </h2>
              <div className="mt-3 md:mt-4 flex flex-col items-center md:items-start">
                <div className="relative flex items-center justify-center gap-2 w-full h-24">
                  {isSaldoVisible ? (
                    <motion.div
                      key="visible"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 w-full"
                    >
                      <span className="text-xl md:text-2xl">Rp</span>
                      <span className="text-3xl md:text-4xl font-bold tracking-tight">
                        {saldo?.toLocaleString('id-ID') || '0'}
                      </span>
                      <button
                        className="md:hidden bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all duration-300 focus:outline-none"
                        onClick={() => setIsSaldoVisible(false)}
                        aria-label="Sembunyikan saldo"
                      >
                        <FaEyeSlash className="h-5 w-5" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 w-full"
                    >
                      <span className="text-xl md:text-2xl">Rp</span>
                      <span className="text-4xl md:text-5xl tracking-widest">••••••</span>
                      <button
                        className="md:hidden bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all duration-300 focus:outline-none"
                        onClick={() => setIsSaldoVisible(true)}
                        aria-label="Tampilkan saldo"
                      >
                        <FaEye className="h-5 w-5" />
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSaldoVisible(!isSaldoVisible)}
              className="hidden md:flex bg-white/20 hover:bg-white/30 p-3 md:p-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label={isSaldoVisible ? "Sembunyikan saldo" : "Tampilkan saldo"}
            >
              {isSaldoVisible ? (
                <FaEyeSlash className="h-6 w-6 md:h-7 md:w-7" />
              ) : (
                <FaEye className="h-6 w-6 md:h-7 md:w-7" />
              )}
            </motion.button>
          </div>
        </div>

        <div className="bg-blue-700/40 px-6 py-3 md:px-8 md:py-4">
          <div className="flex items-center justify-center gap-2 md:gap-3 text-blue-100 text-sm md:text-base">
            <span>Saldo diperbarui secara real-time</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SaldoComponent;
