import React, { useEffect } from "react";
import { useGetApiSmartassistantSaran } from "@/kubb";

const SaranGenZAngry: React.FC = () => {
  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useGetApiSmartassistantSaran({
    query: { refetchOnWindowFocus: false },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const saran = response?.data?.saran;

  // Animasi loading
  const LoadingIndicator = () => (
    <div className="flex flex-col items-center py-6">
      <div className="flex space-x-1 mb-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-orange-300 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
      <p className="text-sm text-orange-200 text-center">
        Lagi nyiapin saran biar lo gak boncos... 🤨
      </p>
    </div>
  );

  // Tampil error
  const ErrorDisplay = () => (
    <div className="bg-red-200 p-3 rounded-lg mb-4">
      <p className="font-bold text-red-700 text-center">
        ERROR! Saran ngadat 😬
      </p>
    </div>
  );

  // Tampil saran
  const SaranDisplay = ({ saran }: { saran: string }) => (
    <div className="bg-white bg-opacity-80 p-4 rounded-lg">
      <p className="text-gray-800 text-base sm:text-lg whitespace-pre-line mb-0.5">
        {saran.replace(/😎|😡|⚠️|🔥|💥/g, "")}
      </p>
      <p className="mt-1 text-xs text-purple-700 text-left font-semibold leading-tight">
        Stop ngeluh 'gaji abis duluan'—lo yang bego,{" "}
        <span className="whitespace-nowrap">bukan sistemnya</span>
      </p>
    </div>
  );

  // Tampil jika belum pernah input sama sekali
  const EmptySaran = () => (
    <div className="text-center py-6">
      <p className="text-sm text-orange-200 font-medium">
        Anda belum melakukan pemasukan atau pengeluaran apapun.
      </p>
      <p className="text-xs text-orange-300 mt-1">
        Yuk, input dulu pemasukan & pengeluaranmu biar dapet saran!
      </p>
    </div>
  );

  return (
    <div className="w-full max-w-sm mx-auto my-6 p-4 bg-gradient-to-br from-purple-700 to-blue-500 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="flex items-center mb-4">
     <h1 className="flex-1 text-center text-xl sm:text-2xl font-extrabold text-white">
          SLAP-SAVINGS ALERT
        </h1>
      </div>

      {/* Konten Utama */}
      {isLoading ? (
        <LoadingIndicator />
      ) : error ? (
        <ErrorDisplay />
      ) : saran ? (
        <SaranDisplay saran={saran} />
      ) : (
        <EmptySaran />
      )}
    </div>
  );
};

export default SaranGenZAngry;
